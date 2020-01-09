import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Recipe } from './../recipe-book/recipe.model';
import { RecipeService } from './../recipe-book/recipe.service';
import { map, tap } from 'rxjs/operators';
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from './../recipe-book/store/recipe.actions';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private store: Store<fromApp.AppState>) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://recipe-book-f649e.firebaseio.com/recipes.json', recipes).subscribe(response => {
      console.log(response);
    });
  }

  fetchRecipes() {
      return this.http.get<Recipe[]>('https://recipe-book-f649e.firebaseio.com/recipes.json')
      .pipe(
        map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        });
      }),
       tap(recipes => {
      // this.recipeService.setRecipes(recipes);
      this.store.dispatch(new RecipeActions.SetRecipes(recipes));
    }));
  }
}
