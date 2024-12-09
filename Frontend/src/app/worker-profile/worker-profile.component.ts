import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { BookingRequestService } from '../service/bookingRequest/booking-request.service';
import { WorkerHeaderComponent } from '../worker-header/worker-header.component';

@Component({
  selector: 'app-worker-profile',
  standalone: true,
  imports: [WorkerHeaderComponent,CommonModule,FormsModule],
  templateUrl: './worker-profile.component.html',
  styleUrl: './worker-profile.component.css'
})
export class WorkerProfileComponent implements OnInit {

  constructor(private profileService:BookingRequestService){}
  workerId:number =0;
    profilePic:string= ''; 
    name:string= '';
    email:string ='';
    phone:string= '';
    city:string= '';
    expertise:string= '';
    specialities:string[]=[];
    specialitiesString:string='';



  ngOnInit(){
    this.workerId =Number(sessionStorage.getItem('userId'));
    console.log(this.workerId);
    
    this.getProfileDetails();
  }

  getProfileDetails(){
    this.profileService.getUserById(this.workerId).subscribe(res=>{
      console.log(res.specialties);
      this.name=res.name
      this.email=res.email
      this.phone=res.phoneNumber
      this.city=res.city
      this.expertise=res.expertise
    })
  }

  updateProfile() {
    // Simulate profile update
    alert('Profile updated successfully!');
    
  }

}
