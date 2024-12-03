import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { WorkerHeaderComponent } from '../worker-header/worker-header.component';

@Component({
  selector: 'app-worker-bookings',
  standalone: true,
  imports: [WorkerHeaderComponent,CommonModule],
  templateUrl: './worker-bookings.component.html',
  styleUrl: './worker-bookings.component.css'
})
export class WorkerBookingsComponent {

  bookings = [
    {
      serviceName: 'Plumbing',
      customerName: 'John Doe',
      bookingDate: new Date('2023-12-01T10:00:00'),
      status: 'Completed'
    },
    {
      serviceName: 'Electrical',
      customerName: 'Jane Smith',
      bookingDate: new Date('2023-12-02T14:00:00'),
      status: 'Ongoing'
    },
    {
      serviceName: 'Carpentry',
      customerName: 'Mike Brown',
      bookingDate: new Date('2023-12-03T11:00:00'),
      status: 'Completed'
    },
    {
      serviceName: 'Electrical',
      customerName: 'Alice White',
      bookingDate: new Date('2023-12-05T15:30:00'),
      status: 'Ongoing'
    }
  ];
}
