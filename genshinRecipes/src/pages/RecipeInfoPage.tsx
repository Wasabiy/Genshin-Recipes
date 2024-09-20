import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Food, KeyFood } from "../models/interface.ts";
import {
  changeFavoriteState,
  getFavoriteState,
  reformatData,
} from "../utils/globalFunctions.ts";
import rarityStar from "../assets/rarityStar.png";
import "./RecipeInfoPage.css";
import like from "../assets/like.png";
import liked from "../assets/liked.png";
import { fetchFood } from "../utils/apiCalls.ts";
import {QueryClient, useQuery} from "@tanstack/react-query";
import {QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();
export default function RecipeInfoPage() {
  return (
      <QueryClientProvider client={queryClient}>
        <RecipeInfo/>
      </QueryClientProvider>
  );
}
function RecipeInfo() {
  const { recipeTitle } = useParams();
  const [details, setDetails] = useState<KeyFood | null>();
  const [isLiked, setIsLiked] = useState(Boolean);
  const keyedFood = details as { key: string } & Food;

  useEffect(() => {
    if (getFavoriteState(keyedFood) != null) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [details]);
  const handleFavoriteChange = () => {
    const likedBool = getFavoriteState(keyedFood);
    setIsLiked(!likedBool);
    changeFavoriteState(keyedFood);
  };
  const { data: foodData, status: foodStatus } = useQuery({
    queryKey: ["foodData"],
    queryFn: fetchFood,
  });
  useEffect(() => {
    if (foodStatus == "success") {
      const data: KeyFood[] = reformatData(foodData, "KeyFood");
      setDetails(data.find((x) => x.key == recipeTitle));
      getFavoriteState(keyedFood);
    }
  }, [foodStatus]);

  return (
    <>
      <h2>{details?.name}</h2>
      <img
        src={isLiked ? liked : like}
        onClick={(e) => {
          e.preventDefault();
          handleFavoriteChange();
        }}
      ></img>
      <section id="detailList">
        <ul id="details">
          <li key={"stars"}>
            {" "}
            Rarity:{" "}
            {[...Array(details?.rarity)].map((index) => (
              <img
                key={"star" + index}
                src={rarityStar}
                alt="star"
                width="20"
                height="20"
              />
            ))}
          </li>
          <li key={"type"}> Type: {details?.type} </li>
          <li key={"profi"}> Proficiency: {details?.proficiency} </li>
          <li key={"effect"}> Effect: {details?.effect} </li>
          <section id="ingredientBox">
            <h4>Ingredients</h4>
            <div id="ingredientList">
              {details?.recipe == undefined ?  (
                <p>No Recipe</p>
              ) : (
                details?.recipe &&
                details?.recipe.map((value) => (
                  <p key={value.item}>
                    {value.item} x {value.quantity}
                  </p>
                ))
              )}
            </div>
          </section>
          <section id="descBox">
            <h4 id="descHeader">Description</h4>
            <span id="description">{details?.description}</span>
          </section>
        </ul>
      </section>
      <section id="imgSection">
        <img
          src={`https://genshin.jmp.blue/consumables/food/${details?.key}`}
          alt={"Image of the dish named: " + details?.name}
        />
      </section>
    </>
  );
}
