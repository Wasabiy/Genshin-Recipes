import { Route, Routes, useLocation } from 'react-router-dom';
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
        <Route path="/recipeInfo" element={<RecipeInfoPage food={useLocation().state?.food} />} />
        <Route path="/favorites" element={<FavoritePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/ingredientsPage" />
        <Route path="/ingredientInfo" />
      </Routes>
    </>
  );
}

export default App;
