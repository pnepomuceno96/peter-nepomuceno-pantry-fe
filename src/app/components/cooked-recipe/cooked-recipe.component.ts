import { Component, Input, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { CookedRecipe } from 'src/data/CookedRecipe';

@Component({
  selector: 'app-cooked-recipe',
  templateUrl: './cooked-recipe.component.html',
  styleUrls: ['./cooked-recipe.component.css']
})
export class CookedRecipeComponent implements OnInit {
  ngOnInit(): void {
    
  }
  constructor(public ui: UiService) {
    this.cookedRecipe = ui.cookedRecipe
  }
  @Input() cookedRecipe: CookedRecipe

  public eat(): void {
    
  }
}
