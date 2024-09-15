export type KeyFood = {
    key: string,
} & Food

export interface Food {
    name: string,
    rarity: number,
    type: Type,
    effect: string,
    hasRecipe?: boolean,
    description: string,
    character?: string,
    baseDish?: string,
    recipe: Recipe[],
    proficiency: number | string,
    event?: string,
    isFavorited?: boolean,
}

export interface Recipe {
    item:     string;
    quantity: number;
}
export interface Ingredient{
    name: string,
    description: string,
    sources: string[]
}

export enum Type {
    ATKBoostingDish = "ATK-Boosting Dish",
    AdventurerSDish = "Adventurer's Dish",
    DEFBoostingDish = "DEF-Boosting Dish",
    RecoveryDish = "Recovery Dish",
}