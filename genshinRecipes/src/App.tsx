import { Route, Routes } from 'react-router-dom';
import RecipePage from './pages/RecipesPage.tsx';
import RecipeInfoPage from './pages/RecipeInfoPage.tsx';
import Navbar from './components/Navbar.tsx';
import AboutPage from './pages/AboutPage.tsx';
import HomePage from './pages/HomePage.tsx';
import FavoritePage from './pages/FavoritesPage.tsx';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/recipes" element={<RecipePage />} />
        <Route path="/recipes/:recipeTitle" element={<RecipeInfoPage />} />
        <Route path="/favorites" element={<FavoritePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/ingredientsPage" />
        <Route path="/ingredientInfo" />
      </Routes>
    </>
  );
}

export default App;
