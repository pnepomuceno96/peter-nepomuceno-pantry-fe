import { Recipe } from "./Recipe"
/*
An interface define the shape/structure of an object. 
Here, we instruct that the AppUser object should have 
fields for an id, username, password, and a list of
recipes.
*/
export interface AppUser {
    id: string
    username: string
    password: string
    recipes: Recipe[]
}