import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UiService } from 'src/app/services/ui.service';
import { CookedRecipe } from 'src/data/CookedRecipe';
import { Item } from 'src/data/Item';
import { CookedRecipeDTO } from 'src/DTOs/CookedRecipeDTO';
import { CookedRecipeComponent } from '../cooked-recipe/cooked-recipe.component';


@Component({
  selector: 'app-edit-cooked-recipe',
  templateUrl: './edit-cooked-recipe.component.html',
  styleUrls: ['./edit-cooked-recipe.component.css']
})
export class EditCookedRecipeComponent {
  constructor(public ui: UiService, private dialog: MatDialogRef<CookedRecipeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CookedRecipe) {
      this.newCookedRecipe.id = data.id
    }

    private newCookedRecipe = {} as CookedRecipeDTO

    public cancel() {
      this.dialog.close()
    }

    private titleCase(string: string): string {
      return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();})
    }

    private firstLetterCaps(string: string) {
      return string.replace(string, function(txt){return txt.charAt(0).toUpperCase() + txt.substring(1);})
    }

    public updateCookedRecipe(name: string, image: string, description: string) {
      if(name != '' && image != '' && description != '') {
        this.newCookedRecipe.name = this.titleCase(name)
        this.newCookedRecipe.image = image
        this.newCookedRecipe.description = this.firstLetterCaps(description)
        this.ui.updateCookedRecipe(this.newCookedRecipe)
        this.dialog.close()
      } else {
        this.ui.showError("Incomplete fields")
      }
    }


}
