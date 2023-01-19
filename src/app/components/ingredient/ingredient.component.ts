import { Component, Input, OnInit } from '@angular/core';
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

  @Input() ingredient: IngredientDTO
  public quantity = 0
  public item = {} as Item

  

  public updateIngredient(selectedItemName: string, quantity: number) {
    console.log(selectedItemName)
    this.ingredient.name = selectedItemName
    this.ingredient.quantity = quantity
  }

  public selectIngredient(i: Item) {
    console.log(i)
    this.item = i
    this.updateIngredient(i.name, this.ingredient.quantity)
  }

  public addIngredient(): void {
    this.ui.recipeIngredients.push({} as IngredientDTO)
  }
}
