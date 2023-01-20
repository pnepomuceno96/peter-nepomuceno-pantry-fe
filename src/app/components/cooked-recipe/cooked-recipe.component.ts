import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UiService } from 'src/app/services/ui.service';
import { CookedRecipe } from 'src/data/CookedRecipe';
import { ItemDTO } from 'src/DTOs/ItemDTO';
import { EditCookedRecipeComponent } from '../edit-cooked-recipe/edit-cooked-recipe.component';

@Component({
  selector: 'app-cooked-recipe',
  templateUrl: './cooked-recipe.component.html',
  styleUrls: ['./cooked-recipe.component.css']
})
export class CookedRecipeComponent implements OnInit {
  ngOnInit(): void {
    
  }
  constructor(public ui: UiService, public dialog: MatDialog) {
    this.cookedRecipe = ui.cookedRecipe

  }
  @Input() cookedRecipe: CookedRecipe

  private newItem = {} as ItemDTO
  public itemQuantity = 0
  public convertToItem(): void {
    this.newItem.name = this.cookedRecipe.name
    this.newItem.image = this.cookedRecipe.image
    this.newItem.measurement = ""
    this.newItem.calories = this.cookedRecipe.calories
    this.newItem.weight = this.cookedRecipe.weight
    // for(let i = 0; i < this.ui.items.length; i++) {
    //   // Check if item already exists in pantry before it runs into error on backend
    //   if (this.cookedRecipe.name == this.ui.items[i].name) {

    //   }
    // }
    this.newItem.quantity = 1
    this.ui.postItem(this.newItem)
    this.ui.deleteCookedRecipe(this.cookedRecipe)
  }


  public openDialog(): void {
    const dialog = this.dialog.open(EditCookedRecipeComponent, {data: this.cookedRecipe})
  }
}
