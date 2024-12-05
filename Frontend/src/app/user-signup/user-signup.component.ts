import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-user-signup',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.css'
})
export class UserSignupComponent {

  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private addService: AuthService,private router:Router) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: [''],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
    });
  }

  createNewUser(user:any) {
    this.addService.createUser(user).subscribe((response) => {
      console.log(response);
      this.router.navigate(['/login']);
    });    
  }

}
