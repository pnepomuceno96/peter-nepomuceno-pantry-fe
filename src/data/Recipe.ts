import { AppUser } from "./AppUser"
import { Ingredient } from "./Ingredient"

export interface Recipe {
    id: number
    name: string
    description: string
    image: string
    ingredients: Ingredient[]
    steps: string[]
    totalWeight: number
    user: AppUser
}