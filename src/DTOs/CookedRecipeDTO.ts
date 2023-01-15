export interface CookedRecipeDTO {
    id: number | null
    name: string
    image: string
    description: string
    calories: number
    weight: number
}

// I am not linking a recipe in case the recipe being cooked is changed