import {useState, useEffect} from "react";
import "./recipesPageStyling.css";
import axios from 'axios'
import { Food, Ingredient } from "../api/recipes/interface.ts";
import RecipeCard from "./RecipeCard.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


export default function RecipePage(){
    return(
        <QueryClientProvider client={new QueryClient}>
            <RecipeGen/>
        </QueryClientProvider>
    )
}

function RecipeGen() {

    const [itemList, setItemList] = useState<Food[] | null>();
    const [food, setFood] = useState<Food[] | null>();
    const [foodKeys, setFoodKeys] = useState<string[] | null>();
    const [ingredients, setIngredients] = useState<Ingredient[] | null>();
    const [ingredientsKeys, setIngredientsKeys] = useState<string[] | null>();


    //fetch data fra APIet
        useEffect(() => {
            axios.get('https://genshin.jmp.blue/consumables/food')
                .then((response1) => {
                    setFoodKeys(Object.keys(response1.data));
                    setFood(Object.values(response1.data)); //henter listen med alle ingredienser 
                    setItemList(Object.values(response1.data)); //kopi av Food-listen man skal kunne manipulere via filtrering/sortering
                });
            axios.get('https://genshin.jmp.blue/materials/cooking-ingredients/')
                .then((response2 => {
                    setIngredientsKeys(Object.keys(response2.data));
                    setIngredients(Object.values(response2.data));
            })
        )
        }, []);
  
    function filterRecipes(condition: string, itemList: Food[]) {
        //skriv noe her Jayan💀
        /*vi tenkte at denne kan være for både filtreringsmenyen og søkebaren; om
        man skal filtrere på "ATK boosting dish" så vil condition være "atk-boosting-dish" f.eks.. 
        men gjør det du vil seff!*/
       
    }

    function sortRecipes() {
        //do ur thing bestieee <3
    }

    return (
        <>
        <h2 id="header">Recipes</h2>
        <span id="itemAmount">showing {itemList && itemList.length} recipes</span>
        <section id="filterSection">
            <span id="type">Type</span>
            <section id="filterList">
                <button className="filterChoices">Attack boosting</button>
                <button className="filterChoices">DEF boosting</button>
                <button className="filterChoices">Revival dish</button>
                <button className="filterChoices">Healing dish</button>
                <button className="filterChoices">Stamina boosting</button>
            </section>
        </section>

        <section id="ingredientFilter">
            <span>Ingredients</span>
            <section id="ingredientsList">
                {ingredients && ingredients?.map((value, index) => {
                    return <label key={"ingredient" + index}>
                        <input type="checkbox" />
                        {value.name}
                    </label>
                })}
            </section>
        </section>

        <section key="display" id="displayBox">
            <section key="recipeBox" id="recipesBox">
            {food && food?.map((value,index) => {
                 return <RecipeCard  food={value} src={`https://genshin.jmp.blue/consumables/food/${foodKeys?.[index]}`} isFavorited={false}/>
                 })}
            </section>
        </section>
       </>
    )
}

