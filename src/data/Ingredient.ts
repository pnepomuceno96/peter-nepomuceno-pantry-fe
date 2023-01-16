import { Item } from "./Item"

export interface Ingredient {
    id: number
    //item: Item
    itemId: number
    name: string
    measurement: string
    quantity: number
}