import {useState, useEffect} from "react";
import { KeyFood} from "../models/interface.ts";
import RecipeCard from "../components/RecipeCard.tsx";
import "./FavoritesPage.css"


function FavoritesPage() {
    const [favoriteRecipes, setFavoriteRecipes] = useState<KeyFood[] | null>();

    function fetchFavoriteRecipes() {
        let arr: KeyFood[] = [];
        (Object.keys({...localStorage})).map(value => {
            let detail = JSON.parse(localStorage.getItem(value));
            arr.push(detail);
        })
        setFavoriteRecipes(arr);
    }

    useEffect(() => {
        fetchFavoriteRecipes();
    }, [favoriteRecipes]);
    
    return (
        <>
            <section key="display" id="displayBox">
                <section key="recipeBox" id="recipesBox">
                    {favoriteRecipes?.map((value) => {
                        return <RecipeCard food={value}
                                           src={`https://genshin.jmp.blue/consumables/food/${value.key}`}/>
                    })}
                </section>
            </section>
        </>
    )
}

export default FavoritesPage;