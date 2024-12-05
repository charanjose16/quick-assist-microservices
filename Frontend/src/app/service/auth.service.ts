import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginCredentials } from '../model/loginCredentials';
import { LoginResponse } from '../model/loginResponse';
import { User } from '../model/User';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = "http://localhost:8888";

  constructor(private httpClient:HttpClient, private router:Router) { }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.baseUrl}/api/v1/auth/signup`, user);
  }

  login(user:any):Observable<LoginResponse>{
    return this.httpClient.post<any>(`${this.baseUrl}/api/v1/auth/login`, user).pipe(
      tap(response => {
        console.log('Login response from backend:', response); // Log the entire response to see what data is returned
        if (response.token && response.userName && response.role) {
          console.log('Response contains token, username, and role');
        } else {
          console.error('One or more fields are missing in the response');
        }
      })
    );
  }


  getAllUsers() {
    return this.httpClient.get<Array<User>>(`${this.baseUrl}/users/all`);
  }



}
