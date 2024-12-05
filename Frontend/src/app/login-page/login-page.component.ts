import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse } from '../model/loginResponse'; // Make sure this file exists and contains the correct interface
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,  // Corrected variable name
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login(user: any) {
    console.log(user);
    
    this.authService.login(user).subscribe({
      next: (response: LoginResponse) => {
        console.log('Login Response:', response);
        const token = response.token?.jwt; // Access the JWT token
        const username = response.userName; // Access the username
        const role = response.role; // Access the role

        if (token && username && role) {
          // Store the token, username, and role in sessionStorage
          sessionStorage.setItem('jwt', token);
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('role', role);

          // Navigate to the homepage or dashboard
          if(role === "ROLE_USER")
            this.router.navigate(['/user-homepage']);
          else if(role === "ROLE_WORKER")
            this.router.navigate(['/worker-homepage']);
        } else {
          console.error('Required fields (token, username, role) not found');
        }
      },
      error: (err) => {
        console.error('Login failed', err);
      },
    });
  }
}
