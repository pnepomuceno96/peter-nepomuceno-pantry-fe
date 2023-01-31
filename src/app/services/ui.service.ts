import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject, take } from 'rxjs';
import { AppUser } from 'src/data/AppUser';
import { CookedRecipe } from 'src/data/CookedRecipe';
import { Credentials } from 'src/data/Credentials';
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
  // A class defines how an object is implemented(its specific properties & methods).
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.loadUsers()
    this.loadItems()
    this.loadRecipes()
    this.loadCookedRecipes()
    

    this.$users.subscribe({next: users  => {
      this.userDataSource = new MatTableDataSource(users.slice())
      this.userDataSource.filterPredicate = (data: AppUser, filter) => {
        const dataStr = JSON.stringify(data.username).toLowerCase();
        return dataStr.indexOf(filter) != -1;
      }

      // LocalStorage is used to access certain storage space in the origin via key/value pairs.
      const username = localStorage.getItem('username')
      const password = localStorage.getItem('password')
      const token = localStorage.getItem('token')
      
      if(username !== null && password !== null && token != null
          && username !== 'undefined' && password !== 'undefined') {
          this.loadUser(username, password)
        }
      
    }})

    this.$items.subscribe({next: items => {
      // A MatTableDataSource object is used as a reference for data to be filtered, sorted, and paginated.
      this.itemDataSource = new MatTableDataSource(items.slice())

      // filterPredicate checks if filter string matches data
      this.itemDataSource.filterPredicate = (data: Item, filter) => {
        const dataStr = JSON.stringify(data.name).toLowerCase();
        return dataStr.indexOf(filter) != -1;
      }
    }})

    this.$cookedRecipes.subscribe({next: cookedRecipes => {
      //this.sortedCookedRecipes = cookedRecipes.slice()
      this.cookedRecipeDataSource = new MatTableDataSource(cookedRecipes.slice())
      this.cookedRecipeDataSource.filterPredicate = (data: CookedRecipe, filter) => {
        const dataStr = JSON.stringify(data.name).toLowerCase();
        return dataStr.indexOf(filter) != -1;
      }
    }})
    
    this.$recipes.subscribe({next: recipes => {
      this.recipeDataSource = new MatTableDataSource(recipes)
      this.recipeDataSource.filterPredicate = (data: Recipe, filter) => {
        const dataStr = JSON.stringify(data.name).toLowerCase();
        return dataStr.indexOf(filter) != -1;
      }
    }})
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
  public $recipeIngredients: Subject<IngredientDTO[]> = new Subject
  
  public cookedRecipe = {} as CookedRecipe
  public cookedRecipes: CookedRecipe[] = []
  public $cookedRecipe: Subject<CookedRecipe> = new Subject
  public $cookedRecipes: Subject<CookedRecipe[]> = new Subject

  //Step is made an object to be identifiable by the ui service
  public step = {} as Step
  public steps: Step[] = [{} as Step]
  public $steps: Subject<Step[]> = new Subject
  
  public creds = {} as Credentials


  public editSteps: string[] = []

  public currentUser = {} as AppUser

  public continueCook = false
  public cookOk = false

  public showError(message: string): void {
    this.snackBar.open(message, undefined, {duration: 4000})
  }

  public showMessage(message: string): void {
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


  //Authorization
  public checkLogin(): void {
    const username = localStorage.getItem('username')
    const password = localStorage.getItem('password')
    if(username !== null && password !== null) {
      
      this.loadUser(username, password)
    }
  }

  public checkAuth(token: string, username: string): void {
    this.http.get<Credentials>(`http://localhost:8081/checkAuth?token=${token}`).pipe(take(1)).subscribe({
      next: () => {
        console.log(username)
        this.getUserByUsername(username)
      },
      error: err => {
        this.showError("Authorization failed.")
      }
    })
  }

  public login(creds: Credentials): void {
    this.http.post<string>('http://localhost:8081/login', creds).pipe(take(1)).subscribe({
      next: token => {
        this.checkAuth(token, creds.username)
        localStorage.setItem('token', token)
        
      },
      error: err => {
        this.showError("Login failed.")
      }
    })
  }

  public getUserByUsername(username: string): void {
    console.log(username)
    this.http.get<AppUser>(`http://localhost:8080/appusers?username=${username}`)
    .pipe(take(1)).subscribe({
      next: appUser => {
        this.$user.next(appUser)
        //this.loadUsers()
        this.loggedIn = true
        localStorage.setItem('username', appUser.username)
        localStorage.setItem('password', appUser.password)
        //this.loadUser(appUser.credentials)
        this.currentUser = appUser
        this.recipeDataSource = new MatTableDataSource(this.currentUser.recipes.slice())
        this.recipeDataSource.filterPredicate = (data: Recipe, filter) => {
        const dataStr = JSON.stringify(data.name).toLowerCase();
        
        return dataStr.indexOf(filter) != -1;
        }
        this.goHome()
        
      },
      error: err => {
        
        this.showError('Could not find user.')
      }
    })
  }

  public logout(token: string): void {
    this.http.get<Credentials>(`http://localhost:8081/logout?token=${token}`).pipe(take(1)).subscribe({
      next: () => {
        this.creds = {username: '', password: ''}
        localStorage.clear()
        this.currentUser = {} as AppUser
        this.loggedIn = false
        this.goHome()
      },
      error: err => {
        this.showError('Oops, something went wrong.')
      }
    }) 
  }

  public signUp(creds: Credentials): void {
    this.http.post<AppUser>('http://localhost:8081/signup', creds).pipe(take(1)).subscribe({
      next: () => {
        this.loadUsers()
        this.goHome()
      },
      error: err => {
        this.showError('Username not accepted')
      }
    })
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

  sortedUsers: AppUser[] = []
  sortUsers(sort: Sort) {
    const data = this.users.slice();
    if (!sort.active || sort.direction === '') {
      this.userDataSource.filteredData = data;
      return;
    }

    this.userDataSource.filteredData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'username':
          return compare(a.username, b.username, isAsc);
        default:
          return 0;
      }
    });
  }

  sortedItems: Item[] = []
  sortItems(sort: Sort) {
    const data = this.items.slice();
    if (!sort.active || sort.direction === '') {
      this.itemDataSource.filteredData = data;
      return;
    }

    this.itemDataSource.filteredData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'calories':
          return compare(a.calories, b.calories, isAsc);
        case 'weight':
          return compare(a.weight, b.weight, isAsc);
        case 'quantity':
          return compare(a.quantity, b.quantity, isAsc);
        default:
          return 0;
      }
    });
  }

  
  sortRecipes(sort: Sort) {
    const data = this.currentUser.recipes.slice();
    if (!sort.active || sort.direction === '') {
      this.recipeDataSource.filteredData = data;
      return;
    }

    this.recipeDataSource.filteredData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'calories':
          return compare(a.totalCalories, b.totalCalories, isAsc);
        case 'weight':
          return compare(a.totalWeight, b.totalWeight, isAsc);
        default:
          return 0;
      }
    });
  }

  sortedCookedRecipes: CookedRecipe[] = []
  sortCookedRecipes(sort: Sort) {
    const data = this.cookedRecipes.slice();
    if (!sort.active || sort.direction === '') {
      this.cookedRecipeDataSource.filteredData = data;
      return;
    }

    this.cookedRecipeDataSource.filteredData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'calories':
          return compare(a.calories, b.calories, isAsc);
        case 'weight':
          return compare(a.weight, b.weight, isAsc);
        default:
          return 0;
      }
    });
  }

  userDataSource= new MatTableDataSource(this.sortedUsers)
  applyUserFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userDataSource.filter = filterValue.trim().toLowerCase()
  }

  itemDataSource= new MatTableDataSource(this.sortedItems)
  applyItemFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.itemDataSource.filter = filterValue.trim().toLowerCase();
  }

  recipeDataSource= new MatTableDataSource(this.currentUser.recipes)
  applyRecipeFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.recipeDataSource.filter = filterValue.trim().toLowerCase();
    
  }

  cookedRecipeDataSource= new MatTableDataSource(this.sortedCookedRecipes)
  applyCookedRecipeFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.cookedRecipeDataSource.filter = filterValue.trim().toLowerCase();
  }

  public watchIngredients(): Observable<IngredientDTO[]> {
    return this.$recipeIngredients.asObservable()
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
        this.goHome()
        this.showMessage('Item posted.')
      },
      error: err => {
        this.showError('Oops, something went wrong.')
      }
    })
  }

  public postCookedRecipe(cookedRecipe: CookedRecipeDTO): void {
    this.http.post<CookedRecipeDTO>(this.cookedRecipeUrl, cookedRecipe).pipe(take(1))
    .subscribe({
      next: () => {
        this.loadCookedRecipes()
        this.showMessage("Recipe cooked.")
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
        // After posting a recipe, we reload the user to load our changes
        this.loadUserById(this.currentUser.id)
        this.loadRecipes()
        this.steps = [{} as Step]
        this.recipeIngredients = [{} as IngredientDTO]
        
      },
      error: err => {
        this.steps = [{} as Step]
        this.recipeIngredients = [{} as IngredientDTO]
        this.showError('Oops, something went wrong.')
    }
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
        this.login({username: appUser.username, password: appUser.password})

        this.currentUser = appUser

        this.goHome()
      },
      error: err => {
        console.log('Login failed.')
        this.showError('Invalid login.')
      }
    })
  }

  public loadUserById(id: string): void {
    this.http.get<AppUser>(`http://localhost:8080/appusers/${id}`)
    .pipe(take(1)).subscribe({
      next: appUser => {
        this.currentUser = appUser
        this.$user.next(appUser)
        this.$recipes.next(this.currentUser.recipes)
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
        this.$recipes.next(this.currentUser.recipes)
        //this.loadUsers()
        
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

  public loadItemByName(): void {
    this.http.get<Item>(this.itemUrl)
  }

  // U
  public updateUser(updatedUser: AppUserDTO): void {
    this.http.put<AppUserDTO>(`http://localhost:8080/appusers/${updatedUser.id}`, updatedUser)
    .pipe(take(1)).subscribe({
      next: () => {
        
        localStorage.setItem('username', updatedUser.username)
        localStorage.setItem('password', updatedUser.password)
        this.loadUsers()
        this.goHome()
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
        this.loadItems()
      }
    })
  }
  
  public updateRecipe(updatedRecipe: RecipeDTO, ingredients: Ingredient[]): void {
    this.http.put<RecipeDTO>(`http://localhost:8080/recipes/${updatedRecipe.id}`, updatedRecipe)
    .pipe(take(1)).subscribe({
      next: () => {
        this.loadItems()
        this.loadUserById(this.currentUser.id)
        this.loadRecipes()
        //this.loadUsers()
        //this.checkLogin()
        this.showMessage("Recipe updated.")

        this.steps = [{} as Step]
        this.recipeIngredients = [{} as IngredientDTO]

        //Delete old ingredient data
        for(let i=0; i<ingredients.length; i++) {
          this.deleteIngredient(ingredients[i])
        }

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

  // D
  public deleteUser(user: AppUser): void {
    this.http.delete(`http://localhost:8080/appusers/${user.id}`)
    .pipe(take(1)).subscribe({
      next: () => {
        this.logout(user.id)
        this.loadUsers()

      },
      error: err => {
        this.showError('Oops, something went wrong.')
      }
    })
  }

  public deleteIngredient(ingredient: Ingredient): void {
    this.http.delete(`http://localhost:8080/ingredients/${ingredient.id}`)
    .pipe(take(1)).subscribe({
      next: () => {
        this.loadIngredients()
      },
      error: err => {
        this.showError('Something went wrong with deleting ingredient.')
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
        
        this.loadUserById(this.currentUser.id)
        this.loadRecipes()
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
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
