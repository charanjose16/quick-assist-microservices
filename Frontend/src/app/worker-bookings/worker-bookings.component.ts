import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from '../model/Booking';
import { BookingRequestService } from '../service/bookingRequest/booking-request.service';
import { WorkerHeaderComponent } from '../worker-header/worker-header.component';

@Component({
  selector: 'app-worker-bookings',
  standalone: true,
  imports: [WorkerHeaderComponent,CommonModule],
  templateUrl: './worker-bookings.component.html',
  styleUrl: './worker-bookings.component.css'
})
export class WorkerBookingsComponent {

  bookings: Booking[] = [];
  userId: number = 0;

  services: { [key: number]: string } = {}; 
  workers: { [key: number]: string } = {};
  serviceName: string="";
  workerName: string="";
  workerPrice: number=0;
  paymentStatusMap: { [key: number]: string } = {}; 

  addresses: {[key: number]: string} ={} ;
  address: string="";


  constructor(private bookingRequestService: BookingRequestService, private cdRef: ChangeDetectorRef,private router:Router) {}

  ngOnInit() {
   
    this.userId = Number( sessionStorage.getItem('userId'));
    // console.log(this.userId)
    this.getAllBookingsWorker();
  }
  

  getAllBookingsWorker() {
    
    this.bookingRequestService.getAllBookingsWorker(this.userId).subscribe(res => 
      {
        this.bookings = res;
        this.bookings.forEach(request => {
          this.fetchServiceName(request.workerId);
          this.fetchUserById(request.userId);
          this.fetchPaymentStatus(request.serviceId); 
          this.fetchAddressByUserId(request.userId);
          
        });
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

  fetchUserById(workerId: number): void {
    this.bookingRequestService.getUserById(workerId).subscribe(
      res => {
        this.workerName = res.name;
        this.workers[workerId] = `${this.workerName}`; 
        this.workerPrice = res.price;
        this.cdRef.detectChanges();
      }
    );
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
  
  fetchAddressByUserId(userdId: number) {
    this.bookingRequestService.getUserById(userdId).subscribe(
      res => {
        this.address = res.address;
        this.addresses[userdId] = this.address;
      }
    );
  }

  updateBookingStatus(id: number): void {
    // Update status in the backend
    this.bookingRequestService.updateBookingStatus(id, "COMPLETED").subscribe(
      (res) => {
        // Find the booking locally and update its status
        const booking = this.bookings.find((b) => b.id === id);
        if (booking) {
          booking.bookingStatus = "COMPLETED";
        }
        // Trigger change detection
        this.cdRef.detectChanges();
      },
      (error) => {
        console.error('Error updating booking status:', error);
      }
    );
  }

  redirectToServices(): void {
    // Logic to navigate to the services page
    this.router.navigate(['/worker-requests']);
  }
  

}
