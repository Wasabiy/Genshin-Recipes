import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Food, KeyFood } from "../models/interface.ts";
import {
  changeFavoriteState,
  getFavoriteState,
  reformatData,
} from "../utils/globalFunctions.ts";
import axios from "axios";
import rarityStar from "../assets/rarityStar.png";
import "./RecipeInfoPage.css";
import like from "../assets/like.png";
import liked from "../assets/liked.png";

function RecipeInfoPage() {
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

  useEffect(() => {
    axios.get("https://genshin.jmp.blue/consumables/food").then((response1) => {
      const data: KeyFood[] = reformatData(response1.data, "KeyFood");
      setDetails(data.find((x) => x.key == recipeTitle));
    });
    getFavoriteState(keyedFood);
  }, []);

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
              {details?.recipe ? (
                <p>Null</p>
              ) : (
                details?.recipe &&
                details?.recipe.map((x) => (
                  <p key={x.item}>
                    {x.item} x {x.quantity}
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
export default RecipeInfoPage;
