import {useState, useEffect} from "react";
import { Food, KeyFood, KeyIngredient } from "../models/interface.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { reformatData } from "../utils/globalFunctions.ts";
import axios from 'axios'
import RecipeCard from "../components/RecipeCard.tsx";

function FavoritesPage() {
    const [favoriteRecipes, setFavoriteRecipes] = useState<KeyFood | null>();
    
    function fetchFavoriteRecipes() {
        const favoritedFoods: KeyFood[] = [];
        const data: any[] = [];
        for (let x = 0; x < localStorage.length; x++) {
            const key = localStorage.key(x);
            if (key && localStorage.getItem(key) == "true") {
                data.push(key);
                //data[key] = JSON.parse(localStorage.getItem(key) || '{}');
            }
        }
        console.log(data);

        axios.get('https://genshin.jmp.blue/consumables/food')
            .then((response1) => {
               const response:KeyFood[] = reformatData(response1.data, "KeyFood");
                for (const x in data) {
                    const selected = response.find(y => y.key == x);
                    if (selected) {
                        favoritedFoods.push(selected);
                    } 
                }
            });
    }
    
    useEffect(() => {
        fetchFavoriteRecipes();
        

        
    }, []);
    return (
        <>
            <h1>Favorites</h1>
        </>
    )
}
export default FavoritesPage;