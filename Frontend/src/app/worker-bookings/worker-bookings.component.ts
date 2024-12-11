import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Booking } from '../model/Booking';
import { BookingRequestService } from '../service/bookingRequest/booking-request.service';
import { WorkerHeaderComponent } from '../worker-header/worker-header.component';

declare var bootstrap: any;

@Component({
  selector: 'app-worker-bookings',
  standalone: true,
  imports: [WorkerHeaderComponent,CommonModule, FormsModule],
  templateUrl: './worker-bookings.component.html',
  styleUrl: './worker-bookings.component.css'
})
export class WorkerBookingsComponent {
  @ViewChild('codeModal') codeModal!: ElementRef;

  bookings: Booking[] = [];
  userId: number = 0;

  services: { [key: number]: string } = {}; 
  workers: { [key: number]: string } = {};
  serviceName: string="";
  workerName: string="";
  workerPrice: number=0;
  paymentStatusMap: { [key: number]: string } = {}; 

  addresses: {[key: number]: string} ={} ;
  homeAddresses: {[key: number]: string} ={} ;
  address: string="";

  serviceId: number = 0;

  dateStore: {[key: number]: string} = {};
  bookedForDate: string ="";
  bookedForTime: string ="";
  timeStore: {[key: number]: string} ={};

  verificationCode: string = '';
  selectedBookingId: number | null = null;

  constructor(private bookingRequestService: BookingRequestService, private cdRef: ChangeDetectorRef,private router:Router) {}

  ngOnInit() {
   
    this.userId = Number( sessionStorage.getItem('userId'));
    // console.log(this.userId)
    this.getAllBookingsWorker();
   
  }
  
  getAllBookingsWorker() {
    this.bookingRequestService.getAllBookingsWorker(this.userId).subscribe(res => {
      this.bookings = res;
      this.bookings.forEach(booking => {
        this.fetchServiceName(booking.workerId);
        this.fetchUserById(booking.userId);
        this.fetchPaymentStatus(booking.serviceId);
        this.fetchAddressByUserId(booking.userId);
        this.fetchRequestedDateTime(booking.serviceId, booking.id); // Pass booking.id to store data correctly
        this.fetchHomeAddressesForBookings();
      });
    });
  }

  fetchHomeAddressesForBookings(): void {
    this.bookingRequestService.getAllBookingRequestsByWorkerId(this.userId).subscribe(
      (services) => {
        // Iterate through each service to fetch home addresses
        services.forEach((service) => {
          this.bookingRequestService.getServiceRequestById(service.id).subscribe(
            (serviceRequest) => {
              if (serviceRequest && serviceRequest.homeAddress) {
                // Map the home address to the booking
                this.homeAddresses[service.id] = serviceRequest.homeAddress;
              } else {
                this.homeAddresses[service.id] = 'Home address not available';
              }
              this.cdRef.detectChanges();
            },
            (error) => {
              console.error(`Error fetching home address for serviceId ${service.id}:`, error);
              this.addresses[service.id] = 'Error fetching home address'; // Fallback in case of error
              this.cdRef.detectChanges();
            }
          );
        });
      },
      (error) => {
        console.error('Error fetching services by userId:', error);
      }
    );
  }
  
  
  
  
  fetchRequestedDateTime(serviceId: number, bookingId: number) {
    this.bookingRequestService.getServiceRequestById(serviceId).subscribe(res => {
      const dateTimeString = res.dateTime;
  
      if (dateTimeString) {
        const dateObj = new Date(dateTimeString);
        const bookedForDate = dateObj.toISOString().split('T')[0]; // Extract date part
        const bookedForTime = dateObj.toTimeString().split(' ')[0]; // Extract time part
  
        // Store data in dateStore and timeStore for this specific booking
        this.dateStore[bookingId] = bookedForDate;
        this.timeStore[bookingId] = bookedForTime;
      } else {
        console.error('No dateTime received for bookingId', bookingId);
      }
    });
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

  openModal(bookingId: number): void {
    this.selectedBookingId = bookingId;
    if (this.codeModal) {
      const modalInstance = new bootstrap.Modal(this.codeModal.nativeElement);
      modalInstance.show();
    } else {
      console.error('Modal not initialized');
    }
  }
  

  // updateBookingStatus(id: number): void {
  //   // Update status in the backend

  //   this.bookingRequestService.updateBookingStatus(id, "COMPLETED").subscribe(
  //     (res) => {
  //       // Find the booking locally and update its status
  //       const booking = this.bookings.find((b) => b.id === id);
  //       if (booking) {
  //         booking.bookingStatus = "COMPLETED";
  //       }
  //       // Trigger change detection
  //       this.cdRef.detectChanges();
  //     },
  //     (error) => {
  //       console.error('Error updating booking status:', error);
  //     }
  //   );
  // }
  
  
  submitCode(): void {
    
    if (this.selectedBookingId === null) {
      alert('No booking selected.');
      return;
    }

    // Fetch booking by ID to get the saved code
    this.bookingRequestService.fetchBookingById(this.selectedBookingId).subscribe(
      (booking) => {
        const savedCode = booking.verifyCode; // Assuming `code` exists in the response
        console.log(savedCode+"gshdufhveghudfjhbhjdkm");
        
        if (this.verificationCode === savedCode) {
          // Code matches, proceed to update status
          this.bookingRequestService
            .updateBookingStatus(Number(this.selectedBookingId), 'COMPLETED')
            .subscribe(
              () => {
                const bookingToUpdate = this.bookings.find(
                  (b) => b.id === this.selectedBookingId
                );
                if (bookingToUpdate) {
                  bookingToUpdate.bookingStatus = 'COMPLETED';
                }
                alert('Booking status updated successfully!');
                const modalInstance =
                  bootstrap.Modal.getInstance(this.codeModal.nativeElement);
                modalInstance?.hide();
              },
              (error) => {
                console.error('Error updating booking status:', error);
                alert('Failed to update booking status.');
              }
            );
        } else {
          // Code does not match
          alert('Invalid verification code. Please try again.');
        }
      },
      (error) => {
        console.error('Error fetching booking:', error);
        alert('Error fetching booking details. Please try again later.');
      }
    );
  }


   
  redirectToServices(): void {
    // Logic to navigate to the services page
    this.router.navigate(['/worker-requests']);
  }
  

}
