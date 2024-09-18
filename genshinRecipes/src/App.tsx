import { useEffect, useState } from 'react'
import { Route, Routes } from "react-router-dom";
import axios from 'axios'
import { KeyFood } from './models/interface.ts'
import RecipePage from './pages/RecipesPage.tsx';
import RecipeInfoPage from './pages/RecipeInfoPage.tsx';
import Navbar from './components/Navbar.tsx';
import AboutPage from './pages/AboutPage.tsx';
import HomePage from './pages/HomePage.tsx';
import FavoritePage from './pages/FavoritesPage.tsx';


function App() {
  const [food, setFood] = useState<KeyFood[] | null>();

  /*useEffect(() => {
      axios.get('https://genshin.jmp.blue/consumables/food')
          .then((response) => {
              const itemList : KeyFood[] = Object.entries(response.data).map((value: [string, any]) => {
                  const key = value[0];
                  const mat = value[1];
                  return {
                      ...mat,
                      key: key,
                  } as KeyFood
              });
              setFood(itemList);
          });
  }, []);*/

  return (
    <>
    <Navbar />
      <Routes>
        <Route index element={<HomePage />}/>
        <Route path="/recipes" element={<RecipePage />}/>
        <Route path="/recipes/:recipeTitle" element={<RecipeInfoPage />}/>
        <Route path="/favorites" element={<FavoritePage />}/>
        <Route path="/about" element={<AboutPage />}/>
        <Route path="/ingredientsPage" />
        <Route path="/ingredientInfo" />
      </Routes>
    </>
  );
}

export default App;
