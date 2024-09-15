import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { Food } from './api/recipes/interface'
import RecipeCard from './components/RecipeCard.tsx';

function App() {
 
  const [food, setFood] = useState<Food[] | null>();
  const [keys, setKeys] = useState<string[] | null>();

  useEffect(() => {
      axios.get('https://genshin.jmp.blue/consumables/food')
          .then((response) => {
               setKeys(Object.keys(response.data));
              setFood(Object.values(response.data));
          });
  }, []);
  return (
    <>
     {food && food?.map((value,index) =>{
    
     
      
        return <RecipeCard  food={value} src={`https://genshin.jmp.blue/consumables/food/${keys?.[index]}`} isFavorited={false}/>
      
     
     })}

    </>
  )
}

export default App
