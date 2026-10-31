import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { legacyRedirects } from './catalog'
import { ChapterPage } from './pages/ChapterPage'
import { Home } from './pages/Home'
import { TopicPage } from './pages/TopicPage'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=":partId/:chapterId" element={<ChapterPage />} />
          <Route path=":partId/:chapterId/:slug" element={<TopicPage />} />
          {legacyRedirects().map((item) => (
            <Route
              key={item.from}
              path={item.from}
              element={<Navigate to={item.to} replace />}
            />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
