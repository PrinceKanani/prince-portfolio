import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Star, Users } from 'lucide-react'
import { GithubIcon } from '../components/ui/BrandIcons'
import { Section } from '../components/ui/Section'
import { pill } from '../components/ui/pill'
import { Reveal } from '../components/ui/Reveal'
import { GlassCard } from '../components/ui/GlassCard'
import { Badge } from '../components/ui/Badge'
import { siteConfig, githubProfileUrl } from '../config/siteConfig'
import { isConfigured } from '../utils/placeholders'
import type { GitHubRepo, GitHubUser } from '../types'

type FetchState =
  | { status: 'idle' | 'loading' }
  | { status: 'error' }
  | { status: 'ready'; user: GitHubUser; repos: GitHubRepo[] }

export function GitHubSection() {
  const configured = isConfigured(siteConfig.githubUsername)
  const username = siteConfig.githubUsername
  const [state, setState] = useState<FetchState>({ status: 'idle' })
  const startedRef = useRef(false)

  // Fetch on mount rather than on scroll-into-view: IntersectionObserver
  // callbacks stall in occluded/background windows, and two small API calls
  // are cheap. startedRef (not state.status) gates the fetch: depending on
  // state.status would re-run this effect when we set 'loading' below, and
  // the cleanup would cancel the request we just started.
  useEffect(() => {
    if (!configured || startedRef.current) return
    startedRef.current = true
    let cancelled = false
    setState({ status: 'loading' })
    Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=30`),
    ])
      .then(async ([userRes, reposRes]) => {
        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API error')
        const user = (await userRes.json()) as GitHubUser
        const repos = (await reposRes.json()) as GitHubRepo[]
        if (!cancelled) {
          setState({
            status: 'ready',
            user,
            repos: repos.filter((r) => !r.fork).slice(0, 6),
          })
        }
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error' })
      })
    return () => {
      cancelled = true
      startedRef.current = false
    }
  }, [configured, username])

  return (
    <Section
      id="github"
      kicker="Open Source"
      title="GitHub"
      subtitle={configured ? 'Live public activity, fetched straight from the GitHub API.' : undefined}
    >
      <div>
        {!configured && (
          <Reveal>
            <GlassCard hover={false} className="mx-auto max-w-xl p-10 text-center">
              <GithubIcon size={36} aria-hidden="true" className="mx-auto text-accent/70" />
              <h3 className="mt-4 font-display text-lg font-bold text-ink">GitHub not connected yet</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Set <code className="rounded bg-elevated px-1.5 py-0.5 text-xs">VITE_GITHUB_USERNAME</code> (or edit{' '}
                <code className="rounded bg-elevated px-1.5 py-0.5 text-xs">src/config/siteConfig.ts</code>) and this
                section will show the live profile and repositories — no fake statistics, ever.
              </p>
            </GlassCard>
          </Reveal>
        )}

        {configured && (state.status === 'idle' || state.status === 'loading') && (
          <GlassCard hover={false} className="p-10 text-center text-sm text-muted">
            Fetching public GitHub data…
          </GlassCard>
        )}

        {configured && state.status === 'error' && (
          <Reveal>
            <GlassCard hover={false} className="mx-auto max-w-xl p-10 text-center">
              <GithubIcon size={36} aria-hidden="true" className="mx-auto text-accent/70" />
              <p className="mt-4 text-sm text-muted">
                GitHub data couldn't be loaded right now — you can still visit the profile directly.
              </p>
              <a
                href={githubProfileUrl(username)}
                target="_blank"
                rel="noopener noreferrer"
                className={pill('md', 'mt-5')}
              >
                View My GitHub <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </GlassCard>
          </Reveal>
        )}

        {configured && state.status === 'ready' && (
          <div className="space-y-6">
            <Reveal>
              <GlassCard hover={false} className="flex flex-wrap items-center gap-5 p-6">
                <img src={state.user.avatar_url} alt={`${state.user.login} avatar`} className="h-16 w-16 rounded-2xl" />
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-lg font-bold text-ink">{state.user.name ?? state.user.login}</h3>
                  {state.user.bio && <p className="mt-0.5 truncate text-sm text-muted">{state.user.bio}</p>}
                  <div className="mt-2 flex gap-4 text-xs text-muted">
                    <span className="inline-flex items-center gap-1">
                      <GithubIcon size={13} aria-hidden="true" /> {state.user.public_repos} repositories
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Users size={13} aria-hidden="true" /> {state.user.followers} followers
                    </span>
                  </div>
                </div>
                <a
                  href={state.user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={pill('md')}
                >
                  View My GitHub <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </GlassCard>
            </Reveal>

            {state.repos.length === 0 && (
              <p className="text-center text-sm text-muted">
                No public repositories yet — most of my work ships in private, production codebases.
              </p>
            )}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {state.repos.map((repo, i) => (
                <Reveal key={repo.id} delay={Math.min(i * 0.06, 0.3)}>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="block h-full">
                    <GlassCard className="h-full p-5">
                      <h4 className="truncate font-display text-sm font-bold text-ink">{repo.name}</h4>
                      <p className="mt-1.5 line-clamp-2 min-h-8 text-xs leading-relaxed text-muted">
                        {repo.description ?? 'No description'}
                      </p>
                      <div className="mt-3 flex items-center gap-3 text-xs text-faint">
                        {repo.language && <Badge>{repo.language}</Badge>}
                        <span className="inline-flex items-center gap-1">
                          <Star size={12} aria-hidden="true" /> {repo.stargazers_count}
                        </span>
                      </div>
                    </GlassCard>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  )
}
