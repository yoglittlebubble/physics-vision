import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import {
  CATALOG,
  SITE_TITLE,
  chapterPath,
  locate,
  topicLabel,
  topicPath,
} from '../catalog'

export function Layout() {
  const { pathname } = useLocation()
  const active = locate(pathname)
  const partId = active.part?.id
  const chapterId = active.chapter?.id
  const activeChapterKey = partId && chapterId ? `${partId}/${chapterId}` : ''
  const [openParts, setOpenParts] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    for (const part of CATALOG) initial[part.id] = true
    return initial
  })
  const [openChapters, setOpenChapters] = useState<Record<string, boolean>>({})

  function isChapterOpen(key: string): boolean {
    if (Object.prototype.hasOwnProperty.call(openChapters, key)) return openChapters[key]
    return key === activeChapterKey
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink to="/" className="brand" end>
          <span className="brand-mark">物</span>
          <div>
            <div className="brand-title">{SITE_TITLE}</div>
            <div className="brand-sub">力学 · 电磁学 · Canvas 示意</div>
          </div>
        </NavLink>
      </header>
      <div className="body">
        <nav className="sidebar" aria-label="教材目录">
          <div className="nav-section">目录</div>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            首页
          </NavLink>
          {CATALOG.map((part) => {
            const partOpen = openParts[part.id] ?? true
            return (
              <div key={part.id} className="nav-part">
                <button
                  type="button"
                  className="nav-fold"
                  aria-expanded={partOpen}
                  onClick={() =>
                    setOpenParts((prev) => ({ ...prev, [part.id]: !partOpen }))
                  }
                >
                  <span className="chevron" aria-hidden="true">
                    {partOpen ? '▾' : '▸'}
                  </span>
                  {part.code} {part.title}
                </button>
                {partOpen ? (
                  <div className="nav-children">
                    {part.chapters.map((chapter) => {
                      const key = `${part.id}/${chapter.id}`
                      const opened = isChapterOpen(key)
                      return (
                        <div key={chapter.id}>
                          <div className="nav-chapter-row">
                            <button
                              type="button"
                              className="nav-fold sub"
                              aria-expanded={opened}
                              aria-label={`${opened ? '折叠' : '展开'}${chapter.code}`}
                              onClick={() =>
                                setOpenChapters((prev) => ({
                                  ...prev,
                                  [key]: !opened,
                                }))
                              }
                            >
                              <span className="chevron" aria-hidden="true">
                                {opened ? '▾' : '▸'}
                              </span>
                            </button>
                            <NavLink
                              to={chapterPath(part.id, chapter.id)}
                              end
                              className={({ isActive }) =>
                                isActive ? 'nav-link active' : 'nav-link'
                              }
                            >
                              {chapter.code} {chapter.title}
                            </NavLink>
                          </div>
                          {opened ? (
                            <div className="nav-topics">
                              {chapter.topics.map((topic) => (
                                <NavLink
                                  key={topic.slug}
                                  to={topicPath(part.id, chapter.id, topic.slug)}
                                  className={({ isActive }) =>
                                    isActive ? 'nav-link topic active' : 'nav-link topic'
                                  }
                                >
                                  <span>{topicLabel(topic)}</span>
                                  {topic.status === 'wip' ? (
                                    <span className="nav-wip">建设中</span>
                                  ) : null}
                                </NavLink>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      )
                    })}
                  </div>
                ) : null}
              </div>
            )
          })}
        </nav>
        <main className="main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
