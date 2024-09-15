import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import {ApiFood, Food, KeyFood} from './api/recipes/interface'
import RecipeCard from './components/RecipeCard.tsx';

function App() {
 
  const [food, setFood] = useState<KeyFood[] | null>();
  const [keys, setKeys] = useState<string[] | null>();

  useEffect(() => {
      axios.get('https://genshin.jmp.blue/consumables/food')
          .then((response) => {
              const itemList : KeyFood[] = Object.entries(response.data).map((value: [string, any]) => {
                  const key = value[0];
                  const mat = value[1];
                  return {
                      ...mat,
                      key: key,
                  } as KeyFood
              });
              setFood(itemList);
          });
  }, []);
  console.log(food)
  return (
    <>
     {food && food?.map((value,index) =>{
         return <RecipeCard  food={value} src={`https://genshin.jmp.blue/consumables/food/${value.key}`} isFavorited={false}/>
      
     
     })}

    </>
  )
}

export default App
