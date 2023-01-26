import { Recipe } from "./Recipe"

export interface AppUser {
    id: string
    username: string
    password: string
    recipes: Recipe[]
}