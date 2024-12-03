import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-worker-signup',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './worker-signup.component.html',
  styleUrl: './worker-signup.component.css'
})
export class WorkerSignupComponent {

  formData = {
    name: '',
    phone: '',
    email: '',
    city: '',
    price: 0,
    expertise: '',
    specialities: [''] // Starting with one input for specialities
  };

  // Add a new speciality input field
  addSpeciality() {
    this.formData.specialities.push('');
  }

  // Remove a speciality input field
  removeSpeciality(index: number) {
    this.formData.specialities.splice(index, 1);
  }

  // Handle form submission
  onSubmit() {
    console.log(this.formData);
  }

}
