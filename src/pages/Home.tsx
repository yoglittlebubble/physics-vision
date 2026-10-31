import { Link } from 'react-router-dom'
import { CATALOG, SITE_TITLE, chapterPath, topicLabel, topicPath } from '../catalog'

export function Home() {
  return (
    <div className="page">
      <h1>{SITE_TITLE}</h1>
      <p className="lead">
        按教材的篇、章、节来看力学和电磁学。点进已经做好的小节，可以用鼠标改参数、看方向；
        还没做好的标着「建设中」，也能点开占位页。画面是纯 Canvas 2D，示意，不能当习题数值。
      </p>
      <div className="outline">
        {CATALOG.map((part) => (
          <section key={part.id} className="part-block" id={part.id}>
            <h2>
              {part.code} {part.title}
            </h2>
            <p className="part-blurb">{part.blurb}</p>
            {part.chapters.map((chapter) => (
              <article key={chapter.id} className="chapter-block">
                <div className="chapter-head">
                  <Link to={chapterPath(part.id, chapter.id)}>
                    {chapter.code} {chapter.title}
                  </Link>
                  <Link
                    to={chapterPath(part.id, chapter.id)}
                    className="chapter-more"
                  >
                    本章
                  </Link>
                </div>
                <ul className="topic-list">
                  {chapter.topics.map((topic) => (
                    <li key={topic.slug}>
                      <Link
                        to={topicPath(part.id, chapter.id, topic.slug)}
                        className="topic-row"
                      >
                        <span className="topic-name">{topicLabel(topic)}</span>
                        <span
                          className={
                            topic.status === 'ready' ? 'status ready' : 'status wip'
                          }
                        >
                          {topic.status === 'ready' ? '可交互' : '建设中'}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </section>
        ))}
      </div>
      <section className="note-box">
        <h3>怎么用</h3>
        <ul>
          <li>左侧目录同样按篇、章折叠。点章名进入章节页，点节名进入知识点。</li>
          <li>现在能拖动参数的是库仑定律与电场线、毕奥-萨伐尔定律两页。</li>
          <li>电场线从正电荷画到负电荷；直导线电流出屏时，磁感线逆时针环绕。</li>
          <li>示意，不能当习题数值。</li>
        </ul>
      </section>
    </div>
  )
}
