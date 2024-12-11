
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AuthService } from './service/authService/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'quick-assist';
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.initializeUser();
  }
}
