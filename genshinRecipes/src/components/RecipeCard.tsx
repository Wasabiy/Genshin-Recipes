import { useEffect, useState } from 'react';
import '../style/components/RecipeCard.css';
import 'react-router-dom';
import { KeyFood } from '../models/interface.ts';
import {  useNavigate } from 'react-router-dom';
import { changeFavoriteState, getFavoriteState } from '../utils/globalFunctions.ts';
import like from '../assets/like.png';
import liked from '../assets/liked.png';

function RecipeCard({ food, src, onFavoriteChanged }: { food: KeyFood; src: string; onFavoriteChanged?: () => void }) {
  const [isLiked, setIsLiked] = useState(Boolean);
  const navigate = useNavigate();
  useEffect(() => {
    if (getFavoriteState(food)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [food]);

  const handleReadMore = () => {
    navigate('/recipeInfo', { state: { food: food } });
  };
  const handleFavoriteChange = () => {
    const likedBool = getFavoriteState(food);
    setIsLiked(!likedBool);
    changeFavoriteState(food);
    if (onFavoriteChanged) {
      onFavoriteChanged();
    }
  };

  return (
    <>

        <figure key={food.key} className="cardSquares">
          <figure className="imageButton">
            <img className="recipeImages" src={src} alt={food.name} width="50" height="60" onClick={handleReadMore}></img>
            <img
              alt={'likedButton'}
              src={isLiked ? liked : like}
              key={food.key + 'Btn'}
              onClick={(e) => {
                e.preventDefault();
                handleFavoriteChange();
              }}
              className={isLiked ? 'likedButton' : 'normalButton'}
            ></img>
          </figure>
          <p className="recipeNames">{food.name}</p>
        </figure>
    </>
  );
}

export default RecipeCard;
