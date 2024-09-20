import { useState, useEffect, Key } from "react";
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
  const [checkedValue, setCheckedValue] = useState<String[]>([]);
  const [activeButtons, setActiveButtons] = useState<string[]>([]);

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

  useEffect(() => {
    const savedFilters = JSON.parse(
      sessionStorage.getItem("selectedIngredients") || "[]"
    );
    setCheckedValue(savedFilters);


      /*const checkboxes = document.querySelectorAll('input[type=checkbox');
      const checkArray = [...Array(checkboxes)];
      checkArray.map(x => {
        if(savedFilters.includes(document.querySelector(`label[for=${}`))){
          console.log("hey")
        }
      })*/
  }, []);

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const { checked } = event.target;

    setCheckedValue((prevCheckedValues) => {
      const newCheckedValues = checked
        ? [...prevCheckedValues, name]
        : prevCheckedValues.filter((value) => value !== name);

      sessionStorage.setItem(
        "selectedIngredients",
        JSON.stringify(newCheckedValues)
      );

      return newCheckedValues;
    });
  };

  function filterRecipes(a: KeyFood[]) {
    const handleIngredientFilter = () => {
      const filteredItems = a
        ?.map((value: KeyFood) => {
          const shouldRender = value.recipe?.some((ingredient) =>
            checkedValue.includes(ingredient.item)
          );

          if (checkedValue.length === 0 || shouldRender) {
            return (
              <RecipeCard
                key={value.key}
                food={value}
                src={`https://genshin.jmp.blue/consumables/food/${value.key}`}
              />
            );
          }
          return null;
        })
        .filter(Boolean);
      return filteredItems;
    };

    const filteredRecipes = handleIngredientFilter();
    return filteredRecipes;
  }

  return (
    <>
      {foodStatus === "error" && <h2>Error fetching data</h2>}
      {foodStatus === "pending" && <h2>Fetching data...</h2>}
      {foodStatus === "success" && (
        <>
          {" "}
          <section id="title">
            <h2 id="header">Recipes</h2>
            <span id="itemAmount">
              showing {filterRecipes(food || []).length} recipes
            </span>
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
                  <label htmlFor={value.name} key={value.name}>
                    <input
                      type="checkbox"
                      onChange={(e) => handleCheckboxChange(e, value.name)}
                    />
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
              {filterRecipes(food || [])}
            </section>
          </section>
        </>
      )}
    </>
  );
}
