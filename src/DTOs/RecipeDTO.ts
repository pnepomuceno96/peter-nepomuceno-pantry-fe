import { IngredientDTO } from "./IngredientDTO"

export interface RecipeDTO {
    id: number | null
    name: string
    description: string
    image: string
    ingredients: IngredientDTO[]
    steps: string[]
    totalWeight: number
    totalCalories: number
    userId: number
}