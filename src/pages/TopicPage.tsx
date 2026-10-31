import type { ReactElement } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { CATALOG, chapterPath, topicLabel, type PageKey } from '../catalog'
import { PlaceholderPage } from '../components/PlaceholderPage'
import { Ampere } from './Ampere'
import { BiotSavart } from './BiotSavart'
import { Coulomb } from './Coulomb'
import { Gauss } from './Gauss'
import { Induction } from './Induction'
import { Maxwell } from './Maxwell'
import { Potential } from './Potential'

function renderPage(page: PageKey | undefined, fallback: ReactElement): ReactElement {
  switch (page) {
    case 'coulomb':
      return <Coulomb />
    case 'gauss':
      return <Gauss />
    case 'potential':
      return <Potential />
    case 'biot-savart':
      return <BiotSavart />
    case 'ampere':
      return <Ampere />
    case 'induction':
      return <Induction />
    case 'maxwell':
      return <Maxwell />
    case undefined:
      return fallback
    default: {
      const neverPage: never = page
      return neverPage
    }
  }
}

export function TopicPage() {
  const { partId, chapterId, slug } = useParams()
  const part = CATALOG.find((item) => item.id === partId)
  const chapter = part?.chapters.find((item) => item.id === chapterId)
  const topic = chapter?.topics.find((item) => item.slug === slug)

  if (!part || !chapter || !topic) return <Navigate to="/" replace />

  const fallback = (
    <PlaceholderPage
      chapter={`${chapter.code} ${chapter.title}`}
      title={topicLabel(topic)}
      intuition={topic.summary}
    />
  )

  return (
    <div className="page">
      <p className="crumb">
        <Link to="/">首页</Link>
        <span> / </span>
        <span>
          {part.code} {part.title}
        </span>
        <span> / </span>
        <Link to={chapterPath(part.id, chapter.id)}>
          {chapter.code} {chapter.title}
        </Link>
      </p>
      {renderPage(topic.page, fallback)}
    </div>
  )
}
