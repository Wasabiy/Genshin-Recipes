import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import EmptyContainer from "./components/EmptyContainer.tsx";
import RecipesPage from './components/RecipesPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecipesPage/>
  </StrictMode>,
)
