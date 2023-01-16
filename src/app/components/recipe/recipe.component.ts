import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
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

  private cookedRecipeRequest = {} as CookedRecipeDTO
  public deleteRecipe(): void {
    this.ui.deleteRecipe(this.recipe)
  }

  // public checkIngredients(): boolean {
  //   for (var i = 0; i < this.recipe.ingredients.length; i++) {
  //     this.ui.loadItemById(this.recipe.ingredients[i].itemNo)
  //     if(this.recipe.ingredients) {

  //     }
  //   }
  //   return true
  // }

  public cook(): void {
    this.ui.subtractIngredients(this.recipe)
    
  }
}
