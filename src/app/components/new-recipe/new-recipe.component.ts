import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { findIndex } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { Ingredient } from 'src/data/Ingredient';
import { Item } from 'src/data/Item';
import { IngredientDTO } from 'src/DTOs/IngredientDTO';
import { RecipeDTO } from 'src/DTOs/RecipeDTO';
import { Step } from 'src/data/Step';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent implements OnInit {
  ngOnInit(): void {
    
  }
  public ui: UiService
  constructor(ui: UiService) {
    this.ui = ui
  }

  public newRecipe = {} as RecipeDTO
  
  
  public cancel(): void {
    this.ui.goHome()
    this.ui.recipeIngredients = [{} as IngredientDTO]
    this.ui.steps = [{} as Step]
  }

  private titleCase(string: string): string {
    return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();})
  }

  private firstLetterCaps(string: string) {
    return string.replace(string, function(txt){return txt.charAt(0).toUpperCase() + txt.substring(1);})
  }

  private steps: string[] = []
  public postRecipe(name: string, image: string, description: string): void {
    if(name != '' && image != '' && description != '') {
    this.newRecipe.name = this.titleCase(name)
    this.newRecipe.image = image
    this.newRecipe.description = this.firstLetterCaps(description)
    for (var i = 0; i < this.ui.steps.length; i++) {
      if(this.ui.steps[i].step != '') {
        this.steps.push(this.firstLetterCaps(this.ui.steps[i].step));
      } else {
        this.ui.showError("Incomplete steps.")
        
      }
    }
    this.newRecipe.steps = this.steps
    this.newRecipe.userId = this.ui.currentUser.id
    this.newRecipe.ingredients = this.ui.recipeIngredients
    
    this.ui.postRecipe(this.newRecipe)
    this.ui.goHome()
  } else {
    this.ui.showError("Incomplete fields.")
  }
  }

  
  
}
  