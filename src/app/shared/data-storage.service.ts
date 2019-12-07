import { Recipe } from './../recipe-book/recipe.model';
import { RecipeService } from './../recipe-book/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { AuthServise } from '../auth/auth.service';
import { pipe } from 'rxjs';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authenticationService: AuthServise) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://recipe-book-f649e.firebaseio.com/recipes.json', recipes).subscribe(response => {
      console.log(response);
    });
  }

  fetchRecipes() {
      return this.http.get<Recipe[]>('https://recipe-book-f649e.firebaseio.com/recipes.json').pipe(
        map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        });
      }),
       tap(recipes => {
      this.recipeService.setRecipes(recipes);
    }));
  }
}
