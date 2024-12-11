import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Booking } from '../model/Booking';
import { BookingRequestService } from '../service/bookingRequest/booking-request.service';
import { UserHeaderComponent } from '../user-header/user-header.component';

declare var bootstrap: any;

@Component({
  selector: 'app-user-bookings',
  standalone: true,
  imports: [UserHeaderComponent, CommonModule,RouterModule,FormsModule],
  templateUrl: './user-bookings.component.html',
  styleUrl: './user-bookings.component.css'
})
export class UserBookingsComponent implements OnInit {

  bookings: Booking[] = [];
  userId: number = 0;
  bookingId: number = 0;

  currentBookingId: number | null = null;
  reviewText: string = '';
  submittedReviews: Set<number> = new Set();
  reviewMap: { [bookingId: number]: string | null } = {};

  services: { [key: number]: string } = {}; 
  workers: { [key: number]: string } = {};
  serviceName: string="";
  workerName: string="";
  workerPrice: number=0;
  paymentStatusMap: { [key: number]: string } = {}; 


  dateStore: {[key: number]: string} = {};
  bookedForDate: string ="";
  bookedForTime: string ="";
  timeStore: {[key: number]: string} ={};


  // to redirect worker details
  workerId1: string | undefined;
  workerName1: string | undefined;
  workerPhoneNumber1: string | undefined;
  workerEmail1: string | undefined;
  workerExpertise1: string | undefined;
  workerCity1: string | undefined;
  workerSpecialities1: string[] | undefined;
  workerPrice1:string | undefined;
  currentWorkerId1:string | undefined;

  constructor(private bookingRequestService: BookingRequestService, private cdRef: ChangeDetectorRef,private router:Router) {}

  ngOnInit() {
   
    this.userId = Number( sessionStorage.getItem('userId'));
    // console.log(this.userId)
    this.getAllUserBookings();
  }
  

  getAllUserBookings() {
    
    this.bookingRequestService.getAllBookingsUser(this.userId).subscribe(res => 
      {
        this.bookings = res;
        this.bookings.forEach(request => {
          this.bookingId = request.id;
          this.fetchServiceName(request.workerId);
          this.fetchWorkerById(request.workerId);
          this.fetchPaymentStatus(request.id);
          
          this.fetchRequestedDateTime(request.serviceId);  // Initialize reviews as null

        // Fetch existing review if available (example: API call)
        this.fetchReviewForBooking(request.id);
        });
      }
      );
  }

  fetchReviewForBooking(bookingId: number) {
    this.bookingRequestService.getReviewByBookingId(bookingId).subscribe({
      next: (response: string) => {
        console.log('Server review response:', response);
        // Ensure only non-empty strings map to review state
        this.reviewMap[bookingId] = response && response.trim() ? response.trim() : '' ;
      },
      error: (error) => {
        console.error('Error during review fetch', error);
        this.reviewMap[bookingId] = null; 
      }
    });
  }
  
  
  
  
  

  
  fetchRequestedDateTime(serviceId: number) {
    this.bookingRequestService.getServiceRequestById(serviceId).subscribe(res => {
      const dateTimeString = res.dateTime;
  
      if (dateTimeString) {
        console.log(this.bookingId);
        
        const dateObj = new Date(dateTimeString);
        this.bookedForDate = dateObj.toISOString().split('T')[0];
        this.dateStore[this.bookingId] = this.bookedForDate // Extract date part
        this.bookedForTime = dateObj.toTimeString().split(' ')[0]; // Extract time part
        this.timeStore[this.bookingId] = this.bookedForTime;
      
        console.log(this.dateStore[this.bookingId] + " chdecekcvyeughijok");
          
      } else {
        console.error('No dateTime received');
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

  fetchWorkerById(workerId: number): void {
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
        // Assuming the response contains a field "status" indicating the payment status
    
        this.paymentStatusMap[requestId] = paymentStatusResponse.paymentStatus;
        this.cdRef.detectChanges();
        // console.log("yaha pr aa rha hai status:" + paymentStatusResponse.paymentStatus);
        // console.log("this is from map se "+this.paymentStatusMap[requestId])
      },
      (error) => {
        console.error('Error fetching payment status:', error);
      }
    );
  }


  getBookingWorkerDetails(workerId: number) {
    this.bookingRequestService.getUserById(workerId).subscribe(
      res => {
        // Assign fetched worker details
        this.workerId1 = res.id + "";
        this.workerName1 = res.name;
        this.workerEmail1 = res.email;
        this.workerPhoneNumber1 = res.phoneNumber;
        this.workerCity1 = res.city;
        this.workerExpertise1 = res.expertise;
        this.workerPrice1 = res.price + "";
        this.workerSpecialities1 = res.specialties;
  
        // Navigate to the worker-details component with queryParams
        this.router.navigate(['/worker-details'], {
          queryParams: {
            id: this.workerId1,
            name: this.workerName1,
            phoneNumber: this.workerPhoneNumber1,
            email: this.workerEmail1,
            expertise: this.workerExpertise1,
            city: this.workerCity1,
            specialities: this.workerSpecialities1?.join(','), // Convert array to comma-separated string
            price: this.workerPrice1
          }
        });
      },
      error => {
        console.error('Error fetching worker details:', error);
      }
    );
  }





  showWorkerDetails(workerId: number) {
    this.bookingRequestService.getUserById(workerId).subscribe(
      res => {
        // Populate worker details for the modal
        this.workerId1 = res.id + "";
        this.workerName1 = res.name;
        this.workerEmail1 = res.email;
        this.workerPhoneNumber1 = res.phoneNumber;
        this.workerCity1 = res.city;
        this.workerExpertise1 = res.expertise;
        this.workerPrice1 = res.price + "";
        this.workerSpecialities1 = res.specialties;
      },
      error => {
        console.error('Error fetching worker details:', error);
      }
    );
  }


  openReviewModal(bookingId: number): void {
    this.currentBookingId = bookingId;
    this.reviewText = this.reviewMap[bookingId] || ''; // Pre-fill existing review if available

  }

  submitReview(): void {
    if (this.currentBookingId !== null && this.reviewText.trim()) {
      const reviewPayload = {
        bookingId: this.currentBookingId,
        review: this.reviewText
      };

      this.bookingRequestService.submitReview(reviewPayload).subscribe(
        (response) => {
          console.log('Review submitted successfully:', response);
          alert('Thank you for your feedback!');
          if (this.currentBookingId !== null) {
            this.reviewMap[this.currentBookingId] = this.reviewText; // Update the review map
          }
          this.currentBookingId = null;

          // Close the modal
          const modalElement = document.getElementById('reviewModal');
          if (modalElement) {
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            modalInstance?.hide();
          }
        },
        (error) => {
          console.error('Error submitting review:', error);
        }
      );
    } else {
      alert('Please provide a valid review!');
    }
  }

  isReviewSubmitted(bookingId: number): boolean {
    return !!this.reviewMap[bookingId]; // Return true if the review exists
  }
  
  
}
