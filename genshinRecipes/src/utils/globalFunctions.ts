//reusable function

import { KeyFood } from '../models/interface.ts';

// @ts-expect-error any type error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function reformatData(data, type) {
  return Object.entries(data).map((value: [string, any]) => {
    const key = value[0];
    const mat = value[1];
    return {
      ...mat,
      key: key,
    } as typeof type;
  });
}

//All favorited dishes will be stored with this key
const FAVORITES_KEY = 'favoriteDishes';

export function getFavorites() {
  const favorites: string | null = localStorage.getItem(FAVORITES_KEY);
  return favorites ? JSON.parse(favorites): [];
}

// Checks whether the dish is liked
export function getFavoriteState(food: KeyFood): boolean {
  const favorites = getFavorites();
  return favorites.some((fav: KeyFood) => fav.key === food.key);

}

export function changeFavoriteState(food: KeyFood) {
  const favorites: KeyFood[] = getFavorites();
  const dishExists =  favorites.some((fav: KeyFood) => fav.key === food.key);

  // If the dish has not been liked, it will be pushed to localStorage and change state to "liked".
  // Else, the dish will be removed from localStorage.
  if (!dishExists) {
    favorites.push(food);
  } else {
    const updatedFavorites = favorites.filter((fav: KeyFood) => fav.key !== food.key);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    return;
  }

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}