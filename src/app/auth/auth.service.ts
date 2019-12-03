import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthServise {
  constructor(private http: HttpClient) {}
  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCw23ujjWWTy-xa5ExCGKwR4wWgEvCaqH8',
    {
      email: email,
      password : password,
      returnSEcureToken: true
    }).pipe(catchError(this.handleError));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCw23ujjWWTy-xa5ExCGKwR4wWgEvCaqH8',
      {
        email: email,
        password : password,
        returnSEcureToken: true
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
    if (!errorResponse.error || !errorResponse.error.error) {
        return throwError(errorMessage);
      }
    switch(errorResponse.error.error.message) {
        case 'EMAIL_EXISTS':
        errorMessage = 'This email exist already';
        break;
        case 'EMAIL_NOT_FOUND':
        errorMessage = 'THIS EMAIL DOES NOT EXIST!';
        break;
        case 'INVALID_PASSWORD':
        errorMessage = 'INVALID PASSWORD!';
        break;
      }
    return throwError(errorMessage);
  }
}
