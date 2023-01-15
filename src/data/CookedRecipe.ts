import { AppUser } from "./AppUser"

export interface CookedRecipe {
    id: number
    name: string
    image: string
    description: string
    calories: number
    weight: number
}