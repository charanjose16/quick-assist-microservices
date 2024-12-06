import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { BookingRequest } from '../model/BookingRequest';
import { User } from '../model/User';
import { BookingRequestService } from '../service/bookingRequest/booking-request.service';
import { UserHeaderComponent } from '../user-header/user-header.component';

@Component({
  selector: 'app-user-requests',
  standalone: true,
  imports: [UserHeaderComponent,NgFor,CommonModule],
  templateUrl: './user-requests.component.html',
  styleUrl: './user-requests.component.css'
})
export class UserRequestsComponent {


  requests: BookingRequest[] = [];  
  services: { [key: number]: string } = {}; 
  workers: { [key: number]: string } = {};  

  workerName: string="" ;
  serviceName: string="";
  
  constructor(private bookingRequestService: BookingRequestService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
   
    const userId = Number(sessionStorage.getItem('userId'));


    if (userId) {
      this.getAllBookingsByUserId(userId);
    }
  }

  getAllBookingsByUserId(id: number): void {
    this.bookingRequestService.getAllBookingRequestsByUserId(id).subscribe(
      (response) => {
        this.requests = response;   
        console.log('Fetched requests:', this.requests);

        this.requests.forEach(request => {
          this.fetchServiceName(request.workerId);
          this.fetchWorkerById(request.workerId);
        });
      },
      (error) => {
        console.error('Error fetching booking requests:', error);
      }
    );
  }

  fetchServiceName(serviceId: number): void {
    this.bookingRequestService.getUserById(serviceId).subscribe(res => {
      console.log('API Response:', res); 
      if (res && res.expertise) {
        this.serviceName = res.expertise;   
        this.services[serviceId] = this.serviceName;   
      } else {
        console.error('Service expertise not found for worker ID:', serviceId);
        this.services[serviceId] = 'Service not available';  
      }
      this.cdRef.detectChanges();
    console.log(this.serviceName)});
   
  }

  fetchWorkerById(workerId: number): void {
    console.log(workerId);
    this.bookingRequestService.getUserById(workerId).subscribe(
      res => {
      this.workerName = res.name;
      this.workers[workerId] = `${this.workerName}`; 
      this.cdRef.detectChanges();
      }
      );
  }

  cancelRequest(request: any) {
    console.log(`Canceling request for ${request.serviceName}`);
    // Logic to handle request cancellation
    request.status = 'Cancelled';
  }

  payNow(request: any) {
    console.log(`Paying for ${request.serviceName}`);
    // Logic to handle payment process
  }
  
}
