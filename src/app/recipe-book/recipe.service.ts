import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      'test',
      'test rescipe',
      'https://www.sixsistersstuff.com/wp-content/uploads/2018/02/Glazed-Ground-Turkey-Meatloaf-on-SixSistersStuff-683x1024.jpg'
    ),
    new Recipe(
      'test 2',
      'another test rescipe',
      'https://www.sixsistersstuff.com/wp-content/uploads/2018/02/Glazed-Ground-Turkey-Meatloaf-on-SixSistersStuff-683x1024.jpg'
    ),
    new Recipe(
      'test 3',
      'A third test rescipe',
      'https://www.sixsistersstuff.com/wp-content/uploads/2018/02/Glazed-Ground-Turkey-Meatloaf-on-SixSistersStuff-683x1024.jpg'
    )
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}
