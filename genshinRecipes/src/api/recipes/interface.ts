export interface Food {
    name?: string,
    rarity?: number,
    type?: Type,
    effect?: string,
    hasRecipe?: boolean,
    description?: string,
    character?: string,
    baseDish?: string,
    recipe?: Recipe[],
    proficiency?: number | string,
    event?: string,
    charcter?: string,
    food: any
}

export interface Recipe {
    item:     string;
    quantity: number;
}

export enum Type {
    ATKBoostingDish = "ATK-Boosting Dish",
    AdventurerSDish = "Adventurer's Dish",
    DEFBoostingDish = "DEF-Boosting Dish",
    RecoveryDish = "Recovery Dish",
}