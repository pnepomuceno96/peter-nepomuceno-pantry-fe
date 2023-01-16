import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { AppUser } from 'src/data/AppUser';
import { Item } from 'src/data/Item';
import { Recipe } from 'src/data/Recipe';
import { CookedRecipeDTO } from 'src/DTOs/CookedRecipeDTO';
import { ItemDTO } from 'src/DTOs/ItemDTO';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  ngOnInit(): void {
    
  }
  constructor(public ui: UiService) {
    this.recipe = this.ui.recipe
    
  }
  @Input() recipe: Recipe

  private cookedRecipe = {} as CookedRecipeDTO
  public deleteRecipe(): void {
    this.ui.deleteRecipe(this.recipe)
  }

  public cook(): void {
    this.cookedRecipe.name = this.recipe.name
    this.cookedRecipe.description = this.recipe.description
    this.cookedRecipe.image = this.recipe.image
    this.cookedRecipe.weight = this.recipe.totalWeight
    this.cookedRecipe.calories = this.recipe.totalCalories

    // TODO: RUN CHECK TO SEE IF USER HAS ENOUGH INGREDIENTS FOR RECIPE

    this.ui.postCookedRecipe(this.cookedRecipe)
    this.ui.subtractIngredients(this.recipe.ingredients)
    
  }
}
