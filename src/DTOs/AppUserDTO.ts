import { RecipeDTO } from "./RecipeDTO"

export interface AppUserDTO {
    id: number | null
    username: string
    password: string
    recipes: RecipeDTO[]
}