import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { UserHeaderComponent } from '../user-header/user-header.component';

@Component({
  selector: 'app-user-requests',
  standalone: true,
  imports: [UserHeaderComponent,NgFor,CommonModule],
  templateUrl: './user-requests.component.html',
  styleUrl: './user-requests.component.css'
})
export class UserRequestsComponent {

    requests = [
      { serviceName: 'Plumbing', workerName: 'John Doe', status: 'Requested' },
      { serviceName: 'Electrical', workerName: 'Jane Smith', status: 'Accepted' },
      { serviceName: 'Carpentry', workerName: 'Mike Brown', status: 'Requested' },
      { serviceName: 'Mechanic', workerName: 'Jaden Smuff', status: 'Accepted' },
    ];
  
    cancelRequest(request: any) {
      console.log(`Canceling request for ${request.serviceName}`);
      // Logic to handle request cancellation
      request.status = 'Cancelled';
    }
  
    payNow(request: any) {
      console.log(`Paying for ${request.serviceName}`);
      // Logic to handle payment process
    }

  
}
