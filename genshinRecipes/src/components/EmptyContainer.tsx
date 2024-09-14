import axios from "axios";
import { useEffect, useState} from "react";
import {Food} from "../api/recipes/interface.ts";
import { v4 as uuid } from "uuid";

export default function Generator() {

    const [food, setFood] = useState<Food[] | null>();
    const [keys, setKeys] = useState<string[] | null>();

    useEffect(() => {
        axios.get('https://genshin.jmp.blue/consumables/food')
            .then((response) => {
                 setKeys(Object.keys(response.data));
                setFood(Object.values(response.data));

            });
    }, []);

    function RenderFood({ food,index}: {food: Food, index:number}) {
        return <span>
           <h3>{food.name}</h3>
            <img src={`https://genshin.jmp.blue/consumables/food/${keys?.[index]}`}/>
            <table>
                <tr>
                    <th>Ingrediens</th>
                    <th>Antall</th>
                </tr>
                {food.recipe && food.recipe.map(item => <tr key={uuid()}><td>{item.item}</td><td>{item.quantity}</td></tr>)}
            </table>
        </span>
    }
    return (
        <span>
            {food && food?.map((value,index)=>{
                return <article> <RenderFood food={value} key={uuid()} index={index}/> </article>


            })}
        </span>
    )

}

