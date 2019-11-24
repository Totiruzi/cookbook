import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'Meat Loaf',
      'Meatloaf Recipe that is flavorful and juicy on the inside, with a delicious glaze spread on the',
      'https://www.sixsistersstuff.com/wp-content/uploads/2018/02/Glazed-Ground-Turkey-Meatloaf-on-SixSistersStuff-683x1024.jpg',
      [
        new Ingredient('lbs ground beef (90% lean)', 2),
        new Ingredient('teaspoon dried parsley', 1),
        new Ingredient('teaspoon Italian seasoning', 1),
        new Ingredient('teaspoon ground paprika', 0.5),
        new Ingredient('teaspoon red pepper flakes', 0.25)
      ]
    ),
    new Recipe(
      'Zuchinni',
      'How to cook zucchini on the stovetop',
      'https://www.inspiredtaste.net/wp-content/uploads/2018/12/Sauteed-Zucchini-Recipe-1-1200.jpg',
      [
        new Ingredient('pounds chopped zucchini (2 medium)', 1.25),
        new Ingredient('tablespoon butter', 1),
        new Ingredient('tablespoon minced garlic (3 cloves)', 1),
        new Ingredient('Salt and fresh ground black pepper', 0.25),
        new Ingredient('scallion, thinly sliced', 1)
      ]
    ),
    new Recipe(
      'Easy Galic Shrim',
      'A flavorful shrimp dish that can be ready in a few minutes.',
      'https://shewearsmanyhats.com/wp-content/uploads/2015/10/garlic-shrimp-recipe-1b-480x270.jpg',
      [
        new Ingredient('tablespoons olive oil', 2),
        new Ingredient('tablespoon fresh lime or lemon juice', 1),
        new Ingredient('garlic cloves, grated or minced', 6),
        new Ingredient(' teaspoon ground cumin', 1.25),
        new Ingredient('teaspoon red pepper flakes', 0.25)
      ]
    )
  ];
  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngreientToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
