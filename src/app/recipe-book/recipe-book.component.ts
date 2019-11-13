import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.model';
import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css']
})
export class RecipeBookComponent implements OnInit {
 selectedRecipe: Recipe;
  constructor( private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipeService.recipeSelected
    .subscribe( (recipe: Recipe) => {
      this.selectedRecipe = recipe;
    });
  }
}
