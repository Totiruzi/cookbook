import { Component, OnInit } from '@angular/core';
import { AuthServise } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor( private authenticationService: AuthServise) {}
  ngOnInit() {
    this.authenticationService.autoLogin();
  }
}
