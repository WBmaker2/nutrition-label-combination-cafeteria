import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/tokens.css'
import './styles/components.css'
import './styles/learning.css'
import './styles/results-navigation.css'
import './styles/progress-builder.css'
import './styles/motion-responsive.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
