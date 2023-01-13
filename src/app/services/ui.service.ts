import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, take } from 'rxjs';
import { AppUser } from 'src/data/AppUser';
import { Item } from 'src/data/Item';
import { Page } from 'src/data/Pages';
import { Recipe } from 'src/data/Recipe';
import { AppUserDTO } from 'src/DTOs/AppUserDTO';
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

    const username = localStorage.getItem('username')
    const password = localStorage.getItem('password')
    if(username !== null && password !== null) {
      this.getUser(username, password)
    }
  }
  private userUrl = "http://localhost:8080/appusers"
  private itemUrl = "http://localhost:8080/items"
  private recipeUrl = "http://localhost:8080/recipes"

  public loggedIn = false
  public pageName: number = Page.HOME

  // Below line ({} as Interface) also works for classes
  public user = {} as AppUser
  public users: AppUser[] = []
  public $users: Subject<AppUser[]> = new Subject
  
  public item = {} as Item
  public items: Item[] = []
  public $item: Subject<Item> = new Subject
  public $items: Subject<Item[]> = new Subject

  public recipe = {} as Recipe
  public recipes: Recipe[] = []
  public $recipe: Subject<Recipe> = new Subject
  public $recipes: Subject<Recipe[]> = new Subject

  public currentUser = {} as AppUser

  public showError(message: string): void {
    this.snackBar.open(message, undefined, {duration: 2000})
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

  public showUsers(): void {
    this.pageName = Page.USERS
  }

  public showRecipes(): void {
    this.pageName = Page.RECIPES
  }

  public showRecipeDetails(): void {
    this.pageName = Page.RECIPEDETAILS
  }

  public login(appUser: AppUser): void {
    localStorage.setItem('username', appUser.username)
    localStorage.setItem('password', appUser.password)
    this.loggedIn = true
  }

  public logout(): void {
    localStorage.clear()
    this.currentUser = {} as AppUser
    this.loggedIn = false
  }

  // C
  public postAppUser(user: AppUserDTO): void {
    // this.newUser = {
    //   id: 0,
    //   username: username,
    //   password: password,
    //   recipes: []
    // }
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
        this.showError('Oops, something went wrong.')
      }
    })
  }

  public postRecipe(recipe: RecipeDTO): void {
    this.http.post<RecipeDTO>(this.recipeUrl, recipe).pipe(take(1))
    .subscribe({
      next: () => {
        this.loadRecipes()
      },
      error: err => [
        this.showError('Oops, something went wrong.')
      ]
    })
  }

  // R
  public getUser(username: string, password: string): void {
    this.http.get<AppUser>(`http://localhost:8080/appusers?username=${username}&password=${password}`)
    .pipe(take(1)).subscribe({
      next: appUser => {
        this.login(appUser)
        this.currentUser = appUser
        this.goHome()
      },
      error: err => {
        this.showError('Invalid login.')
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
        this.recipes = this.recipes
        this.$recipes.next(recipes)
      },
      error: err => {
        this.showError('Could not load recipes.')
      }
    }) 
  }

  // U
  public updateUser(updatedUser: AppUserDTO): void {
    this.http.put<AppUserDTO>(`http://localhost:8080/appusers/${updatedUser.id}`, updatedUser)
    .pipe(take(1)).subscribe({
      next: () => {
        this.loadUsers()
      },
      error: err => {
        this.showError('Could not update account.')
      }
    })
  }

  public updateItem(updatedItem: ItemDTO): void {
    this.http.put<ItemDTO>(`http://localhost:8080/items/${updatedItem.id}`, updatedItem)
    .pipe(take(1)).subscribe({
      next: () => {
        this.loadItems()
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

  // D
  public deleteUser(user: AppUser): void {
    this.http.delete(`http://localhost:8080/appusers/${user.id}`)
    .pipe(take(1)).subscribe({
      next: () => {
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
    this.http.delete(`http://localhost:8080/recipes/${recipe.id}`)
    .pipe(take(1)).subscribe({
      next: () => {
        this.loadRecipes()
      },
      error: err => {
        this.showError('Oops, something went wrong.')
      }
    })
  }
}
