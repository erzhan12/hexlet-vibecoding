import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import CardPage from './CardPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CardPage />
  </StrictMode>,
)
