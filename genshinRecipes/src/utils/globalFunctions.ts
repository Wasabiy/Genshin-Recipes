//gjenbrukbar funksjon

import {KeyFood} from "../models/interface.ts";

// @ts-ignore
export function reformatData(data, type) {
    return Object.entries(data).map((value: [string, any]) => {
        const key = value[0];
        const mat = value[1];
        return {
            ...mat,
            key: key,
        } as typeof type;
    });
};

export function getFavoriteState(food: KeyFood) {
    try {
        const localIsLiked = localStorage.getItem(food.key);
        if (localIsLiked != null) {
            return true;
        }
    } catch (e) {
        return false;
    }
}

export function changeFavoriteState(food: KeyFood) {
    const localIsLiked = localStorage.getItem(food.key);
    if (localIsLiked == null) {
        localStorage.setItem(food.key, JSON.stringify({...food}))
    } else {
        localStorage.removeItem(food.key)
    }
}
