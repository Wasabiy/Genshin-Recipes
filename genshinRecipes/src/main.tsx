import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import EmptyContainer from "./components/EmptyContainer.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <h1>HEI</h1>  
  </StrictMode>,
)
