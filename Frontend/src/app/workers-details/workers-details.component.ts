import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookingRequest } from '../model/BookingRequest';
import { BookingRequestService } from '../service/bookingRequest/booking-request.service';
import { UserHeaderComponent } from '../user-header/user-header.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-workers-details',
  standalone: true,
  imports: [UserHeaderComponent, CommonModule, RouterModule, FormsModule,ReactiveFormsModule],
  templateUrl: './workers-details.component.html',
  styleUrl: './workers-details.component.css',
})
export class WorkersDetailsComponent implements OnInit {
  workerId: string = '';
  workerName: string = '';
  workerPhoneNumber: string = '';
  workerEmail: string = '';
  workerExpertise: string = '';
  workerCity: string = '';
  workerSpecialities: string[] = [];
  workerPrice: string = '';
  dateTime: string = '';
  wId: number = 0;
  reviews: string[] = [];
  bookingForm: FormGroup;  // Declare form group
  minDateTime: string = '';
  

  constructor(
    private route: ActivatedRoute,
    private bookingRequestService: BookingRequestService,
    private router: Router,
    private fb: FormBuilder  // Inject FormBuilder
  ) {
    // Initialize form group
    this.bookingForm = this.fb.group({
      dateTime: ['', Validators.required],
      homeAddress: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.workerId = this.route.snapshot.queryParamMap.get('id') ?? '';
    this.workerName = this.route.snapshot.queryParamMap.get('name') ?? '';
    this.workerPhoneNumber =
      this.route.snapshot.queryParamMap.get('phoneNumber') ?? '';
    this.workerEmail = this.route.snapshot.queryParamMap.get('email') ?? '';
    this.workerExpertise = this.route.snapshot.queryParamMap.get('expertise') ?? '';
    this.workerCity = this.route.snapshot.queryParamMap.get('city') ?? '';
    this.workerSpecialities =
      this.route.snapshot.queryParamMap.getAll('specialities') ?? [];
    this.workerPrice = this.route.snapshot.queryParamMap.get('price') ?? '';
    const userId = Number(sessionStorage.getItem('userId')); // Replace with the actual worker ID

    this.fetchReviews(Number(this.workerId));



    this.bookingForm = this.fb.group({
      dateTime: ['', Validators.required]
    });

    // Set the minimum date and time to the current moment
    const now = new Date();
    this.minDateTime = now.toISOString().slice(0, 16); 
  }

  getWorkerId(userId: number) {
    this.bookingRequestService.getBookingByUserId(userId).subscribe((res) => {
      this.wId = res.workerId;
    });
  }

  createBookingRequest() {
    const userId = Number(sessionStorage.getItem('userId'));

    console.log('Form Data:', this.bookingForm.value); // Log form data

    const bookingRequestObject: BookingRequest = {
      id: 0,
      userId: userId,
      workerId: Number(this.workerId),
      paymentId: 0,
      serviceStatus: 'REQUESTED',
      dateTime: this.bookingForm.value.dateTime,
      homeAddress: this.bookingForm.value.homeAddress, 
    // Correctly bind form data
    };

// --------------------------------------send sms

     this.sendSms();



    console.log('Booking Request Object:', JSON.stringify(bookingRequestObject, null, 2));

    this.bookingRequestService.createBookingRequest(bookingRequestObject).subscribe(
      (response) => {
        console.log('Booking request created successfully:', response);
        this.router.navigate(['/user-requests']);
      },
      (error) => {
        console.error('Error creating booking request:', error);
      }
    );
  }

  proceedToBooking(form: any): void {
    if (form.valid) {
      console.log('Booking request sent with:', {
        dateTime: this.dateTime,
        price: this.workerPrice,
      });
      this.createBookingRequest();
    } else {
      console.log('Form is not valid');
    }
  }

  onDateTimeChange(value: string) {
    console.log('Value on change:', value);
    this.dateTime = value;
  }

  sendSms() {
    const message = `Dear ${this.workerName}, 

You have received a new service request for ${this.workerExpertise}. Please check your profile to review the details and take appropriate action. 

Thank you,
Quick Assist`;

    if (this.workerPhoneNumber?.trim()) {
      const formattedPhoneNumber = '91' + this.workerPhoneNumber.trim(); // Handle country code
      this.bookingRequestService.sendSms(formattedPhoneNumber, message).subscribe();
    } else {
      alert('Invalid or missing phone number.');
    }
  }

  fetchReviews(wkrId: number): void {
    this.bookingRequestService.getReviewsByWorkerId(wkrId).subscribe({
      next: (reviews) => {
        this.reviews = reviews;
        console.log('Fetched reviews:', reviews);
      },
      error: (err) => {
        console.error('Error fetching reviews:', err);
      },
    });
  }
}
