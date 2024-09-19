import {useState, useEffect} from "react";
import "./RecipesPage.css";
import axios from 'axios'
import { KeyFood, KeyIngredient} from "../models/interface.ts";
import RecipeCard from "../components/RecipeCard.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { reformatData } from "../utils/globalFunctions.ts";


export default function RecipePage() {
    return (
        <QueryClientProvider client={new QueryClient}>
            <RecipeGen/>
        </QueryClientProvider>
    )
}

function RecipeGen() {
    const [itemList, setItemList] = useState<KeyFood[] | null>();
    const [food, setFood] = useState<KeyFood[] | null>();
    const [ingredients, setIngredients] = useState<KeyIngredient[] | null>();

    //fetch data fra APIet
    useEffect(() => {
        axios.get('https://genshin.jmp.blue/consumables/food')
            .then((response1) => {
               const data:KeyFood[] = reformatData(response1.data,"KeyFood");
                setFood(data);
                setItemList(data);
            });
        axios.get('https://genshin.jmp.blue/materials/cooking-ingredients/')
            .then((response2 => {
                    const data: KeyIngredient[] = reformatData(response2.data,"KeyIngredient");
                    setIngredients(data);
                })
            )
    }, []);

    function filterRecipes(condition: string, itemList: KeyFood[]) {
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
            <span id="itemAmount">showing {itemList?.length} recipes</span>
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
                    {ingredients?.map((value) => {
                        return <label key={value.name}>
                            <input type="checkbox"/>
                            {value.name}
                            <img src={`https://genshin.jmp.blue/materials/cooking-ingredients/${value.key}`}/>
                        </label>
                    })}
                </section>
            </section>

            <section key="display" id="displayBox">
                <section key="recipeBox" id="recipesBox">
                    {food?.map((value) => {
                        return <RecipeCard food={value}
                                           src={`https://genshin.jmp.blue/consumables/food/${value.key}`}/>
                    })}
                </section>
            </section>
        </>
    )
}