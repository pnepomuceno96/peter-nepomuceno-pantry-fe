import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {MatSortModule} from '@angular/material/sort';

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
import { EditStepComponent } from './components/edit-step/edit-step.component';
import { UsersComponent } from './components/users/users.component';
import { EditCookedRecipeComponent } from './components/edit-cooked-recipe/edit-cooked-recipe.component';
import { EditIngredientComponent } from './components/edit-ingredient/edit-ingredient.component';
import { ItemSortHeaderComponent } from './components/item-sort-header/item-sort-header.component';

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
    EditRecipeComponent,
    EditStepComponent,
    UsersComponent,
    EditCookedRecipeComponent,
    EditIngredientComponent,
    ItemSortHeaderComponent
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
    ReactiveFormsModule,
    MatExpansionModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
