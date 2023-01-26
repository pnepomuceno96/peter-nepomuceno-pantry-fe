import { RecipeDTO } from "./RecipeDTO"

export interface AppUserDTO {
    id: string | null
    username: string
    password: string
    recipes: RecipeDTO[]
}