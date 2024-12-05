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
export class AuthService implements OnInit {

  baseUrl = "http://localhost:8888";

  username: string="";
 
  constructor(private httpClient:HttpClient, private router:Router) { }
  

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.baseUrl}/api/v1/auth/signup`, user);
  }

  login(user:any):Observable<LoginResponse>{
    return this.httpClient.post<any>(`${this.baseUrl}/api/v1/auth/login`, user).pipe(
      tap(response => {
        console.log('Login response from backend:', response); // Log the entire response to see what data is returned
        this.username = response.userName;
        this.initializeUser();
        if (response.token && response.userName && response.role) {
          console.log('Response contains token, username, and role');
        } else {
          console.error('One or more fields are missing in the response');
        }
      })
    );
  }
  initializeUser() {
    if (this.username) {
      this.fetchUserByUsername();
    } else {
      console.warn('Username is not available during initialization.');
    }
  }


  getAllUsers() {
    return this.httpClient.get<Array<User>>(`${this.baseUrl}/users/all`);
  }


  ngOnInit(){
    
  }
  
  private user: User  | undefined;
  
  
  fetchUserByUsername(): void {
    this.httpClient.get<User>(`${this.baseUrl}/users/getByUsername/${this.username}`).subscribe(
      (user) => {
        this.user = user;
        console.log('User fetched and stored:', this.user);
  
        // Set user ID in session storage
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

  
  // Get the stored user data

  getUserByUsername(): User | undefined {
    return this.user;
  }
   
   
}
