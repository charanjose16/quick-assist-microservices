import { Component } from '@angular/core';
import { UserHeaderComponent } from '../user-header/user-header.component';

@Component({
  selector: 'app-workers-details',
  standalone: true,
  imports: [UserHeaderComponent],
  templateUrl: './workers-details.component.html',
  styleUrl: './workers-details.component.css'
})
export class WorkersDetailsComponent {

}
