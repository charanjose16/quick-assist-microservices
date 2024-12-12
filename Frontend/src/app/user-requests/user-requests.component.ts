import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { BookingRequest } from '../model/BookingRequest';
import { Payment } from '../model/Payment';
import { Booking } from '../model/Booking';
import { BookingRequestService } from '../service/bookingRequest/booking-request.service';
import { UserHeaderComponent } from '../user-header/user-header.component';
import { FormsModule } from '@angular/forms';
import { interval, Subscription } from 'rxjs';

declare var bootstrap: any;

@Component({
  selector: 'app-user-requests',
  standalone: true,
  imports: [UserHeaderComponent, NgFor, CommonModule, FormsModule],
  templateUrl: './user-requests.component.html',
  styleUrl: './user-requests.component.css'
})
export class UserRequestsComponent implements OnInit, OnDestroy {

  requests: BookingRequest[] = [];
  services: { [key: number]: string } = {};
  workers: { [key: number]: string } = {};
  paymentStatusMap: { [key: number]: string } = {};

  workerName: string = "";
  serviceName: string = "";
  workerPrice: number = 0;
  selectedDuration: number = 1;
  currentRequest: any = null;

  bookedForDate: string ="";
  bookedForTime: string ="";
  dateStore: { [key: number]: string}={};
  timeStore: { [key: number]: string}={};

  private pollingSubscription!: Subscription;
  userName:string='';
  phoneNumber: string='';
  expertise:string='';

  constructor(private bookingRequestService: BookingRequestService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    const userId = Number(sessionStorage.getItem('userId'));
    console.log("userrrrrr"+userId);
    
    if (userId) {
      console.log("dfghjkluytrtyhbvgyhjnbg");
      
      this.getAllBookingsByUserId(userId);

      // Start polling every 5 seconds
      this.pollingSubscription = interval(2000).subscribe(() => {
        this.pollForUpdates(userId);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe(); // Stop polling when component is destroyed
    }
  }

  getAllBookingsByUserId(id: number): void {
    console.log("heh habaiuiu");
    this.bookingRequestService.getAllBookingRequestsByUserId(id).subscribe(
      (response) => {
        this.requests = response;
        this.updateRequestDetails(this.requests);

      },
      (error) => {
        console.error('Error fetching booking requests:', error);
      }
    );
  }

  pollForUpdates(userId: number): void {
    this.bookingRequestService.getAllBookingRequestsByUserId(userId).subscribe(
      (response) => {
        response.forEach((newRequest) => {
          const existingRequestIndex = this.requests.findIndex((req) => req.id === newRequest.id);
  
          if (existingRequestIndex === -1) {
            // Add new request if not already present
            this.requests.push(newRequest);
            this.updateRequestDetails([newRequest]);
          } else {
            // Update existing request if necessary
            this.requests[existingRequestIndex] = { ...this.requests[existingRequestIndex], ...newRequest };
          }
        });
        this.cdRef.detectChanges(); // Ensure UI reflects changes
      },
      (error) => {
        console.error('Error polling for updates:', error);
      }
    );
  }
  
  

  updateRequestDetails(requestsToUpdate: BookingRequest[]): void {
    requestsToUpdate.forEach((request) => {
      this.fetchServiceName(request.workerId);
      this.fetchWorkerById(request.workerId);
      this.fetchPaymentStatus(request.id);
      this.fetchRequestedDateTime(request.id);
    });
    this.cdRef.detectChanges();
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

  fetchWorkerById(workerId: number): void {
    this.bookingRequestService.getUserById(workerId).subscribe((res) => {
      this.workers[workerId] = res.name;
      this.workerPrice = res.price;
      this.cdRef.detectChanges();
    });
  }

  fetchPaymentStatus(requestId: number): void {
    this.bookingRequestService.getPaymentStatusByRequestId(requestId).subscribe(
      (paymentStatusResponse) => {
        this.paymentStatusMap[requestId] = paymentStatusResponse.paymentStatus;
        this.cdRef.detectChanges();
      },
      (error) => {
        console.error('Error fetching payment status:', error);
      }
    );
  }
  cancelRequest(request: any): void {
    this.bookingRequestService.updateServiceRequestStatus(request.id, 'CANCELLED').subscribe(
      () => {
        // Update the request object locally to reflect the change
        request.serviceStatus = 'CANCELLED';
        this.cdRef.detectChanges(); 
        this.pollForUpdates(Number(sessionStorage.getItem('userId')));// Trigger Angular to update the view
      },
      (error) => {
        console.error('Error cancelling request:', error);
      }
    );
  }
  

  payNow(request: any): void {
    this.currentRequest = request;
    this.openDurationModal();
  }

  openDurationModal(): void {
    const durationModal = document.getElementById('durationModal');
    const modalInstance = new bootstrap.Modal(durationModal!);
    modalInstance.show();
  }

  openPaymentModal(): void {
    const paymentModal = document.getElementById('paymentModal');
    const modalInstance = new bootstrap.Modal(paymentModal!);
    modalInstance.show();
  }

  close(): void {
    const durationModal = document.getElementById('durationModal');
    if (durationModal) {
      const durationModalInstance = bootstrap.Modal.getInstance(durationModal);
      durationModalInstance?.hide();
    }
  }

  confirmBooking(request: any): void {
    const userId = Number(sessionStorage.getItem('userId'));
    const totalPrice = this.selectedDuration * this.workerPrice;

    const paymentObject: Payment = {
      id: 0,
      serviceId: request.id,
      amount: totalPrice,
      paymentStatus: 'COMPLETED',
      paymentMethod: 'UPI',
    };

    this.bookingRequestService.createPayment(paymentObject).subscribe((paymentResponse) => {
      const paymentId = paymentResponse.id;
      const verifyCodes = (Math.floor(100000 + Math.random() * 900000)).toString();
      this.createBooking(userId, request.workerId, request.id, paymentId,verifyCodes);
      this.paymentStatusMap[request.id] = 'COMPLETED';
      this.cdRef.detectChanges();
      this.notifyWorker(
        request.workerId,
        `Booking confirmed for a duration of ${this.selectedDuration} hours.`
      );
      const durationModal = document.getElementById('durationModal');
      if (durationModal) {
        const durationModalInstance = bootstrap.Modal.getInstance(durationModal);
        durationModalInstance?.hide();
      }
      this.openPaymentModal();
    });
  }

  createBooking(userId: number, workerId: number, serviceId: number, paymentId: number,verifyCode:string): void {
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toTimeString().split(' ')[0];
    
    
    this.bookingRequestService.getUserById(userId).subscribe(res=>{
      this.userName=res.name;
      this.phoneNumber=res.phoneNumber;


      this.bookingRequestService.getUserById(workerId).subscribe(res=>{
        this.expertise=res.expertise

      // ----------------------------------send SMs
      this.sendSms(this.userName,this.phoneNumber,this.expertise,verifyCode)
      console.log(this.phoneNumber);
      
    })

    
    })
    
    

    


    const bookingObject: Booking = {
      id: 0,
      userId: userId,
      workerId: workerId,
      bookingStatus: 'ONGOING',
      review: '',
      date: formattedDate,
      time: formattedTime,
      serviceId: serviceId,
      paymentId: paymentId,
      verifyCode:verifyCode
    };

    





    this.bookingRequestService.createBooking(bookingObject).subscribe(
      (bookingResponse) => {
        console.log('Booking created successfully:', bookingResponse);
      },
      (error) => {
        console.error('Error creating booking:', error);
      }
    );
  }




  

  sendSms(userName:string,phoneNumber:string,expertise:string,verifyCode:string) {
    const message = `Dear ${this.userName}, 


    Your booking for ${expertise} has been successfully confirmed!  
    
    Please use the following verification code during the service: ${verifyCode}.  
    
    Thank you for choosing Quick Assist. If you have any questions, feel free to reach out to us.
    
    Best regards,  
    Quick Assist`;

if (this.phoneNumber?.trim()) {
  const formattedPhoneNumber = '91' + this.phoneNumber.trim(); // Handle country code
  this.bookingRequestService.sendSms(formattedPhoneNumber, message).subscribe();
} else {
  alert('Invalid or missing phone number.');
}
  }


  notifyWorker(workerId: number, message: string): void {
    console.log(`Notifying worker ${workerId}: ${message}`);
  }
}
