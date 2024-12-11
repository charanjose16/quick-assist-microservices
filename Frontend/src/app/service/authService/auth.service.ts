import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginCredentials } from '../../model/loginCredentials';
import { LoginResponse } from '../../model/loginResponse';
import { User } from '../../model/User';


@Injectable({
  providedIn: 'root'
})
export class AuthService   {
  baseUrl = 'http://localhost:8888';
  username = '';
  private user: User | undefined;

  constructor(private httpClient: HttpClient, private router: Router) {}

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.baseUrl}/api/v1/auth/signup`, user);
  }

  login(user: any): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.baseUrl}/api/v1/auth/login`, user).pipe(
      tap(response => {
        if (response.token.jwt && response.userName && response.role) {
          // sessionStorage.setItem('authToken', response.token.jwt);
          sessionStorage.setItem('username', response.userName);
          sessionStorage.setItem('role', response.role);
          this.username = response.userName;
          this.initializeUser();
          console.log('Login successful:', response);
        } else {
          console.error('Invalid login response:', response);
        }
      })
    );
    
  }

  initializeUser(): void {
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      this.username = storedUsername;
      this.fetchUserByUsername();
    } else {
      console.warn('No username found in session storage. User not initialized.');
    }
  }

  fetchUserByUsername(): void {
    if (!this.username) {
      console.error('Cannot fetch user without a username.');
      return;
    }

    this.httpClient.get<User>(`${this.baseUrl}/users/getByUsername/${this.username}`).subscribe(
      (user) => {
        this.user = user;
        console.log('User fetched and stored:', this.user);

        if (this.user && this.user.id) {
          sessionStorage.setItem('userId', this.user.id.toString());
          console.log('User ID stored in session storage:', this.user.id);
        } else {
          console.warn('User ID is undefined. Could not store in session storage.');
        }
      },
      (error) => {
        console.error('Error fetching user:', error);
      }
    );
  }

  getUserByUsername(): User | undefined {
    return this.user;
  }

  logout(): void {
    this.httpClient.post<void>(`${this.baseUrl}/api/v1/auth/logout`, {}).subscribe(
      () => {
        this.clearSession();
      },
      (error) => {
        console.error('Logout failed:', error);
        this.clearSession();
      }
    );
  }

  private clearSession(): void {
    sessionStorage.clear();
    this.username = '';
    this.user = undefined;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('authToken');
  }

  getAuthToken(): string | null {
    return sessionStorage.getItem('authToken');
  }

  getUserDetails(): User | undefined {
    return this.user;
  }
   
   
}
