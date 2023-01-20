import { Component, OnInit, Input } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Ingredient } from 'src/data/Ingredient';
import { Item } from 'src/data/Item';
import { IngredientDTO } from 'src/DTOs/IngredientDTO';
import { RecipeDTO } from 'src/DTOs/RecipeDTO';


@Component({
  selector: 'app-edit-ingredient',
  templateUrl: './edit-ingredient.component.html',
  styleUrls: ['./edit-ingredient.component.css']
})
export class EditIngredientComponent implements OnInit{
  ngOnInit(): void {
    
  }
  constructor(public ui: UiService) {
    //ui.watchIngredients().pipe(take(1)).subscribe({(recipeIngredients())})
    this.ingredient = ui.ingredientRequest
    
    //this.selected = new FormControl(this.ingredient.name, [Validators.required])
    
  }

  @Input() ingredient: IngredientDTO = {} as IngredientDTO
  
  //selected: FormControl
  public quantity = 0
  public item = {} as Item
  public test = 'test'

  //public selected = {} as Item
  

  public updateIngredient(selectedItemName: string) {
    this.ingredient.name = selectedItemName
    console.log(this.ingredient.name)
    //this.ingredient.quantity = quantity
  }

  public selectIngredient(i: Item) {
    console.log(i)
    //this.selected = i
    this.updateIngredient(i.name)
  }

  public removeIngredient(): void {
    const index = this.ui.recipeIngredients.indexOf(this.ingredient)
    this.ui.recipeIngredients.splice(index, 1)
  }

  public addIngredient(): void {
    this.ui.recipeIngredients.push({} as IngredientDTO)
  }
}
