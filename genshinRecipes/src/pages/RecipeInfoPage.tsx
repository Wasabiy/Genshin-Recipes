import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { KeyFood, KeyIngredient } from "../models/interface.ts"
import { reformatData } from "../utils/reformatData.ts";
import axios from "axios";
import rarityStar from "../assets/rarityStar.png"

function RecipeInfoPage() {
    //const [isLiked, setIsLiked] = useState(isFavorited);
    const { recipeTitle } = useParams();
    const [details, setDetails] = useState<KeyFood | null>();

    
    useEffect(() => {
        axios.get('https://genshin.jmp.blue/consumables/food')
            .then((response1) => {
               const data:KeyFood[] = reformatData(response1.data, "KeyFood");
                setDetails(data.find(x => x.key == recipeTitle))
            }); 
    }, []);

    return (
        <>
        <h2>{details && details.name}</h2>
        <section id="detailList">
            <ul id="details">
                <li> Rarity: {details && [...Array(details.rarity)].map((star, index) => (
                        <img key={"star" + index} src={rarityStar} alt="star" width="20" height="20" />))}
                </li>
                <li> Type: {details && details.type} </li>
                <li> Proficiency: {details && details.proficiency} </li>
                <li> Effect: {details && details.effect} </li>
                <section id="ingredientBox">
                    <h4>Ingredients</h4>
                    {details && details.recipe.map(x => 
                    <div id="ingredientList">
                        <p>{x.item} x {x.quantity}</p>
                    </div>)}
                </section>
                <section id="descBox">
                    <h4 id="descHeader">Description</h4>
                    <span id="description">{details && details.description}</span>
                </section>
            </ul>
        </section>
        <section id="imgSection">
            <img src={`https://genshin.jmp.blue/consumables/food/${details && details.key}`} />
        </section>
        </>
    )
    

}
export default RecipeInfoPage;