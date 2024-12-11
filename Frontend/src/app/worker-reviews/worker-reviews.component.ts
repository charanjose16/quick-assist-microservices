import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingRequestService } from '../service/bookingRequest/booking-request.service';
import { WorkerHeaderComponent } from '../worker-header/worker-header.component';

@Component({
  selector: 'app-worker-reviews',
  standalone: true,
  imports: [WorkerHeaderComponent, CommonModule, FormsModule],
  templateUrl: './worker-reviews.component.html',
  styleUrls: ['./worker-reviews.component.css']
})
export class WorkerReviewsComponent {

  workerId: number = 0;
  reviews: any[] = [];
  review: string = '';
  userName: string = '';

  constructor(private bookingRequestService: BookingRequestService) {}

  ngOnInit(): void {
    this.workerId = Number(sessionStorage.getItem('userId'));
    this.fetchWorkerReviews();
  }

  fetchWorkerReviews(): void {
    this.bookingRequestService.getAllBookingsWorker(this.workerId).subscribe(
      (res) => {
        this.reviews = [];
        res.forEach(booking => {
          // Only process reviews that are non-empty
          if (booking.review.trim() !== '') {
            this.fetchUsername(booking.userId).then(customerName => {
              this.reviews.push({
                feedback: booking.review,
                customerName: customerName,
              });
            });
          }
        });
        console.log("Fetched Reviews:", this.reviews);
      },
      (error) => {
        console.error('Error fetching reviews:', error);
      }
    );
  }

  fetchUsername(userId: number): Promise<string> {
    return new Promise((resolve, reject) => {
      this.bookingRequestService.getUserById(userId).subscribe(
        (res) => {
          resolve(res.name);
        },
        (error) => {
          console.error('Error fetching user by ID:', error);
          reject('Unknown');
        }
      );
    });
  }
}
