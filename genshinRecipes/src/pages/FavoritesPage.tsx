import { useState, useEffect } from 'react';
import { KeyFood } from '../models/interface.ts';
import RecipeCard from '../components/RecipeCard.tsx';
import './FavoritesPage.css';

function FavoritesPage() {
  const [favoriteRecipes, setFavoriteRecipes] = useState<KeyFood[] | null>();

  function fetchFavoriteRecipes() {
    const arr: KeyFood[] = [];
    Object.keys({ ...localStorage }).map((value) => {
      // @ts-expect-error may expect null, but the function has reassured that before as it would not load if it was null
      const detail = JSON.parse(localStorage.getItem(value));
      arr.push(detail);
    });
    setFavoriteRecipes(arr);
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
