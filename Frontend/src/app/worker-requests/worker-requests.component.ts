import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BookingRequest } from '../model/BookingRequest';
import { BookingRequestService } from '../service/bookingRequest/booking-request.service';
import { WorkerHeaderComponent } from '../worker-header/worker-header.component';

@Component({
  selector: 'app-worker-requests',
  standalone: true,
  imports: [WorkerHeaderComponent,CommonModule],
  templateUrl: './worker-requests.component.html',
  styleUrl: './worker-requests.component.css'
})
export class WorkerRequestsComponent implements OnInit{

  requests: BookingRequest[] = [];  

  services: { [key: number]: string } = {}; 
  users: { [key: number]: string } = {};  
  addresses: {[key: number]: string} ={} ;

  userName: string="" ;
  serviceName: string="";
  address: string="";

  constructor(private bookingRequestService:BookingRequestService, private cdRef: ChangeDetectorRef){}


  ngOnInit(): void {
    // Fetch user ID (Assuming you are storing the user ID in sessionStorage)
    const workerId = Number(sessionStorage.getItem('userId'));

    // Fetch the requests from the service
    if (workerId) {
      this.getAllBookingsByWorker(workerId);
    }
  }

  getAllBookingsByWorker(workerId: number): void {
    this.bookingRequestService.getAllBookingRequestsByWorkerId(workerId).subscribe(
      (response) => {
        this.requests = response;   
        this.requests.forEach(request => {
          this.fetchServiceName(request.workerId);
          this.fetchUserById(request.userId);
          this.fetchAddressByUserId(request.userId);
        });
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

  fetchUserById(userId: number): void {
    console.log(userId);
    this.bookingRequestService.getUserById(userId).subscribe(
      res => {
      this.userName = res.name;
      this.users[userId] = `${this.userName}`; 
      this.cdRef.detectChanges();

      }
      );
  }

  fetchAddressByUserId(userdId: number) {
    this.bookingRequestService.getUserById(userdId).subscribe(
      res => {
        this.address = res.address;
        this.addresses[userdId] = this.address;
      }
    );
  }

  acceptRequest(request: BookingRequest): void {
    const newStatus = 'ACCEPTED'; // Assuming this is an enum or string value
    this.bookingRequestService.updateServiceRequestStatus(request.id, newStatus).subscribe(
      (updatedRequest) => {
        request.serviceStatus = updatedRequest.serviceStatus; // Update the status locally
        console.log(`Request ${request.id} accepted successfully.`);
      },
      (error) => {
        console.error(`Error accepting request ${request.id}:`, error);
      }
    );
  }

  rejectRequest(request: BookingRequest): void {
    const newStatus = 'REJECTED'; // Assuming this is an enum or string value
    this.bookingRequestService.updateServiceRequestStatus(request.id, newStatus).subscribe(
      (updatedRequest) => {
        request.serviceStatus = updatedRequest.serviceStatus; // Update the status locally
        console.log(`Request ${request.id} rejected successfully.`);
      },
      (error) => {
        console.error(`Error rejecting request ${request.id}:`, error);
      }
    );
  }

  

}
