import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { WorkerHeaderComponent } from '../worker-header/worker-header.component';

@Component({
  selector: 'app-worker-profile',
  standalone: true,
  imports: [WorkerHeaderComponent,CommonModule,FormsModule],
  templateUrl: './worker-profile.component.html',
  styleUrl: './worker-profile.component.css'
})
export class WorkerProfileComponent {

  worker = {
    profilePic: '', // Path to the profile picture
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+1 234 567 890',
    city: 'New York',
    expertise: 'Plumbing, Electrical',
    specialties: 'Leak detection, Wiring, Pipe installation'
  };

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.worker.profilePic = e.target.result; // Update the profilePic path
      };
      reader.readAsDataURL(file);
    }
  }

  updateProfile() {
    // Simulate profile update
    alert('Profile updated successfully!');
    console.log(this.worker);
  }

}
