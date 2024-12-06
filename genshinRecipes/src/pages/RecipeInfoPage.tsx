import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Food, KeyFood } from '../models/interface.ts';
import { changeFavoriteState, getFavoriteState } from '../utils/globalFunctions.ts';
import rarityStar from '../assets/rarityStar.png';
import '../style/pages/RecipeInfoPage.css';
import like from '../assets/like.png';
import liked from '../assets/liked.png';
import { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
export default function RecipeInfoPage({food}:{ food: KeyFood }) {
  return (

      <RecipeInfo keyedFood={food} />

  );
}
function RecipeInfo({keyedFood}:{ keyedFood: KeyFood }) {
  
  const [isLiked, setIsLiked] = useState(Boolean);

  useEffect(() => {
    if (getFavoriteState(keyedFood)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [keyedFood]);
  const handleFavoriteChange = () => {
    const likedBool = getFavoriteState(keyedFood);
    setIsLiked(!likedBool);
    changeFavoriteState(keyedFood);
  };

  return (
    <>
      <section id="allFavText">
        <h2>{keyedFood?.name}</h2>
        <h3>Press heart to like or dislike!</h3>
        <img alt={"Image of heart"}
          id="heartImage"
          src={isLiked ? liked : like}
          onClick={(e) => {
            e.preventDefault();
            handleFavoriteChange();
          }}
        ></img>
        <h3>Description:</h3>
        <section id="detailList">
          <ul id="keyedFood">
            <li key={'stars'}>
              Rarity:{' '}
              {[...Array(keyedFood?.rarity)].map((value, index, array) => (
                <img key={'star' + index} src={rarityStar} alt="star" width="20" height="20" />
              ))}
            </li>
            <li key={'type'}> Type: {keyedFood?.type} </li>
            <li key={'proficiency'}> Proficiency: {keyedFood?.proficiency} </li>
            <li key={'effect'}> Effect: {keyedFood?.effect} </li>
            <section id="ingredientBox">
              <h4>Ingredients</h4>
              <ul key={"IngredientUL"} id="ingredientList">
                {keyedFood?.recipe == undefined ? (
                  <p>No Recipe</p>
                ) : (
                  keyedFood?.recipe &&
                  keyedFood?.recipe.map((value) => (
                    <li key={value.item}>
                      {value.item} x {value.quantity}
                    </li>
                  ))
                )}
              </ul>
            </section>
            <section id="descBox">
              <h4 key={"descriptionHeader"} id="descHeader">Description</h4>
              <span id="description">{keyedFood?.description}</span>
            </section>
          </ul>
        </section>
        <section id="imgSection">
          <img
            src={`https://genshin.jmp.blue/consumables/food/${keyedFood?.key}`}
            alt={'Image of the dish named: ' + keyedFood?.name}
          />
        </section>
      </section>
    </>
  );
}
