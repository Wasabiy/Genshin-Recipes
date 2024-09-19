import { useEffect, useState } from 'react'
import "./RecipeCard.css";
import 'react-router-dom'
import { KeyFood } from "../models/interface.ts"
import { Link } from 'react-router-dom';
import {changeFavoriteState, getFavoriteState} from "../utils/globalFunctions.ts";


function RecipeCard({food, src}: {food: KeyFood, src: string}) {
    
    const [isLiked, setIsLiked] = useState(Boolean);

    useEffect(() => {
        if(getFavoriteState(food)){
            setIsLiked(true)
        }else{
            setIsLiked(false);
        }
    }, [food]);

    const handleFavoriteChange = () => {
        const likedBool = getFavoriteState(food);
        setIsLiked(!likedBool);
        changeFavoriteState(food);
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