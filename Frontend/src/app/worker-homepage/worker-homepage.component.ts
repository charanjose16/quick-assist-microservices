import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Booking } from '../model/Booking';
import { BookingRequestService } from '../service/bookingRequest/booking-request.service';
import { WorkerHeaderComponent } from '../worker-header/worker-header.component';

@Component({
  selector: 'app-worker-homepage',
  standalone: true,
  imports: [WorkerHeaderComponent, FormsModule, CommonModule],
  templateUrl: './worker-homepage.component.html',
  styleUrl: './worker-homepage.component.css'
})
export class WorkerHomepageComponent implements OnInit {

  bookings: Booking[] = [];
  workers: { [key: number]: string } = {};

  status: {[key: number]: string} ={};
  userIds: {[key: number]: number}={};
  
  dateStore: {[key: number]: string} = {};
  bookedForDate: string ="";
  bookedForTime: string ="";
  timeStore: {[key: number]: string} ={};

  workerName: string='';
  serviceId: number = 0;
  
  bookingId: number=0;

  userId: number = 0;

  constructor(private bookingRequest: BookingRequestService, private cdRef: ChangeDetectorRef) {}
  ngOnInit(): void {
    const workerId = sessionStorage.getItem('userId');
    this.getAllBookingsWorker(Number(workerId));
    this.getBookingsService(Number(workerId));
    this.getAllWorkersBooking(Number(workerId));

     
      const reloadCount = Number(sessionStorage.getItem('reloadCount')) || 0;
    
      if (reloadCount < 2) { // Reload only up to 2 times
        sessionStorage.setItem('reloadCount', (reloadCount + 1).toString());
        window.location.reload();
      } else {
        console.log('Reloads limit reached');
      }
    

  }

  completedBookings: number = 0;
  rejectedBookings: number = 0;
  ongoingBookings: number = 0;
  accepetedBookings: number = 0;
  requestedBookings: number = 0;
  pendingPaymentBookings: number = 0;

  getAllBookingsWorker(workerId: number) {
    this.bookingRequest.getAllBookingsWorker(workerId).subscribe({

      next: (res) => {
        
        this.completedBookings = 0;
        this.ongoingBookings = 0;

        res.forEach((booking) => {
          switch (booking.bookingStatus) {
            case 'COMPLETED':
              this.completedBookings++;
              break;
            case 'ONGOING':
              this.ongoingBookings++;
              break;
            default:
              console.warn(`Unknown booking status: ${booking.bookingStatus}`);
          }
        });
        
      },
      error: (err) => {
        console.error('Error fetching bookings:', err);
      },
    });
  }

  fetchUserById(userId: number): void {
    this.bookingRequest.getUserById(userId).subscribe(
      res => {
        this.workerName = res.name;
        this.workers[userId] = `${this.workerName}`; 
        console.log(this.workerName);
        
        this.cdRef.detectChanges();
      }
    );
  }

  getAllWorkersBooking(workerId: number) {
    this.bookingRequest.getAllBookingsWorker(workerId).subscribe(res => {
      this.bookings = res;
      console.log(JSON.stringify(res));
  
      this.bookings.forEach(request => {
        this.bookingId = request.id;
        this.status[this.bookingId] = request.bookingStatus;
  
        // Handle serviceId mapping directly
        this.fetchRequestedDateTime(request.serviceId, request.id);
        this.fetchUserById(request.userId);
      });
    });
  }
  
  fetchRequestedDateTime(serviceId: number, bookingId: number) {
    this.bookingRequest.getServiceRequestById(serviceId).subscribe(res => {
      const dateTimeString = res.dateTime;
  
      if (dateTimeString) {
        const dateObj = new Date(dateTimeString);
  
        const dateStr = dateObj.toISOString().split('T')[0];
        const timeStr = dateObj.toTimeString().split(' ')[0];
  
        // Map each booking's unique id to its date/time values to ensure uniqueness
        this.dateStore[bookingId] = dateStr;
        this.timeStore[bookingId] = timeStr;
  
        console.log(
          `Setting dateStore[${bookingId}] = ${dateStr}`,
          `timeStore[${bookingId}] = ${timeStr}`
        );
      } else {
        console.error('No dateTime received');
      }
    });
  }
  

  getBookingsService(workerId: number) {
    this.bookingRequest.getAllBookingRequestsByWorkerId(workerId).subscribe({
      next: (res) => {
        this.accepetedBookings=0;
        this.requestedBookings = 0;
        this.rejectedBookings=0;
        this.pendingPaymentBookings=0;

        res.forEach((bookings) => {
          switch(bookings.serviceStatus) {
            case 'REQUESTED':
              this.requestedBookings++;
              break;
            case 'REJECTED':
              this.rejectedBookings++;
              break;
            case 'ACCEPTED':
              this.accepetedBookings++;
              break;
            case 'PENDINGPAYMENT':
              this.pendingPaymentBookings++;
              break;
            default:
               console.warn(`Unknown Booking status: ${bookings.serviceStatus}`);
               

          }
        });
      },
      error: (err) => {
        console.error('Error in fetching from serviceRequests', err);
        
      }
    });
  }



  


}
