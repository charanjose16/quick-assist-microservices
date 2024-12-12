import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { BookingRequest } from '../model/BookingRequest';
import { BookingRequestService } from '../service/bookingRequest/booking-request.service';
import { WorkerHeaderComponent } from '../worker-header/worker-header.component';
import { interval, Subscription } from 'rxjs';
import { User } from '../model/User';

@Component({
  selector: 'app-worker-requests',
  standalone: true,
  imports: [WorkerHeaderComponent, CommonModule],
  templateUrl: './worker-requests.component.html',
  styleUrl: './worker-requests.component.css'
})
export class WorkerRequestsComponent implements OnInit, OnDestroy {

  requests: BookingRequest[] = [];
  services: { [key: number]: string } = {};
  users: { [key: number]: string } = {};
  addresses: { [key: number]: string } = {};
  homeAddresses: { [key: number]: string } = {};
  custName:string='';
  custPhone:string='';
  workExp:string='';

  serviceId: string =';'


  
  bookedForDate: string ="";
  bookedForTime: string ="";
  dateStore: { [key: number] : string} = {};
  timeStore: { [key: number] : string} = {};

  private pollingSubscription!: Subscription;

  constructor(private bookingRequestService: BookingRequestService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    const workerId = Number(sessionStorage.getItem('userId'));

    if (workerId) {
      this.getAllBookingsByWorker(workerId);

      // Start polling every 5 seconds
      this.pollingSubscription = interval(5000).subscribe(() => {
        this.pollForUpdates(workerId);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe(); // Stop polling when component is destroyed
    }
  }

  getAllBookingsByWorker(workerId: number): void {
    this.bookingRequestService.getAllBookingRequestsByWorkerId(workerId).subscribe(
      (response) => {
        this.requests = response;
        this.updateRequestDetails(this.requests);

      }
    );
  }

  
  fetchRequestedDateTime(id: number) {
    this.bookingRequestService.getServiceRequestById(id).subscribe(res => {
      const dateTimeString = res.dateTime;
  
      if (dateTimeString) {
        const dateObj = new Date(dateTimeString);
        this.bookedForDate = dateObj.toISOString().split('T')[0]; // Extract date part
        this.bookedForTime = dateObj.toTimeString().split(' ')[0]; // Extract time part
        this.dateStore[id] = this.bookedForDate;
        this.timeStore[id] = this.bookedForTime;
        console.log(this.bookedForDate +" "+this.bookedForTime);
        
      } else {
        console.error('No dateTime received');
      }
    });
  }

  pollForUpdates(workerId: number): void {
    this.bookingRequestService.getAllBookingRequestsByWorkerId(workerId).subscribe(
      (response) => {
        const newRequests = response.filter(
          (newRequest) => !this.requests.some((existingRequest) => existingRequest.id === newRequest.id)
        );

        if (newRequests.length > 0) {
          this.requests.push(...newRequests); // Add new requests
          this.updateRequestDetails(newRequests);
        }
      }
    );
  }

  updateRequestDetails(requestsToUpdate: BookingRequest[]): void {
    requestsToUpdate.forEach((request) => {
      const serviceId = request.id; // Use the unique service request ID
      const userId = request.userId; // Use the userId to map addresses
      this.fetchServiceName(request.workerId);
      this.fetchUserById(userId);
      this.fetchAddressByUserId(userId);
      this.fetchRequestedDateTime(serviceId);
      this.fetchHomeAddress(serviceId, userId); // Ensure correct serviceId and userId are passed
    });
    this.cdRef.detectChanges();
  }
  

  fetchHomeAddress(serviceId: number, userId: number): void {
    this.bookingRequestService.getServiceRequestById(serviceId).subscribe(
      (res) => {
        if (res && res.homeAddress) {
          // Store home address for the specific userId
          this.homeAddresses[serviceId] = res.homeAddress;
        } else {
          // Fallback if home address is not available
          this.homeAddresses[serviceId] = 'Home address not available';
        }
        this.cdRef.detectChanges(); // Trigger change detection to update UI
      },
      (error) => {
        console.error(`Error fetching home address for serviceId ${serviceId}:`, error);
        this.homeAddresses[userId] = 'Error fetching home address'; // Fallback in case of error
        this.cdRef.detectChanges();
      }
    );
  }
  

  fetchServiceName(serviceId: number): void {
    this.bookingRequestService.getUserById(serviceId).subscribe((res) => {
      if (res && res.expertise) {
        this.services[serviceId] = res.expertise;
      } else {
        this.services[serviceId] = 'Service not available';
      }
      this.cdRef.detectChanges();
    });
  }

  fetchUserById(userId: number): void {
    this.bookingRequestService.getUserById(userId).subscribe((res) => {
      this.users[userId] = res.name;
      this.cdRef.detectChanges();
    });
  }

  fetchAddressByUserId(userId: number): void {
    this.bookingRequestService.getUserById(userId).subscribe((res) => {
      this.addresses[userId] = res.address;
      
      this.cdRef.detectChanges();
    });
  }

  acceptRequest(request: BookingRequest): void {
    const newStatus = 'ACCEPTED';
  
    this.bookingRequestService.updateServiceRequestStatus(request.id, newStatus).subscribe(
      (updatedRequest) => {
        request.serviceStatus = updatedRequest.serviceStatus;
  
        this.bookingRequestService.getUserById(updatedRequest.userId).subscribe((user) => {
          this.custName = user.name;
          this.custPhone = user.phoneNumber;
  
          this.bookingRequestService.getUserById(updatedRequest.workerId).subscribe((worker) => {
            this.workExp = worker.expertise;
  
            // Send SMS after fetching both user and worker details
            const message = `Dear ${this.custName}, 
  
  Your service request for ${this.workExp} has been accepted by the worker. Please proceed with the payment to confirm your booking. 
  
  Thank you,  
  Quick Assist`;
  
            this.sendSms(message, this.custPhone);
          });
        });
      },
      (error) => {
        console.error(`Error accepting request ${request.id}:`, error);
      }
    );
  }
  

  rejectRequest(request: BookingRequest): void {
    const newStatus = 'REJECTED';
  
    this.bookingRequestService.updateServiceRequestStatus(request.id, newStatus).subscribe(
      (updatedRequest) => {
        request.serviceStatus = updatedRequest.serviceStatus;
  
        this.bookingRequestService.getUserById(updatedRequest.userId).subscribe((user) => {
          this.custName = user.name;
          this.custPhone = user.phoneNumber;
  
          this.bookingRequestService.getUserById(updatedRequest.workerId).subscribe((worker) => {
            this.workExp = worker.expertise;
  
            // Send SMS after fetching both user and worker details
            const message = `Dear ${this.custName}, 
  
  We regret to inform you that your service request for ${this.workExp} has been declined by the worker. Please feel free to explore other workers available on our platform. 
  
  Thank you for understanding,  
  Quick Assist`;
  
            this.sendSms(message, this.custPhone);
          });
        });
      },
      (error) => {
        console.error(`Error rejecting request ${request.id}:`, error);
      }
    );
  }
  



  sendSms(message:string,phone:string) {

if (this.custPhone?.trim()) {
  const formattedPhoneNumber = '91' + phone.trim(); // Handle country code
  this.bookingRequestService.sendSms(formattedPhoneNumber, message).subscribe({
  });
} else {
  alert('Invalid or missing phone number.');
}
  }


}
