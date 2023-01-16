import { Item } from "./Item"

export interface Ingredient {
    id: number
    //item: Item
    itemNo: number
    name: string
    measurement: string
    quantity: number
}