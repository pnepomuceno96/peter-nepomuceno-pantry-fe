import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UiService } from 'src/app/services/ui.service';
import { Ingredient } from 'src/data/Ingredient';
import { Recipe } from 'src/data/Recipe';
import { IngredientDTO } from 'src/DTOs/IngredientDTO';
import { RecipeDTO } from 'src/DTOs/RecipeDTO';
import { EditStepComponent } from '../edit-step/edit-step.component';
import { RecipeComponent } from '../recipe/recipe.component';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {
  ngOnInit(): void {
    
  }
  constructor(public ui: UiService, private dialog: MatDialogRef<RecipeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Recipe) {
      this.ui.editSteps = data.steps.split('\n| ')
      this.recipeSteps = this.ui.editSteps
      this.ui.recipeIngredients = [{} as IngredientDTO]
      // for(let i = 0; i < this.data.ingredients.length; i++) {
      //   const ing = {} as IngredientDTO
      //   ing.id = this.data.ingredients[i].id
      //   ing.itemNo = this.data.ingredients[i].itemNo
      //   ing.name = this.data.ingredients[i].name
      //   ing.measurement = this.data.ingredients[i].measurement
      //   ing.quantity = this.data.ingredients[i].quantity
      //   this.ui.recipeIngredients.push(ing)
      // }
    }
  public recipeSteps: string[] = []
  //public ingredients: IngredientDTO[] = []
  public cancel() {
    this.dialog.close()
  }
  

  public addStep(): void {
    this.recipeSteps.push('')
  }

  


  private recipeRequest = {} as RecipeDTO
  public updateRecipe(name: string, image: string, description: string) {
    this.recipeRequest.id = this.data.id
    this.recipeRequest.name = name
    this.recipeRequest.description = description
    this.recipeRequest.image = image
    this.recipeRequest.steps = this.recipeSteps
    this.recipeRequest.ingredients = this.ui.recipeIngredients
    this.ui.updateRecipe(this.recipeRequest)
    this.dialog.close()
  }

}