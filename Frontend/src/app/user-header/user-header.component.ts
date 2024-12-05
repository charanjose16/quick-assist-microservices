import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../service/authService/auth.service';

@Component({
  selector: 'app-user-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css'
})
export class UserHeaderComponent {
 constructor(private authService: AuthService) {}

 clicked() {
   console.log( this.authService.fetchUserByUsername());
   alert( this.authService.getUserByUsername())
 }
}
