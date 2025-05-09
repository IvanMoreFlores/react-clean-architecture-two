import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import PageHome from './pages/home/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PageHome />
  </StrictMode>,
)
