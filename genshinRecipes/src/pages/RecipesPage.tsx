import { SyntheticEvent, useEffect, useState } from 'react';
import './RecipesPage.css';
import { DishType, KeyFood, KeyIngredient } from '../models/interface.ts';
import RecipeCard from '../components/RecipeCard.tsx';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { getFavoriteState, reformatData } from '../utils/globalFunctions.ts';
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

  const [food, setFood] = useState<KeyFood[] | null>();
  const [ingredients, setIngredients] = useState<KeyIngredient[] | null>();
  const [checkedValue, setCheckedValue] = useState<String[]>();
  const [activeButtons, setActiveButtons] = useState<string | null>(sessionStorage.getItem("activeButton"));

  const { data: foodData, status: foodStatus } = useQuery({
    queryKey: ['foodData'],
    queryFn: fetchFood
  });
  const { data: ingredientData, status: ingredientStatus } = useQuery({
    queryKey: ['ingredientData'],
    queryFn: fetchIngredient
  });


  useEffect(() => {
    const savedFilters = JSON.parse(
      sessionStorage.getItem('selectedIngredients') || '[]'
    );
    const savedType =
      sessionStorage.getItem('activeButton') || 'null'

    setCheckedValue(savedFilters);
    setActiveButtons(savedType);
    filterRecipes(food)
  }, []);

  useEffect(() => {
    if (foodStatus == 'success') {
      const foods: KeyFood[] = reformatData(foodData, 'KeyFood');
      setFood(foods);
    }
  }, [foodStatus]);

  useEffect(() => {
    if (ingredientStatus == 'success') {
      const ingredients: KeyIngredient[] = reformatData(
        ingredientData,
        'KeyIngredient'
      );
      setIngredients(ingredients);
    }
  }, [ingredientStatus]);

  function handleActiveButton(event: React.ChangeEvent<HTMLButtonElement>) {
    const check = activeButtons;
    const checkedButton = event.target.value;
    if (check != null) {
      // @ts-ignore
      if (activeButtons.includes(checkedButton)) {
        setActiveButtons(null);
        sessionStorage.setItem("activeButton","")
      } else {
        setActiveButtons(checkedButton);
        sessionStorage.setItem("activeButton",checkedButton as string)
      }
    } else {
      setActiveButtons(checkedButton);
      sessionStorage.setItem("activeButton",checkedButton as string)
    }
  }
  useEffect(()=>{
    filterRecipes(food)
  },[activeButtons])

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const { checked } = event.target;
    setCheckedValue((prevCheckedValues) => {
      const newCheckedValues = checked ?
        [...prevCheckedValues, name] : prevCheckedValues.filter((value) => value !== name);

      sessionStorage.setItem(
        'selectedIngredients',
        JSON.stringify(newCheckedValues)
      );
      return newCheckedValues;
    });
  };

  function filterRecipes(a: KeyFood[] | null | undefined) {
    return a?.map((value: KeyFood) => {
      const shouldRender = value.recipe?.some((ingredient) =>
        //@ts-ignore
        ( checkedValue.includes(ingredient.item)||
          activeButtons?.includes(value.type) ||
          getFavoriteState(value)
        )
      );
      //@ts-ignore
      if (checkedValue.length == 0 || shouldRender ) {
        return (
          <RecipeCard
            key={value.key}
            food={value}
            src={`https://genshin.jmp.blue/consumables/food/${value.key}`}
          />
        );
      }else{
        return null;
      }
    })
      .filter(Boolean);
  }
  function onLoadChange(name:string) {
    const element = document.getElementById(name) as HTMLInputElement
    // @ts-ignore
    if(checkedValue.includes(name)){
      return element.checked = true;
    }
  }
  return (
    <>
      {foodStatus === 'error' && <h2>Error fetching data</h2>}
      {foodStatus === 'pending' && <h2>Fetching data...</h2>}
      {foodStatus === 'success' && (
        <>
          {' '}
          <section id='title'>
            <h2 id='header'>Recipes</h2>
            <span id='itemAmount'>
              showing {filterRecipes(food || []).length} recipes
            </span>
          </section>
          <section id='filterSection'>
            <span id='type'>Type</span>
            <section id='filterList'>
              <button id={'atkButton'} onClick={((e) => handleActiveButton(e))}
                      className='filterChoices' value={DishType.ATKBoostingDish}>Attack boosting
              </button>
              <button id={'defButton'} onClick={((e) => handleActiveButton(e))}
                      className='filterChoices' value={DishType.DEFBoostingDish}>DEF
                boosting
              </button>
              <button id={'hpButton'} onClick={((e) => handleActiveButton(e))}
                      className='filterChoices' value={DishType.RecoveryDish}>Recovery
                dish
              </button>
              <button id={'staminButton'} onClick={((e) => handleActiveButton(e))}
                      className='filterChoices'
                      value={DishType.AdventurerSDish}>Stamina boosting
              </button>
            </section>
          </section>
          <span>Ingredients</span>
          <section key='displayIn' id='displayIngredientsBox'>
            <section id='ingredientsList'>
              {ingredients?.map((value) => {
                return (
                  <label htmlFor={value.name} key={value.name}>
                    <input id={value.name}
                           type='checkbox'
                           onChange={(e) => handleCheckboxChange(e, value.name)}
                    />
                    {value.name}
                    <img onLoad={event =>  onLoadChange(value.name)}
                      src={`https://genshin.jmp.blue/materials/cooking-ingredients/${value.key}` }
                    />
                  </label>
                );
              })}
            </section>
          </section>
          <section key='displayFood' id='displayBox'>
            <section key='recipeBox' id='recipesBox'>
              {filterRecipes(food || [])}
            </section>
          </section>
        </>
      )}
    </>
  );
}
