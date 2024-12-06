import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BookingRequest } from '../../model/BookingRequest';
import { User } from '../../model/User';
import { AuthService } from '../authService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookingRequestService  {

  baseUrl="http://localhost:8888"

  // user: User | undefined;

  constructor(private authService: AuthService, private httpClient: HttpClient) {}

  // ngOnInit(): void {
  //   this.user = this.authService.getUserByUsername();
  //   if (this.user) {
  //     console.log('User data:', this.user);
  //   } else {
  //     console.log('User data is not available');
  //   }



  createBookingRequest(bookingRequest:BookingRequest): Observable<BookingRequest>{
      return this.httpClient.post<BookingRequest>(`${this.baseUrl}/serviceRequest/createServiceRequest`, bookingRequest)
  }

  getAllBookingRequestsByUserId(id: number): Observable<BookingRequest[]> {
    return this.httpClient.get<BookingRequest[]>(`${this.baseUrl}/serviceRequest/user/${id}`)
  }

  getAllBookingRequestsByWorkerId(id: number): Observable<BookingRequest[]> {
    return this.httpClient.get<BookingRequest[]>(`${this.baseUrl}/serviceRequest/worker/${id}`)
  }

  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User> (`${this.baseUrl}/users/${id}`);
  }

  updateServiceRequestStatus(serviceRequestId: number, requestStatus: string): Observable<BookingRequest> {
      return this.httpClient.put<BookingRequest>(`${this.baseUrl}/serviceRequest/${serviceRequestId}/${requestStatus}`,[])
  }

  
}



