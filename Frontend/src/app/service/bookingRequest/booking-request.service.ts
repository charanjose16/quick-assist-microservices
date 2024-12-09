import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Booking } from '../../model/Booking';
import { BookingRequest } from '../../model/BookingRequest';
import { Payment } from '../../model/Payment';
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

  createPayment(payment:Payment):Observable<Payment>{
    return this.httpClient.post<Payment>(`${this.baseUrl}/payments/createPayment`,payment)
  }

  createBooking(booking:Booking):Observable<Booking>{
    return this.httpClient.post<Booking>(`${this.baseUrl}/booking/createBooking`,booking)
  }

  getPaymentStatusByRequestId(serviceId:number):Observable<Payment>{
   return this.httpClient.get<Payment>(`${this.baseUrl}/payments/getPaymentByServiceId/${serviceId}`)
  }

  
  getAllBookingsUser(userId: number): Observable<Booking[]> {
    return this.httpClient.get<Booking[]>(`${this.baseUrl}/booking/user/${userId}`)
  }
  getAllBookingsWorker(workerId: number): Observable<Booking[]> {
    return this.httpClient.get<Booking[]>(`${this.baseUrl}/booking/worker/${workerId}`)
  }


  updateBookingStatus(id: number,status: string): Observable<Booking>{
    return this.httpClient.put<Booking>(`${this.baseUrl}/booking/status/${id}/${status}`, {status});
  }


  sendSms(phoneNumber: string, message: string): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/sms/send`, null, {
      params: { phoneNumber, message },
    });
  }
  




 }



