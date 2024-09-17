import { useState } from 'react'
import "./RecipeCard.css";
import 'react-router-dom'
import { KeyFood } from "../models/interface.ts"
import { Link } from 'react-router-dom';


function RecipeCard({food, src, isFavorited}: {food: KeyFood, src: string, isFavorited: boolean}) {
    
    const [isLiked, setIsLiked] = useState(isFavorited);
   
    const handleFavoriteChange = () => {
            setIsLiked(!isLiked);
            localStorage.setItem(food.key, (!isLiked).toString());
    };

    return (
        <>
        <Link to={`/recipes/${food.key}`} className="infoLink">
            <figure key={food.key} className="cardSquares">
                <figure className="imageButton">
                    <img className="recipeImages" src={src} alt={food.name} width="50" height="60"></img>
                    <button key={food.key + "Btn"} onClick={(e) => { 
                        e.preventDefault();
                        handleFavoriteChange();
                        }} className={isLiked ? "likedButton" : "normalButton"}></button>
                    </figure>
                <p className="recipeNames">{food.name}</p> 
            </figure>
        </Link>
        </>
    )};


export default RecipeCard;