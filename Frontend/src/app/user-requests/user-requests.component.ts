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

  private pollingSubscription!: Subscription;

  constructor(private bookingRequestService: BookingRequestService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    const userId = Number(sessionStorage.getItem('userId'));
    console.log("userrrrrr"+userId);
    
    if (userId) {
      console.log("dfghjkluytrtyhbvgyhjnbg");
      
      this.getAllBookingsByUserId(userId);

      // Start polling every 5 seconds
      this.pollingSubscription = interval(5000).subscribe(() => {
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
        const newRequests = response.filter(
          (newRequest) => !this.requests.some((existingRequest) => existingRequest.id === newRequest.id)
        );
        if (newRequests.length > 0) {
          this.requests.push(...newRequests); // Add new requests
          this.updateRequestDetails(newRequests);
          this.cdRef.detectChanges(); // Ensure the UI reflects changes
        }
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
    });
    this.cdRef.detectChanges();
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
        request.status = 'CANCELLED';
        this.pollForUpdates(Number(sessionStorage.getItem('userId')));
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
      this.createBooking(userId, request.workerId, request.id, paymentId);
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

  createBooking(userId: number, workerId: number, serviceId: number, paymentId: number): void {
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toTimeString().split(' ')[0];

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

  notifyWorker(workerId: number, message: string): void {
    console.log(`Notifying worker ${workerId}: ${message}`);
  }
}
