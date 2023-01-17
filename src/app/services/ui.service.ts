import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, take } from 'rxjs';
import { AppUser } from 'src/data/AppUser';
import { CookedRecipe } from 'src/data/CookedRecipe';
import { Ingredient } from 'src/data/Ingredient';
import { Item } from 'src/data/Item';
import { Page } from 'src/data/Pages';
import { Recipe } from 'src/data/Recipe';
import { Step } from 'src/data/Step';
import { AppUserDTO } from 'src/DTOs/AppUserDTO';
import { CookedRecipeDTO } from 'src/DTOs/CookedRecipeDTO';
import { IngredientDTO } from 'src/DTOs/IngredientDTO';
import { ItemDTO } from 'src/DTOs/ItemDTO';
import { RecipeDTO } from 'src/DTOs/RecipeDTO';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.loadUsers()
    this.loadItems()
    this.loadRecipes()
    this.loadCookedRecipes()
    
   
    const username = localStorage.getItem('username')
    const password = localStorage.getItem('password')
    if(username !== null && password !== null) {
      this.loadUser(username, password)
    }
    
  }
  private userUrl = "http://localhost:8080/appusers"
  private itemUrl = "http://localhost:8080/items"
  private recipeUrl = "http://localhost:8080/recipes"
  private ingredientUrl = "http://localhost:8080/ingredients"
  private cookedRecipeUrl = "http://localhost:8080/cookedrecipes"

  public loggedIn = false
  public pageName: number = Page.HOME

  // Below line ({} as Interface) also works for classes
  public user =  {} as AppUser
  public users: AppUser[] = []
  public $user: Subject<AppUser> = new Subject
  public $users: Subject<AppUser[]> = new Subject
  
  public item = {} as Item
  public updatedItem = {} as Item
  public items: Item[] = []
  public $item: Subject<Item> = new Subject
  public $items: Subject<Item[]> = new Subject

  public recipe = {} as Recipe
  public recipes: Recipe[] = []
  public $recipe: Subject<Recipe> = new Subject
  public $recipes: Subject<Recipe[]> = new Subject

  public ingredientRequest = {} as IngredientDTO
  public recipeIngredients: IngredientDTO[] = [{} as IngredientDTO]
  public ingredients: Ingredient[] = []
  public $ingredient: Subject<Ingredient> = new Subject
  public $ingredients: Subject<Ingredient[]> = new Subject

  public cookedRecipe = {} as CookedRecipe
  public cookedRecipes: CookedRecipe[] = []
  public $cookedRecipe: Subject<CookedRecipe> = new Subject
  public $cookedRecipes: Subject<CookedRecipe[]> = new Subject

  //Step is made an object to be identifiable by the ui service
  public step = {} as Step
  public steps: Step[] = [{} as Step]
  public $steps: Subject<Step[]> = new Subject
  

  public editSteps: string[] = []

  public currentUser = {} as AppUser

  public continueCook = false
  public cookOk = false

  public showError(message: string): void {
    this.snackBar.open(message, undefined, {duration: 4000})
  }

  public goHome(): void {
    this.pageName = Page.HOME
  }

  public showLogin(): void {
    this.pageName = Page.LOGIN
  }

  public showRegister(): void {
    this.pageName = Page.REGISTER
  }

  public showNewItem(): void {
    this.pageName = Page.NEWITEM
  }

  public showNewRecipe(): void {
    this.pageName = Page.NEWRECIPE
  }

  public showUsers(): void {
    this.pageName = Page.USERS
  }

  public showRecipes(): void {
    this.pageName = Page.RECIPES
  }

  public showCookedRecipes(): void {
    this.pageName = Page.COOKEDRECIPES
  }

  public showRecipeDetails(): void {
    this.pageName = Page.RECIPEDETAILS
  }

  public showEditUser(): void {
    this.pageName = Page.EDITUSER
  }

  public checkLogin(): void {
    const username = localStorage.getItem('username')
    const password = localStorage.getItem('password')
    if(username !== null && password !== null) {
      this.loadUser(username, password)
    }
  }

  public login(appUser: AppUser): void {
    if(appUser != null) {
      localStorage.setItem('username', appUser.username)
      localStorage.setItem('password', appUser.password)
    this.loggedIn = true
  }
  }

  public logout(): void {
    localStorage.clear()
    this.currentUser = {} as AppUser
    this.loggedIn = false
    this.goHome()
  }

  public getUser(): AppUser {
    return this.user
  }

  public getItem(): Item {
    return this.item
  }

  public getRecipe(): Recipe {
    return this.recipe
  }

  public getCookedRecipe(): CookedRecipe {
    return this.cookedRecipe
  }

  public watchUser(): Observable<AppUser> {
    return this.$user.asObservable()
  }

  public watchRecipe(): Observable<Recipe> {
    return this.$recipe.asObservable()
  }

  public watchRecipes(): Observable<Recipe[]> {
    return this.$recipes.asObservable()
  }

  public watchItem(): Observable<Item> {
    return this.$item.asObservable()
  }

  public watchItems(): Observable<Item[]> {
    return this.$items.asObservable()
  }

  // C
  public postAppUser(user: AppUserDTO): void {
    this.http.post<AppUserDTO>(this.userUrl, user).pipe(take(1))
    .subscribe({
      next: () => {
        this.loadUsers()
      },
      error: err => {
        this.showError('Oops, something went wrong.')
      }
    })
  }

  public postItem(item: ItemDTO): void {
    this.http.post<ItemDTO>(this.itemUrl, item).pipe(take(1))
    .subscribe({
      next: () => {
        this.loadItems()
      },
      error: err => {
        this.showError('Item likely already exists. Try adding quantity via the home menu!')
      }
    })
  }

  public postCookedRecipe(cookedRecipe: CookedRecipeDTO): void {
    this.http.post<CookedRecipeDTO>(this.cookedRecipeUrl, cookedRecipe).pipe(take(1))
    .subscribe({
      next: () => {
        this.loadCookedRecipes()
      },
      error: err => [
        this.showError('Oops, something went wrong.')
      ]
    })
  }

  public postRecipe(recipe: RecipeDTO): void {
    this.http.post<RecipeDTO>(this.recipeUrl, recipe).pipe(take(1))
    .subscribe({
      next: () => {
        this.loadRecipes()
        
        // After posting a recipe, we reload the user to load our changes
        this.loadUserById(this.currentUser.id)

        
        this.steps = [{} as Step]
        this.recipeIngredients = [{} as IngredientDTO]
        
      },
      error: err => [
        this.showError('Oops, something went wrong.')
      ]
    })
  }

  public postIngredient(ingredient: IngredientDTO): void {
    this.http.post<IngredientDTO>(this.ingredientUrl, ingredient).pipe(take(1))
    .subscribe({
      next: () => {
        
      },
      error: err => {
        this.showError('Oops, something went wrong.')
      }
    })
  }

  // R
  public loadUser(username: string, password: string): void {
    this.http.get<AppUser>(`http://localhost:8080/appusers?username=${username}&password=${password}`)
    .pipe(take(1)).subscribe({
      next: appUser => {
        console.log("Before " + this.currentUser)
        this.login(appUser)

        this.currentUser = appUser
        console.log("Login successful?")
        console.log("After: " + this.currentUser)
        this.goHome()
      },
      error: err => {
        console.log('Login failed.')
        this.showError('Invalid login.')
      }
    })
  }

  public loadUserById(id: number): void {
    this.http.get<AppUser>(`http://localhost:8080/appusers/${id}`)
    .pipe(take(1)).subscribe({
      next: appUser => {
        this.currentUser = appUser
        this.$user.next(appUser)
      },
      error: err => {
        this.showError('Could not find user.')
      }
    })
  }

  public loadItemById(id: number): void {
    this.http.get<Item>(`http://localhost:8080/items/${id}`)
    .pipe(take(1)).subscribe({
      next: item => {
        this.item = item
        this.$item.next(item)
      },
      error: err => {
        this.showError('Could not find item.')
      }
    })
  }

  public loadRecipeById(id: number): void {
    this.http.get<Recipe>(`http://localhost:8080/recipes/${id}`)
    .pipe(take(1)).subscribe({
      next: recipe => {
        this.recipe = recipe
        this.$recipe.next(recipe)
      },
      error: err => {
        this.showError('Could not find recipe.')
      }
    })
  }

  public loadUsers(): void {
    this.http.get<AppUser[]>(this.userUrl).pipe(take(1)).subscribe({
      next: appUsers => {
        console.log(appUsers)
        this.users = appUsers
        this.$user.next(this.currentUser)
        this.$users.next(appUsers)
      },
      error: err => {
        this.showError('Could not load users.')
      }
    })
  }

  public loadItems(): void {
    this.http.get<Item[]>(this.itemUrl).pipe(take(1)).subscribe({
      next: items => {
        console.log(items)
        this.items = items
        this.$items.next(items)
      },
      error: err => {
        this.showError('Could not load items.')
      }
    })
  }

  public loadRecipes(): void {
    this.http.get<Recipe[]>(this.recipeUrl).pipe(take(1)).subscribe({
      next: recipes => {
        console.log(recipes)
        this.recipes = recipes
        this.$recipes.next(recipes)
      },
      error: err => {
        this.showError('Could not load recipes.')
      }
    }) 
  }

  public loadCookedRecipes(): void {
    this.http.get<CookedRecipe[]>(this.cookedRecipeUrl).pipe(take(1)).subscribe({
      next: cookedRecipes => {
        console.log("Cooked Recipes: " + cookedRecipes)
        this.cookedRecipes = cookedRecipes
        this.$cookedRecipes.next(cookedRecipes)
      },
      error: err => {
        this.showError('Could not load cooked recipes.')
      }
    })
  }

  public loadIngredients(): void {
    this.http.get<Ingredient[]>(this.ingredientUrl).pipe(take(1)).subscribe({
      next: ingredients => {
        console.log(ingredients)
        this.ingredients = ingredients
        this.$ingredients.next(ingredients)
      },
      error: err => {
        this.showError('Could not load ingredients.')
      }
    })
  }

  // U
  public updateUser(updatedUser: AppUserDTO): void {
    this.http.put<AppUserDTO>(`http://localhost:8080/appusers/${updatedUser.id}`, updatedUser)
    .pipe(take(1)).subscribe({
      next: () => {
        
        localStorage.setItem('username', updatedUser.username)
        localStorage.setItem('password', updatedUser.password)
        this.loadUsers()
      },
      error: err => {
        this.showError('Could not update account.')
      }
    })
  }

  public updatedIngredients(ingredient: IngredientDTO): void {
    this.http.put<ItemDTO>(`http://localhost:8080/items/${ingredient.id}`, ingredient)
    .pipe(take(1)).subscribe({
      next: () => {
        this.loadIngredients()
        this.loadRecipes()
      },
      error: err => {
        this.showError('Could not update ingredient.')
      }
    })
  }

  public updateItem(updatedItem: ItemDTO): void {
    this.http.put<ItemDTO>(`http://localhost:8080/items/${updatedItem.id}`, updatedItem)
    .pipe(take(1)).subscribe({
      next: () => {
        this.loadItems()
        this.loadRecipes()
      },
      error: err => {
        this.showError('Could not update item.')
      }
    })
  }
  
  public updateRecipe(updatedRecipe: RecipeDTO): void {
    this.http.put<RecipeDTO>(`http://localhost:8080/recipes/${updatedRecipe.id}`, updatedRecipe)
    .pipe(take(1)).subscribe({
      next: () => {
        this.loadRecipes()
      },
      error: err => {
        this.showError('Could not update recipe.')
      }
    })
  }

  public updateCookedRecipe(updatedCookedRecipe: CookedRecipeDTO): void {
    this.http.put<CookedRecipeDTO>(`http://localhost:8080/cookedrecipes/${updatedCookedRecipe.id}`, updatedCookedRecipe)
    .pipe(take(1)).subscribe({
      next: () => {
        this.loadCookedRecipes()
      },
      error: err => {
        this.showError('Could not updated cooked recipe.')
      }
    })
  }

  
  private cookedRecipeRequest = {} as CookedRecipeDTO
  public subtractIngredients(recipe: Recipe): void {
    this.http.put<ItemDTO[]>("http://localhost:8080/items", recipe)
    .pipe(take(1)).subscribe({
      next: () => {
        this.loadItems()
        
        this.cookedRecipeRequest.name = recipe.name
        this.cookedRecipeRequest.description = recipe.description
        this.cookedRecipeRequest.image = recipe.image
        this.cookedRecipeRequest.weight = recipe.totalWeight
        this.cookedRecipeRequest.calories = recipe.totalCalories
        this.postCookedRecipe(this.cookedRecipeRequest)
      },
      error: err => {
        this.showError('Insufficient ingredients.')
      }
    })
    
  }

  // public checkIngredient(itemNo: number, difference: number): boolean | null {
  //   this.http.get<Item>(`http://localhost:8080/items/${itemNo}`)
  //     .pipe(take(1)).subscribe({
  //       next: item => {
  //         this.usedItem = item
  //         console.log("this.usedItem.quantity = " + this.usedItem.quantity)
  //         console.log("item.quantity = " + item.quantity)
  
  //         //Checks if user has enough ingredients for the recipe
  //         if(this.usedItem.quantity >= difference) {
  //           console.log("true")
  //           this.usedItem.quantity = this.usedItem.quantity - difference
  //           this.updateItem(this.usedItem)
  //           return true
  //         } else {
  //           console.log("false")
  //           this.showError("Not enough ingredients!")
  //           return false
            
  //         }},
  //       error: err => {
  //         this.showError('Item no longer exists.')
  //         return false
  //       }})      
  //       return null
      
      
  // }
  

  // public loadAndSubtract(itemNo: number, difference: number): boolean {
  //   console.log("Difference = " + difference)
  //   this.http.get<Item>(`http://localhost:8080/items/${itemNo}`)
  //   .pipe(take(1)).subscribe({
  //     next: item => {
  //       this.usedItem = item
  //       console.log("this.usedItem.quantity = " + this.usedItem.quantity)
  //       console.log("item.quantity = " + item.quantity)

  //       //Checks if user has enough ingredients for the recipe
  //       if(this.usedItem.quantity >= difference) {
  //         this.usedItem.quantity = this.usedItem.quantity - difference
  //         this.updateItem(this.usedItem)
  //         this.cookOk = true
  //       } else {
  //         this.showError("Not enough ingredients!")
  //         this.cookOk = false
  //       }},
  //     error: err => {
  //       this.showError('Item no longer exists.')
  //     }})
  //     return this.cookOk
  // }

  // D
  public deleteUser(user: AppUser): void {
    this.http.delete(`http://localhost:8080/appusers/${user.id}`)
    .pipe(take(1)).subscribe({
      next: () => {
        this.logout()
        this.loadUsers()

      },
      error: err => {
        this.showError('Oops, something went wrong.')
      }
    })
  }

  public deleteItem(item: Item): void {
    this.http.delete(`http://localhost:8080/items/${item.id}`)
    .pipe(take(1)).subscribe({
      next: () => {
        this.loadItems()
      },
      error: err => {
        this.showError('Oops, something went wrong.')
      }
    })
  }

  public deleteRecipe(recipe: Recipe): void {
    this.http.delete(`http://localhost:8080/recipes/${this.currentUser.id}/${recipe.id}`)
    .pipe(take(1)).subscribe({
      next: () => {
        this.loadRecipes()
        this.loadUserById(this.currentUser.id)
      },
      error: err => {
        this.showError('Oops, something went wrong.')
      }
    })
  }

  public deleteCookedRecipe(cookedRecipe: CookedRecipe): void {
    this.http.delete(`http://localhost:8080/cookedrecipes/${cookedRecipe.id}`)
    .pipe(take(1)).subscribe({
      next: () => {
        this.loadCookedRecipes()
      },
      error: err => {
        this.showError('Oops, something went wrong.')
      }
    })
  }
}
