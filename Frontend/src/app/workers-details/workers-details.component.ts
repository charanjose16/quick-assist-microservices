import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BookingRequest } from '../model/BookingRequest';
import { BookingRequestService } from '../service/bookingRequest/booking-request.service';
import { UserHeaderComponent } from '../user-header/user-header.component';


@Component({
  selector: 'app-workers-details',
  standalone: true,
  imports: [UserHeaderComponent, CommonModule, RouterModule],
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

  constructor(
    private route: ActivatedRoute,
    private bookingRequestService: BookingRequestService
  ) {}

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
  }

  createBookingRequest() {
    const userId = Number(sessionStorage.getItem('userId'));



    const bookingRequestObject: BookingRequest = {
      id: 0,
      userId: userId,
      workerId: Number(this.workerId),
      paymentId: 0,
      serviceStatus: 'REQUESTED',
    };

    console.log(JSON.stringify(bookingRequestObject, null, 2) + ' vandhuchu');

    this.bookingRequestService.createBookingRequest(bookingRequestObject).subscribe(
      (response) => {
        console.log('Booking request created successfully:', response);
      },
      (error) => {
        console.error('Error creating booking request:', error);
      }
    );

  // this.sendSms();

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
}
