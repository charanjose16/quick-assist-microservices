import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { BookingRequest } from '../model/BookingRequest';
import { Payment } from '../model/Payment';
import { Booking } from '../model/Booking';  // Import the Booking interface
import { BookingRequestService } from '../service/bookingRequest/booking-request.service';
import { UserHeaderComponent } from '../user-header/user-header.component';

declare var bootstrap: any;

@Component({
  selector: 'app-user-requests',
  standalone: true,
  imports: [UserHeaderComponent, NgFor, CommonModule],
  templateUrl: './user-requests.component.html',
  styleUrl: './user-requests.component.css'
})
export class UserRequestsComponent {

  requests: BookingRequest[] = [];  
  services: { [key: number]: string } = {}; 
  workers: { [key: number]: string } = {};  
  paymentStatusMap: { [key: number]: string } = {}; 

  workerName: string = "";
  serviceName: string = "";
  
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
        this.requests.forEach(request => {
          this.fetchServiceName(request.workerId);
          this.fetchWorkerById(request.workerId);
          this.fetchPaymentStatus(request.id); 
        });
      },
      (error) => {
        console.error('Error fetching booking requests:', error);
      }
    );
  }



  fetchServiceName(serviceId: number): void {
    this.bookingRequestService.getUserById(serviceId).subscribe(res => {
      if (res && res.expertise) {
        this.serviceName = res.expertise;   
        this.services[serviceId] = this.serviceName;   
      } else {
        this.services[serviceId] = 'Service not available';  
      }
      this.cdRef.detectChanges();
    });
  }

  fetchWorkerById(workerId: number): void {
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
    request.status = 'Cancelled';
  }

  openPaymentModal(): void {
    const paymentModal = document.getElementById('paymentModal');
    const modalInstance = new bootstrap.Modal(paymentModal!);
    modalInstance.show();
  }

  payNow(request: any): void {
    const userId = Number(sessionStorage.getItem('userId'));
    
    const paymentObject: Payment = {
      id: 0, // Use an appropriate ID mechanism
      serviceId:request.id,
      price: 100, // Set the price accordingly
      paymentStatus: 'COMPLETED',
      paymentMethod: 'UPI'
    };

    this.bookingRequestService.createPayment(paymentObject).subscribe(paymentResponse => {
      console.log(paymentResponse);
      const paymentId = paymentResponse.id;

      // Now that we have the payment ID, create a booking
      this.createBooking(userId, request.workerId, request.id, paymentId);
      this.paymentStatusMap[request.id] = 'COMPLETED'; // Mark as completed
    this.cdRef.detectChanges(); 
      console.log(JSON.stringify(request, null, 2));
      
    });

    // Simulate payment success
    setTimeout(() => {
      this.openPaymentModal();
    }, 500); 
  }


  fetchPaymentStatus(requestId: number): void {
    this.bookingRequestService.getPaymentStatusByRequestId(requestId).subscribe(
      (paymentStatusResponse) => {
        // Assuming the response contains a field "status" indicating the payment status
        this.paymentStatusMap[requestId] = paymentStatusResponse.paymentStatus;
        this.cdRef.detectChanges();
      },
      (error) => {
        console.error('Error fetching payment status:', error);
      }
    );
  }

  createBooking(userId: number, workerId: number, serviceId: number, paymentId: number): void {
    const bookingObject: Booking = {
      id: Number(),  // Use an appropriate ID generation mechanism
      userId: userId,
      workerId: workerId,
      bookingStatus: 'ONGOING', // Or another relevant status
      review: '',  // You can later add a review
      serviceId: serviceId,
      paymentId: paymentId
    };

    this.bookingRequestService.createBooking(bookingObject).subscribe(
      bookingResponse => {
        console.log('Booking created successfully:', bookingResponse);
        // You can update UI or redirect the user after booking is created
      },
      error => {
        console.error('Error creating booking:', error);
      }
    );
  }
}
