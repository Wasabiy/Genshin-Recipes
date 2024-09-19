import { useState, useEffect } from "react";
import "./RecipesPage.css";
import { KeyFood, KeyIngredient } from "../models/interface.ts";
import RecipeCard from "../components/RecipeCard.tsx";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { reformatData } from "../utils/globalFunctions.ts";
import { fetchFood, fetchIngredient } from "../utils/apiCalls.ts";

const queryClient = new QueryClient();
export default function RecipePage() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecipeGen />
    </QueryClientProvider>
  );
}

function RecipeGen() {
  const [itemList, setItemList] = useState<KeyFood[] | null>();
  const [food, setFood] = useState<KeyFood[] | null>();
  const [ingredients, setIngredients] = useState<KeyIngredient[] | null>();

  //fetch data fra APIet
  const { data: foodData, status: foodStatus } = useQuery({
    queryKey: ["foodData"],
    queryFn: fetchFood,
  });
  const { data: ingredientData, status: ingredientStatus } = useQuery({
    queryKey: ["ingredientData"],
    queryFn: fetchIngredient,
  });

  useEffect(() => {
    if (foodStatus == "success") {
      const foods: KeyFood[] = reformatData(foodData, "KeyFood");
      setFood(foods);
      setItemList(foods);
    }
  }, [foodStatus]);
  useEffect(() => {
    if (ingredientStatus == "success") {
      const ingredients: KeyIngredient[] = reformatData(
        ingredientData,
        "KeyIngredient"
      );
      setIngredients(ingredients);
    }
  }, [ingredientStatus]);

  /*function filterRecipes(condition: string, itemList: KeyFood[]) {
        //skriv noe her Jayan💀
        /*vi tenkte at denne kan være for både filtreringsmenyen og søkebaren; om
        man skal filtrere på "ATK boosting dish" så vil condition være "atk-boosting-dish" f.eks.. 
        men gjør det du vil seff!
    }*/

  /* function sortRecipes() {
         //do ur thing bestieee <3
     }*/

  return (
    <>
      {foodStatus === "error" && <h2>Error fetching data</h2>}
      {foodStatus === "pending" && <h2>Fetching data...</h2>}
      {foodStatus === "success" && (
        <>
          {" "}
          <section id="title">
            <h2 id="header">Recipes</h2>
            <span id="itemAmount">showing {itemList?.length} recipes</span>
          </section>
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
          <span>Ingredients</span>
          <section key="displayIn" id="displayIngredientsBox">
            <section id="ingredientsList">
              {ingredients?.map((value) => {
                return (
                  <label key={value.name}>
                    <input type="checkbox" />
                    {value.name}
                    <img
                      src={`https://genshin.jmp.blue/materials/cooking-ingredients/${value.key}`}
                    />
                  </label>
                );
              })}
            </section>
          </section>
          <section key="displayFood" id="displayBox">
            <section key="recipeBox" id="recipesBox">
              {food?.map((value) => {
                return (
                  <RecipeCard
                    food={value}
                    src={`https://genshin.jmp.blue/consumables/food/${value.key}`}
                  />
                );
              })}
            </section>
          </section>
        </>
      )}
    </>
  );
}
