import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType} from '@ngrx/effects';
import { RecipeService } from './recipe.service';
import { Observable } from 'rxjs';
import { Recipe } from './recipe.model';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipe-book/store/recipe.actions';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
  export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private store: Store<fromApp.AppState>,
              private recipeService: RecipeService,
              private actions$: Actions) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const recipes = this.recipeService.getRecipes();
      if (recipes.length === 0 ) {
        // return this.dataStorageService.fetchRecipes();
        this.store.dispatch(new RecipesActions.FetchRecipes());
        return this.actions$.pipe(ofType(RecipesActions.SET_RECIPES), take(1));
      } else {
        return recipes;
      }

    }
}
