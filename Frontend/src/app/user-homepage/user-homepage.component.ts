import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserHeaderComponent } from '../user-header/user-header.component';

@Component({
  selector: 'app-user-homepage',
  standalone: true,
  imports: [UserHeaderComponent,RouterModule],
  templateUrl: './user-homepage.component.html',
  styleUrl: './user-homepage.component.css'
})
export class UserHomepageComponent {

}
