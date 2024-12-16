import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  private isLoggedIn: boolean = !!localStorage.getItem('currentUser');
  private currentUser: any = {};

  setCurrentUser(user: any): void {
    this.currentUser = user;
  }

  getCurrentUser(): any {
    return this.currentUser;
  }

  getRole(): string {
    return String(this.currentUser.role);
  }

  login(): void {
    this.isLoggedIn = true;
    this.router.navigate(['/all-users']);
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isUserLoggedIn(): boolean {
    return this.isLoggedIn;
  }
}
