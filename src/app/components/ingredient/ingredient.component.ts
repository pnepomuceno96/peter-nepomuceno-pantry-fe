import { Component, Input, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { Ingredient } from 'src/data/Ingredient';
import { Item } from 'src/data/Item';
import { IngredientDTO } from 'src/DTOs/IngredientDTO';
import { RecipeDTO } from 'src/DTOs/RecipeDTO';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {
  ngOnInit(): void {
    
  }
  constructor(public ui: UiService) {
    this.ingredient = ui.ingredientRequest 
  }

  @Input() ingredient: IngredientDTO = {} as IngredientDTO
  
  //selected: FormControl
  public quantity = 0
  public item = {} as Item
  public test = 'test'

  //public selected = {} as Item
  

  public updateIngredient(selectedItemName: string, quantity: number) {
    this.ingredient.name = selectedItemName
    console.log(this.ingredient.name)
    this.ingredient.quantity = quantity
  }

  public selectIngredient(i: Item) {
    console.log(i)
    this.item = i
    this.updateIngredient(i.name, this.ingredient.quantity)
  }

  public removeIngredient(): void {
    const index = this.ui.recipeIngredients.indexOf(this.ingredient)
    this.ui.recipeIngredients.splice(index, 1)
  }

  public addIngredient(): void {
    this.ui.recipeIngredients.push({} as IngredientDTO)
  }
}
