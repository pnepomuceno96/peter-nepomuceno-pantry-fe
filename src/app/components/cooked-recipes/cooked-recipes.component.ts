import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-cooked-recipes',
  templateUrl: './cooked-recipes.component.html',
  styleUrls: ['./cooked-recipes.component.css']
})
export class CookedRecipesComponent implements OnInit {
  ngOnInit(): void {
    
  }
  constructor(public ui: UiService) {
    console.log(this.ui.cookedRecipes)
  }

}
