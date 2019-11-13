import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from './../shared/ingredient.model';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Tomatoes', 6),
    new Ingredient('Eggs', 12)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }
  addIngridient(ingrdient: Ingredient) {
    this.ingredients.push(ingrdient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
