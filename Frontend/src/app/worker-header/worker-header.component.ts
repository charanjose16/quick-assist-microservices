import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../service/authService/auth.service';

@Component({
  selector: 'app-worker-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './worker-header.component.html',
  styleUrl: './worker-header.component.css'
})
export class WorkerHeaderComponent{

  constructor(private authService: AuthService) {}
  logout() {
    this.authService.logout();
  }
}
