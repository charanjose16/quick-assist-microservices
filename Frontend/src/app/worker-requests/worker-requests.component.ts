import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { WorkerHeaderComponent } from '../worker-header/worker-header.component';

@Component({
  selector: 'app-worker-requests',
  standalone: true,
  imports: [WorkerHeaderComponent,CommonModule],
  templateUrl: './worker-requests.component.html',
  styleUrl: './worker-requests.component.css'
})
export class WorkerRequestsComponent {

  requests = [
    {
      customerName: 'John Smith',
      serviceName: 'Plumbing',
      address: '123 Elm Street, Springfield',
      status: 'Pending'
    },
    {
      customerName: 'Jane Doe',
      serviceName: 'Electrical Wiring',
      address: '456 Oak Avenue, Metropolis',
      status: 'Pending'
    },
    {
      customerName: 'Alice Brown',
      serviceName: 'Carpentry',
      address: '789 Pine Lane, Gotham',
      status: 'Accepted'
    },
    {
      customerName: 'Mariana Joe',
      serviceName: 'Mechanic',
      address: '390 Chicago Lane, Merni',
      status: 'Rejected'
    }
  ];

  acceptRequest(request: any) {
    request.status = 'Accepted';
  }

  rejectRequest(request: any) {
    request.status = 'Rejected';
  }

}
