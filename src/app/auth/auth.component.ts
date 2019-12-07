import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { AuthServise, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { componentFactoryName } from '@angular/compiler';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceHolderDirective, {static: false}) alertHost: PlaceHolderDirective;
  private closeSubscription: Subscription;
  constructor(private authService: AuthServise,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver) {}
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObservable: Observable<AuthResponseData>;
    this.isLoading = true;
    if (this.isLoginMode) {
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.signUp(email, password);
    }
    authObservable.subscribe(responseData => {
      console.log(responseData);
      this.isLoading = false;
      this.router.navigate(['/recipeBook']);
    },
    errorMessage => {
      console.log(errorMessage);
      this.error = errorMessage;
      this.showErrorAlert(errorMessage);
      this.isLoading = false;
    });
    form.reset();
  }
  ngOnDestroy() {
    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }
  }
  onHadleError() {
    this.error = null;
  }
  private showErrorAlert(message: string) {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
    componentRef.instance.message = message;
    this.closeSubscription = componentRef.instance.close.subscribe( () => {
      this.closeSubscription.unsubscribe();
      hostViewContainerRef.clear();
    })
  }
}
