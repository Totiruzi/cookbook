import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import * as AutActions from '../auth/store/auth.actions';
import { map } from 'rxjs/operators';
import * as RecipeActions from '../recipe-book/store/recipe.actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  isAuthenticated = false;
  private userSubscrition: Subscription;
  constructor(private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.userSubscrition = this.store.select('auth').pipe(
      map(authState => {
        return authState.user;
      })
    ).subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }
  onSaveData() {
    // this.dataStorageService.storeRecipes();
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }
  onFetchData() {
    // this.dataStorageService.fetchRecipes().subscribe();
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }
  onLogout() {
    this.store.dispatch(new AutActions.Logout());
  }
  ngOnDestroy() {
    this.userSubscrition.unsubscribe();
  }
}
