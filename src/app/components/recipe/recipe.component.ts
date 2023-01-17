import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { AppUser } from 'src/data/AppUser';
import { Item } from 'src/data/Item';
import { Recipe } from 'src/data/Recipe';
import { CookedRecipeDTO } from 'src/DTOs/CookedRecipeDTO';
import { ItemDTO } from 'src/DTOs/ItemDTO';
import { EditRecipeComponent } from '../edit-recipe/edit-recipe.component';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  ngOnInit(): void {
    this.steps = this.recipe.steps.split("\n| ")
  }
  constructor(public ui: UiService, public dialog: MatDialog) {
    this.recipe = ui.getRecipe()///this.ui.recipe
    // this.ui.watchRecipes().subscribe({next: recipes => {
    //   this.steps = recipes.steps.split("\n| ")
    //   console.log("steps = " + this.steps)
    // }})
    
    //this.steps = this.recipe.steps.split("\n| ")
  }
  @Input() recipe: Recipe
  public steps: string[] = []

  public deleteRecipe(): void {
    this.ui.deleteRecipe(this.recipe)
  }

  public cook(): void {
    this.ui.subtractIngredients(this.recipe)
    
  }

  public openEditRecipeDialog(): void {
    const dialog = this.dialog.open(EditRecipeComponent, {data: this.recipe})
  }
}
