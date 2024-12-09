import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Booking } from '../model/Booking';
import { BookingRequestService } from '../service/bookingRequest/booking-request.service';
import { UserHeaderComponent } from '../user-header/user-header.component';

@Component({
  selector: 'app-user-bookings',
  standalone: true,
  imports: [UserHeaderComponent, CommonModule,RouterModule],
  templateUrl: './user-bookings.component.html',
  styleUrl: './user-bookings.component.css'
})
export class UserBookingsComponent implements OnInit {

  bookings: Booking[] = [];
  userId: number = 0;

  services: { [key: number]: string } = {}; 
  workers: { [key: number]: string } = {};
  serviceName: string="";
  workerName: string="";
  workerPrice: number=0;
  paymentStatusMap: { [key: number]: string } = {}; 


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
          this.fetchServiceName(request.workerId);
          this.fetchWorkerById(request.workerId);
          this.fetchPaymentStatus(request.id); 
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
  
  
}
