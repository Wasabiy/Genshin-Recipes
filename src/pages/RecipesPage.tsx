import { useEffect, useRef, useState } from 'react';
import '../style/pages/RecipesPage.css';
import { DishType, KeyFood, KeyIngredient } from '../models/interface.ts';
import RecipeCard from '../components/RecipeCard.tsx';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { reformatData } from '../utils/globalFunctions.ts';
import { fetchFood, fetchIngredient } from '../utils/apiCalls.ts';
import ResetButton from '../components/ResetButton.tsx';

const queryClient = new QueryClient();
export default function RecipePage() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecipeGen />
    </QueryClientProvider>
  );
}

function RecipeGen() {
  function getNumber({ value }:{value: string}) {
    const num = parseInt(value);
    return isNaN(num) ? 40 : num;

  }


  const [food, setFood] = useState<KeyFood[]>([]);
  const [ingredients, setIngredients] = useState<KeyIngredient[] | null>();
  const [checkedValue, setCheckedValue] = useState<string[] | null>([]);
  const [activeButtons, setActiveButtons] = useState<string | null>(sessionStorage.getItem('activeButton'));
  const lastItemRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState<number>( getNumber({ value: sessionStorage.getItem('offsetGenshin')! }))
  const [allFood, setAllFood] = useState<KeyFood[]>([]);


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
      const list:KeyFood[] = reformatData(foodData, 'KeyFood');
      list.pop()
      setAllFood(list);
      setFood(list.slice(0,offset));
    }},[foodStatus, foodData,offset]);

  useEffect(() => {
    if (ingredientStatus == 'success') {
      const ingredients: KeyIngredient[] = reformatData(ingredientData, 'KeyIngredient')
      ingredients.pop();
      setIngredients(ingredients);

    }
  }, [ingredientStatus, ingredientData]);

  function setSessionOffset(numb: number){
    setOffset(numb)
    sessionStorage.removeItem('offsetGenshin')
    const string = JSON.stringify(numb)
    sessionStorage.setItem('offsetGenshin',string)
  }

  function handleActiveButton(event: React.MouseEvent<HTMLButtonElement>) {
    const check = activeButtons;
    const checkedButton = (event.target as HTMLButtonElement).value
    setSessionOffset(40)
    document.getElementById("displayBox")!.scrollTop = 0;
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
    const {checked} = event.target
    setCheckedValue((prevCheckedValues) => {
      const newCheckedValues = checked ? [...prevCheckedValues!, name]
        : prevCheckedValues!.filter((value) => value !== name);
      sessionStorage.setItem('selectedIngredients', JSON.stringify(newCheckedValues));
      return newCheckedValues;
    });

    document.getElementById("displayBox")!.scrollTop = 0;
    setSessionOffset(40)
  };

  const handleResetCheckbox = ()=>{
    sessionStorage.setItem('selectedIngredients', JSON.stringify([]));
    for (const name in checkedValue){
        onLoadChange(name)
    }
    setCheckedValue([])
    sessionStorage.setItem('activeButton', '');
    setActiveButtons(null);
    document.getElementById("displayBox")!.scrollTop = 0;
  }
  function filterRecipes(a:KeyFood[]) {
    if (checkedValue?.length == 0 && activeButtons == null) {
      return a
    } else {
     return a?.filter((value: KeyFood) => {
          const shouldRender = value.recipe?.some((ingredient) =>checkedValue?.includes(ingredient.item));
          if (shouldRender || activeButtons?.includes(value.type)) {
            return (value);
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
    try{
      if (checkedValue?.includes(name)) {
        return (element.checked = true);
      }else{
        return (element.checked = false)
      }
    }
    catch{
      return false
    }

  }



  useEffect(() => {
    if (foodStatus === 'error' || foodStatus === 'pending') return;
      const observerInstance = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && offset < 250 && food.length >= 40) {
            const number: number = offset+20
            setSessionOffset(number)
            setFood(allFood.slice(0,offset));
          }
        });
      });
      const currentRef = lastItemRef.current;
      if (currentRef) {
        observerInstance.observe(currentRef);
      }
      /**
       *  CurrentRef is the current of the lastItmeRef,
       *  and says that if it exists, observe the instance
       * @const currentRef
       */
      return () => {
        if (currentRef) {
          observerInstance.unobserve(currentRef);
        }
        observerInstance.disconnect();
      };

  })


  return (
    <>
      {foodStatus === 'error' && <h2>Error fetching data</h2>}
      {foodStatus === 'pending' && <h2>Fetching data...</h2>}
      {foodStatus === 'success' && (
        <>
          <section id="allRecipeSection">
            <section id="filters">
              <section id="title">
                <h2 id="header">Recipes</h2>
                <span id="itemAmount">showing {filterRecipes(food)?.length} out of {filterRecipes(allFood).length} recipes</span>
              </section>
              <span id="type">Type: {activeButtons}</span>
              <section className="buttonList">
                <button
                  id={'atkButton'}
                  onClick={(e) => handleActiveButton(e)}
                  className="filterChoices"
                  value={DishType.ATKBoostingDish}
                >
                  Attack boosting
                </button>
                <button
                  id={'defButton'}
                  onClick={(e) => handleActiveButton(e)}
                  className="filterChoices"
                  value={DishType.DEFBoostingDish}
                >
                  DEF boosting
                </button>
                <button
                  id={'hpButton'}
                  onClick={(e) => handleActiveButton(e)}
                  className="filterChoices"
                  value={DishType.RecoveryDish}
                >
                  Recovery dish
                </button>
                <button
                  id={'staminButton'}
                  onClick={(e) => handleActiveButton(e)}
                  className="filterChoices"
                  value={DishType.AdventurerSDish}
                >
                  Stamina boosting
                </button>
              </section>
              <ResetButton onClick={handleResetCheckbox}></ResetButton>
              <span>Ingredients</span>
                <section className="filterList">

                    {ingredients?.map((value) => {
                      return (
                        <label className={"ingredientLabel"} htmlFor={value.name} key={value.name}>
                          <input
                            id={value.name}
                            type="checkbox"

                            checked={onLoadChange(value.name)}
                            onChange={(event) => handleCheckboxChange(event,value.name)}
                          />
                          {value.name}
                          <img alt={value.name}
                             onLoad={()=>onLoadChange(value.name)}
                            src={`https://genshin.jmp.blue/materials/cooking-ingredients/${value.key}`}
                          />
                        </label>
                      );
                    })}
                  </section>


            </section>
            <section key="displayFood" id="displayBox">
              <section key="recipeBox" id="recipesBox">
                {filterRecipes(food).map(renderRecipes)}
              </section>
              <div ref={lastItemRef} style={{ visibility: 'hidden', height: '3px' }} />
            </section>
          </section>
        </>
      )}
    </>
  );
}
