import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { NewItemComponent } from './components/new-item/new-item.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ItemComponent } from './components/item/item.component';
import { UserHeaderComponent } from './components/user-header/user-header.component';
import { NewRecipeComponent } from './components/new-recipe/new-recipe.component';
import { AddToQuantityComponent } from './components/add-to-quantity/add-to-quantity.component';
import { EditItemComponent } from './components/edit-item/edit-item.component';
import { StepComponent } from './components/step/step.component';
import { IngredientComponent } from './components/ingredient/ingredient.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { CookedRecipesComponent } from './components/cooked-recipes/cooked-recipes.component';
import { CookedRecipeComponent } from './components/cooked-recipe/cooked-recipe.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    NewItemComponent,
    ItemComponent,
    UserHeaderComponent,
    NewRecipeComponent,
    AddToQuantityComponent,
    EditItemComponent,
    StepComponent,
    IngredientComponent,
    RecipesComponent,
    RecipeComponent,
    CookedRecipesComponent,
    CookedRecipeComponent,
    EditUserComponent,
    EditRecipeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
