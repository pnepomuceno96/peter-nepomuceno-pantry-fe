import { Item } from "./Item"

export interface Ingredient {
    id: number
    //OPTIONAL TODO: Change reference variable to item name so that recipes can reference it again after deletion and recreation
    itemNo: number
    name: string
    measurement: string
    quantity: number
}