import { useState } from 'react'
import "./dummy.css";
import 'react-router-dom'
import {Food} from "../api/recipes/interface.ts"


function RecipeCard({food, src, isFavorited}: {food: Food, src: string, isFavorited: boolean}) {
    
    const [isLiked, setIsLiked] = useState(isFavorited);
   
    const handleFavoriteChange = () => {
            setIsLiked(!isLiked);
    };

    return (
        <>
        <figure className="cardSquares">
            <figure className="imageButton">
                <img className="recipeImages" src={src} alt={food.name} width="50" height="60"></img>
                <button onClick={handleFavoriteChange} className={isLiked ? "likedButton" : "normalButton"}></button>
                </figure>
            <p className="recipeNames">{food.name}</p> 
        </figure>
        </>
    )};


export default RecipeCard;