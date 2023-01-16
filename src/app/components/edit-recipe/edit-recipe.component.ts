import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UiService } from 'src/app/services/ui.service';
import { Recipe } from 'src/data/Recipe';
import { RecipeDTO } from 'src/DTOs/RecipeDTO';
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
    @Inject(MAT_DIALOG_DATA) public data: Recipe) {}

  public cancel() {
    this.dialog.close()
  }

  private recipeRequest = {} as RecipeDTO
  public updateRecipe(name: string, image: string, description: string) {
    this.recipeRequest.id = this.data.id
    this.recipeRequest.name = name
    this.recipeRequest.description = description
    this.recipeRequest.image = image
    
    this.ui.updateRecipe(this.recipeRequest)
    this.dialog.close()
  }

}
