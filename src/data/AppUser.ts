import { Recipe } from "./Recipe"

export interface AppUser {
    id: number
    username: string
    password: string
    recipes: Recipe[]
}