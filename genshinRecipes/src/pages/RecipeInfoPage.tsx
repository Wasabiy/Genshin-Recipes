import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { KeyFood, KeyIngredient } from "../models/interface.ts"
import { reformatData } from "../utils/reformatData.ts";
import axios from "axios";
import rarityStar from "../assets/rarityStar.png"
import "./RecipeInfoPage.css"

function RecipeInfoPage() {
    //const [isLiked, setIsLiked] = useState(isFavorited);
    const { recipeTitle } = useParams();
    const [details, setDetails] = useState<KeyFood | null>();
    const [isLiked, setIsLiked] = useState<any | null>();

    
    useEffect(() => {
        axios.get('https://genshin.jmp.blue/consumables/food')
            .then((response1) => {
               const data:KeyFood[] = reformatData(response1.data, "KeyFood");
                setDetails(data.find(x => x.key == recipeTitle))
            }); 
    }, []);

    useEffect(() => {
    if (details?.key) {
        const localIsLiked = localStorage.getItem(details.key);
        if (localIsLiked !== null) {
            setIsLiked(localIsLiked === 'true');
            }
        }
    }, [details]);

    const handleFavoriteChange = () => {
            const likedBool = !isLiked;
            setIsLiked(likedBool);
            localStorage.setItem(details.key, (likedBool).toString());
    };


    return (
        <>
        <h2>{details?.name}</h2>
        <button id={isLiked ? "likedBtn" : "notLikedBtn"} onClick={handleFavoriteChange}>♥♥♥</button>
        <section id="detailList">
            <ul id="details">
                <li> Rarity: {[...Array(details?.rarity)].map((star, index) => (
                        <img key={"star" + index} src={rarityStar} alt="star" width="20" height="20" />))}
                </li>
                <li> Type: {details?.type} </li>
                <li> Proficiency: {details?.proficiency} </li>
                <li> Effect: {details?.effect} </li>
                <section id="ingredientBox">
                    <h4>Ingredients</h4>
                    <div id="ingredientList">
                        {details?.recipe.map(x => 
                            <p>{x.item} x {x.quantity}</p>
                            )}
                    </div>
                </section>
                <section id="descBox">
                    <h4 id="descHeader">Description</h4>
                    <span id="description">{details?.description}</span>
                </section>
            </ul>
        </section>
        <section id="imgSection">
            <img src={`https://genshin.jmp.blue/consumables/food/${details?.key}`} />
        </section>
        </>
    )
    

}
export default RecipeInfoPage;