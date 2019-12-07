import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthServise } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  isAuthenticated = false;
  private userSubscrition: Subscription;
  constructor(
    private dataStorageService: DataStorageService,
    private authenticationService: AuthServise
  ) {}

  ngOnInit() {
    this.userSubscrition = this.authenticationService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }
  onSaveData() {
    this.dataStorageService.storeRecipes();
  }
  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
  onLogout() {
    this.authenticationService.logout();
  }
  ngOnDestroy() {
    this.userSubscrition.unsubscribe();
  }
}
