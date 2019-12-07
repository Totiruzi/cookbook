import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoute: Routes = [
  { path: '', redirectTo: '/recipeBook', pathMatch: 'full' },
  { path: 'recipeBook', loadChildren:  () => import('./recipe-book/recipes.module').then(m => m.RecipesModule)},
  { path: 'shoppingList', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppinglistModule)},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthMoule) }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoute, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
