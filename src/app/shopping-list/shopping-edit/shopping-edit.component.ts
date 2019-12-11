import { ShoppingListActions } from './../store/shopping-list.actions';
import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from './../shopping-list.service';
import { Ingredient } from './../../shared/ingredient.model';
import * as shoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) shoppingListForm: NgForm;
  editSubscription: Subscription;
  editMode = false;
  // editedItemIndex: number;
  editedItem: Ingredient;
  constructor(private shoppingListService: ShoppingListService,
              private store: Store<fromShoppingList.AppState>) {}

  ngOnInit() {
    this.editSubscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      } else {
        this.editMode = false;
      }
    });
  /* Without Ngrx */
  //   this.editSubscription = this.shoppingListService.startedEditing
  //   .subscribe( (index: number) => {
  //     this.editedItemIndex = index;
  //     this.editMode = true;
  //     this.editedItem = this.shoppingListService.getIngredient(index);
  //     this.shoppingListForm.setValue({
  //       name: this.editedItem.name,
  //       amount: this.editedItem.amount
  //     });
  //   });
   }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      // this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(new shoppingListActions.UpdateIngredient(newIngredient));
    } else {
      // this.shoppingListService.addIngridient(newIngredient);
      this.store.dispatch(new shoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }
  onReset() {
    this.shoppingListForm.reset();
    this.editMode = false;
    this.store.dispatch(new shoppingListActions.StopEdit())
  }
  onDelete(index: number) {
    // this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new shoppingListActions.DeleteIngredient());
    this.onReset();
  }

  ngOnDestroy() {
    this.editSubscription.unsubscribe();
    this.store.dispatch(new shoppingListActions.StopEdit());
  }
}
