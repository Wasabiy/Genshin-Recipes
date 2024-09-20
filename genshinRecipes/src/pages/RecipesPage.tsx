import { useEffect, useState } from 'react';
import './RecipesPage.css';
import { DishType, KeyFood, KeyIngredient } from '../models/interface.ts';
import RecipeCard from '../components/RecipeCard.tsx';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { reformatData } from '../utils/globalFunctions.ts';
import { fetchFood, fetchIngredient } from '../utils/apiCalls.ts';

const queryClient = new QueryClient();
export default function RecipePage() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecipeGen />
    </QueryClientProvider>
  );
}

function RecipeGen() {
  const [food, setFood] = useState<KeyFood[]>([]);
  const [ingredients, setIngredients] = useState<KeyIngredient[] | null>();
  const [checkedValue, setCheckedValue] = useState<string[] | null>([]);
  const [activeButtons, setActiveButtons] = useState<string | null>(sessionStorage.getItem('activeButton'));

  useEffect(() => {
    const savedFilters = JSON.parse(sessionStorage.getItem('selectedIngredients') || '[]');
    const savedType = sessionStorage.getItem('activeButton') || null;
    setCheckedValue(savedFilters);
    setActiveButtons(savedType);
  }, []);

  const { data: foodData, status: foodStatus } = useQuery({
    queryKey: ['foodData'],
    queryFn: fetchFood,
  });
  const { data: ingredientData, status: ingredientStatus } = useQuery({
    queryKey: ['ingredientData'],
    queryFn: fetchIngredient,
  });

  useEffect(() => {
    if (foodStatus == 'success') {
      const foods: KeyFood[] = reformatData(foodData, 'KeyFood');
      setFood(foods);
    }
  }, [foodStatus, foodData]);

  useEffect(() => {
    if (ingredientStatus == 'success') {
      const ingredients: KeyIngredient[] = reformatData(ingredientData, 'KeyIngredient');
      setIngredients(ingredients);
    }
  }, [ingredientStatus, ingredientData]);

  function handleActiveButton(event: React.ChangeEvent<HTMLButtonElement>) {
    const check = activeButtons;
    const checkedButton = event.target.value;
    if (check != null) {
      // @ts-expect-error the error is null, which is valid in this case as it resets the value
      if (activeButtons.includes(checkedButton)) {
        setActiveButtons(null);
        sessionStorage.setItem('activeButton', '');
      } else {
        setActiveButtons(checkedButton);
        sessionStorage.setItem('activeButton', checkedButton as string);
      }
    } else {
      setActiveButtons(checkedButton);
      sessionStorage.setItem('activeButton', checkedButton as string);
    }
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
    const { checked } = event.target;
    setCheckedValue((prevCheckedValues) => {
      const newCheckedValues = checked
        ? //@ts-expect-error Symbol Iterator return a string
          [...prevCheckedValues, name]
        : //@ts-expect-error Symbol Iterator return a string
          prevCheckedValues.filter((value) => value !== name);

      sessionStorage.setItem('selectedIngredients', JSON.stringify(newCheckedValues));
      return newCheckedValues;
    });
  };
  function filterRecipes(a: KeyFood[]) {
    console.log(checkedValue?.length);
    console.log(activeButtons);
    if (checkedValue?.length == 0 && activeButtons == null) {
      return food.map(renderRecipes);
    } else {
      return a
        ?.map((value: KeyFood) => {
          const shouldRender = value.recipe?.some((ingredient) =>
            //@ts-expect-error the value is never null or undefined, as the rendering will always have food mapped.
            checkedValue.includes(ingredient.item),
          );
          if (shouldRender || activeButtons?.includes(value.type)) {
            return renderRecipes(value);
          }
        })
        .filter(Boolean);
    }
  }

  function renderRecipes(value: KeyFood) {
    return <RecipeCard key={value.key} food={value} src={`https://genshin.jmp.blue/consumables/food/${value.key}`} />;
  }

  function onLoadChange(name: string) {
    const element = document.getElementById(name) as HTMLInputElement;
    ///@ts-expect-error the value is never null or undefined, as the rendering will always have food mapped.
    if (checkedValue.includes(name)) {
      return (element.checked = true);
    }
  }
  return (
    <>
      {foodStatus === 'error' && <h2>Error fetching data</h2>}
      {foodStatus === 'pending' && <h2>Fetching data...</h2>}
      {foodStatus === 'success' && (
        <>
          {' '}
          <section id="allRecipeSection">
            <section id="filters">
              <section id="title">
                <h2 id="header">Recipes</h2>
                <span id="itemAmount">showing {filterRecipes(food || []).length} recipes</span>
              </section>
              <span id="type">Type</span>
              <section className="filterList">
                <button
                  id={'atkButton'}
                  //@ts-expect-error the even is compatible
                  onClick={(e) => handleActiveButton(e)}
                  className="filterChoices"
                  value={DishType.ATKBoostingDish}
                >
                  Attack boosting
                </button>
                <button
                  id={'defButton'}
                  //@ts-expect-error the even is compatible
                  onClick={(e) => handleActiveButton(e)}
                  className="filterChoices"
                  value={DishType.DEFBoostingDish}
                >
                  DEF boosting
                </button>
                <button
                  id={'hpButton'}
                  //@ts-expect-error the even is compatible
                  onClick={(e) => handleActiveButton(e)}
                  className="filterChoices"
                  value={DishType.RecoveryDish}
                >
                  Recovery dish
                </button>
                <button
                  id={'staminButton'}
                  //@ts-expect-error the even is compatible
                  onClick={(e) => handleActiveButton(e)}
                  className="filterChoices"
                  value={DishType.AdventurerSDish}
                >
                  Stamina boosting
                </button>
              </section>
              <span>Ingredients</span>
              <section key="displayIn" id="displayIngredientsBox">
                <section className="filterList">
                  <section id="ingredientScroll">
                    {ingredients?.map((value) => {
                      return (
                        <label htmlFor={value.name} key={value.name}>
                          <input
                            id={value.name}
                            type="checkbox"
                            onChange={(e) => handleCheckboxChange(e, value.name)}
                          />
                          {value.name}
                          <img alt={value.name}
                            onLoad={(event) => {
                              console.log(event);
                              onLoadChange(value.name);
                            }}
                            src={`https://genshin.jmp.blue/materials/cooking-ingredients/${value.key}`}
                          />
                        </label>
                      );
                    })}
                  </section>
                </section>
              </section>
            </section>
            <section key="displayFood" id="displayBox">
              <section key="recipeBox" id="recipesBox">
                {filterRecipes(food)}
              </section>
            </section>
          </section>
        </>
      )}
    </>
  );
}
