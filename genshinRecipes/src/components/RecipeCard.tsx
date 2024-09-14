import { useState } from 'react'
import "./dummy.css";
import 'react-router-dom'
import {Food} from "../api/recipes/interface.ts"


function RecipeCard({food,src}: {food: Food, src: string}) {
    
    const [recipeTitle, setRecipeTitle] = useState(food.name);
    const [isLiked, setIsLiked] = useState(food.isFavorited);
    const [recipeDescription, setRecipeDescription] = useState(food.description);
    const [recipeRarity, setRecipeRarity] = useState(food.rarity);
    const [recipeProficiency, setRecipeProficiency] = useState(food.proficiency);
    const [recipeIngredients, setRecipeIngredients] = useState(food.recipe);

    const handleFavoriteChange = () => {
            setIsLiked(!isLiked);
    };

    return (
        <>
        <figure className="cardSquares">
            <img className="recipeImages" src={src} alt={recipeTitle} width="50" height="60"></img>
            <p className="recipeNames">{recipeTitle}</p>
            <button onClick={handleFavoriteChange} className={isLiked ? "likedButton" : "normalButton"}></button>
        </figure>
        </>
    )};


export default RecipeCard;