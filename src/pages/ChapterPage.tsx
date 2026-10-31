import { Link, Navigate, useParams } from 'react-router-dom'
import { CATALOG, topicLabel, topicPath } from '../catalog'

export function ChapterPage() {
  const { partId, chapterId } = useParams()
  const part = CATALOG.find((item) => item.id === partId)
  const chapter = part?.chapters.find((item) => item.id === chapterId)

  if (!part || !chapter) return <Navigate to="/" replace />

  return (
    <div className="page">
      <p className="crumb">
        <Link to="/">首页</Link>
        <span> / </span>
        <span>
          {part.code} {part.title}
        </span>
      </p>
      <h1>
        {chapter.code} {chapter.title}
      </h1>
      <p className="lead">
        {chapter.blurb}
        点进一节就能看演示或占位页。图和读数都是示意，不能当习题数值。
      </p>
      <div className="card-grid">
        {chapter.topics.map((topic) => (
          <Link
            key={topic.slug}
            to={topicPath(part.id, chapter.id, topic.slug)}
            className="topic-card"
          >
            <h2>
              {topicLabel(topic)}
              {topic.status === 'wip' ? (
                <span className="placeholder-badge">建设中</span>
              ) : (
                <span className="placeholder-badge ready">可交互</span>
              )}
            </h2>
            <p>{topic.summary}</p>
            <span className="card-go">
              {topic.status === 'ready' ? '进入演示 →' : '查看占位 →'}
            </span>
          </Link>
        ))}
      </div>
      <p className="hint">左侧目录也可以按篇、章展开，再点进某一节。</p>
    </div>
  )
}
