import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BookingRequest } from '../model/BookingRequest';
import { BookingRequestService } from '../service/bookingRequest/booking-request.service';
import { UserHeaderComponent } from '../user-header/user-header.component';

@Component({
  selector: 'app-workers-details',
  standalone: true,
  imports: [UserHeaderComponent,CommonModule,RouterModule],
  templateUrl: './workers-details.component.html',
  styleUrl: './workers-details.component.css'
})
export class WorkersDetailsComponent implements OnInit {

  workerId: string | undefined;
  workerName: string | undefined;
  workerPhoneNumber: string | undefined;
  workerEmail: string | undefined;
  workerExpertise: string | undefined;
  workerCity: string | undefined;
  workerSpecialities: string[] | undefined;
  workerPrice:string | undefined;
  currentWorkerId:string | undefined;

  constructor(private route: ActivatedRoute, private bookingRequestService: BookingRequestService) {}

  ngOnInit(): void {
    this.workerId = this.route.snapshot.queryParamMap.get('id')!;
    this.workerName = this.route.snapshot.queryParamMap.get('name')!;
    this.workerPhoneNumber = this.route.snapshot.queryParamMap.get('phoneNumber')!;
    this.workerEmail = this.route.snapshot.queryParamMap.get('email')!;
    this.workerExpertise = this.route.snapshot.queryParamMap.get('expertise')!;
    this.workerCity = this.route.snapshot.queryParamMap.get('city')!;
    this.workerSpecialities = this.route.snapshot.queryParamMap.getAll('specialities');
    this.workerPrice = this.route.snapshot.queryParamMap.get('price')!;
  }

  createBookingRequest(){

    const userId= Number(sessionStorage.getItem('userId'));

    const bookingRequestObject:BookingRequest = {
      id: Number(),
      userId:  userId,
      workerId: Number(this.workerId),
      paymentId: 0,  
      serviceStatus: 'REQUESTED'  
    };
    console.log(JSON.stringify(bookingRequestObject, null, 2) +" vandhuchu");

    this.bookingRequestService.createBookingRequest(bookingRequestObject).subscribe(
      (response) => {
        console.log('Booking request created successfully:', response);
      },
      (error) => {
        console.error('Error creating booking request:', error);
      }
    );

  }

}
