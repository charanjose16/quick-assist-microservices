import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/User';
import { AuthService } from '../authService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookingRequestService implements OnInit {

  baseUrl="http://localhost:8888"

  user: User | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Get the user data from the service
    this.user = this.authService.getUserByUsername();
    if (this.user) {
      console.log('User data:', this.user);
    } else {
      console.log('User data is not available');
    }
  }




}
