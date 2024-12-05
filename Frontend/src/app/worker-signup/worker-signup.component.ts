import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-worker-signup',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './worker-signup.component.html',
  styleUrl: './worker-signup.component.css'
})
export class WorkerSignupComponent {

  workerSignup: FormGroup;  // Define the form group

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Initialize the form group with FormBuilder
    this.workerSignup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      username:['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: [''],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(1)]],
      expertise: ['', [Validators.required]],
      specialities: this.fb.array([this.fb.control('')])  // Specialities as a FormArray
    });
  }

  get specialities(): FormArray {
    return this.workerSignup.get('specialities') as FormArray;
  }

  // Method to add a new speciality
  addSpeciality(): void {
    this.specialities.push(this.fb.control(''));
  }

  // Method to remove a speciality
  removeSpeciality(index: number): void {
    this.specialities.removeAt(index);
  }

  // Method to handle form submission
  onSubmit(): void {
    if (this.workerSignup.valid) {
      const newWorker = this.workerSignup.value;
      this.authService.createUser(newWorker).subscribe((response) => {
        console.log(response);
        this.router.navigate(['/login']);  // Navigate to worker dashboard (adjust path as needed)
      }, (error) => {
        console.error('Error creating worker:', error);
      });
    } else {
      console.log('Form is invalid');
    }
  }

}
