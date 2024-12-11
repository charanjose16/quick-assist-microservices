import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookingRequestService } from '../service/bookingRequest/booking-request.service';
import { WorkerHeaderComponent } from '../worker-header/worker-header.component';

@Component({
  selector: 'app-worker-profile',
  templateUrl: './worker-profile.component.html',
  styleUrls: ['./worker-profile.component.css'],
  standalone:true,
  imports: [CommonModule,WorkerHeaderComponent, FormsModule]
})
export class WorkerProfileComponent implements OnInit {
  workerId: number = 0;
  profilePic: string = '';
  name: string = '';
  email: string = '';
  phone: string = '';
  city: string = '';
  expertise: string = '';
  specialities: string[] = [];
  price: number=0;
  
  // To store original data
  originalData: any = {};

  constructor(private profileService: BookingRequestService) {}

  ngOnInit() {
    this.workerId = Number(sessionStorage.getItem('userId'));
    console.log(this.workerId)
    this.getProfileDetails();
  }

  getProfileDetails() {
    this.profileService.getUserById(this.workerId).subscribe(res => {
      this.originalData = { ...res }; // Store original data
      this.name = res.name;
      this.email = res.email;
      this.phone = res.phoneNumber;
      this.city = res.city;
      this.expertise = res.expertise;
      this.price = res.price;
    });
  }

  updateProfile() {
    const updatedFields: any = {};
    console.log("updae method calledddddddd");
    
  
    if (this.name !== this.originalData.name) updatedFields.name = this.name;
    if (this.email !== this.originalData.email) updatedFields.email = this.email;
    if (this.phone !== this.originalData.phoneNumber) updatedFields.phone = this.phone;
    if (this.city !== this.originalData.city) updatedFields.city = this.city;
    if (this.price !== this.originalData.price) updatedFields.price = this.price;
  
    if (Object.keys(updatedFields).length > 0) {
      console.log("step 1");
      
      this.profileService.updateUserProfile(this.workerId, updatedFields).subscribe({
        next: () => {
          // console.log("Profile updated yeahhhhhhh");
          
          // alert('Profile updated successfully!');
          this.getProfileDetails();
        },
        error: (error) => {
          console.error('Error updating profile:', error);
        },
      });
    } else {
      // alert('No changes detected!');
      console.log("No changes detected to update 😢");
      
    }
  }
  
}
