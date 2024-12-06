import { useState, useEffect } from 'react';
import { KeyFood } from '../models/interface.ts';
import RecipeCard from '../components/RecipeCard.tsx';
import '../style/pages/FavoritesPage.css';
import {getFavorites } from '../utils/globalFunctions.ts';
import { useQuery } from '@tanstack/react-query';

function FavoritesPage() {
  const [favoriteRecipes, setFavoriteRecipes] = useState<KeyFood[] | null>();

  function fetchFavoriteRecipes() {
    setFavoriteRecipes(getFavorites());
  }

  useEffect(() => {
    fetchFavoriteRecipes();
  }, []);

  return (
    <>
      <section id="displayText">
        <h3>These are you favorite recipes: </h3>
      </section>
      <section key="displayFav" id="displayBoxFav">
        <section key="recipeBoxFav" id="recipesBoxFav">
          {favoriteRecipes?.map((value) => {
            return (
              <RecipeCard
                food={value}
                src={`https://genshin.jmp.blue/consumables/food/${value.key}`}
                onFavoriteChanged={fetchFavoriteRecipes}
              />
            );
          })}
        </section>
      </section>
    </>
  );
}

export default FavoritesPage;
