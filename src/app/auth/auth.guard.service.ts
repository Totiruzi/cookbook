import { map, tap, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { AuthServise } from './auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthServise,
              private router: Router,
              private store: Store<fromApp.AppState>) {}
  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot):
   boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    // checking if the user is authenticated
    return this.store.select('auth').pipe(
      take(1),
      map(authState => {
        return authState.user;
      }),
      map(user => {
      const isAuth = !!user;
      if (isAuth) {
        return true;
      }
      return this.router.createUrlTree(['/auth']);
    })
    //  tap(isAuth => {
    //   if (!isAuth) {
    //     this.router.navigate(['/auth']);
    //   }
    // })
    );
  }
}
