import { Component } from '@angular/core';
import { UserHeaderComponent } from '../user-header/user-header.component';

@Component({
  selector: 'app-user-bookings',
  standalone: true,
  imports: [UserHeaderComponent],
  templateUrl: './user-bookings.component.html',
  styleUrl: './user-bookings.component.css'
})
export class UserBookingsComponent {

}
