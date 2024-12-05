import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserHeaderComponent } from '../user-header/user-header.component';

@Component({
  selector: 'app-workers-details',
  standalone: true,
  imports: [UserHeaderComponent,CommonModule],
  templateUrl: './workers-details.component.html',
  styleUrl: './workers-details.component.css'
})
export class WorkersDetailsComponent implements OnInit {

  workerId: string | undefined;
  workerName: string | undefined;
  workerPhoneNumber: string | undefined;
  workerEmail: string | undefined;
  workerExpertise: string | undefined;
  workerCity: string | undefined;
  workerSpecialities: string[] | undefined;
  workerPrice:string | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.workerName = this.route.snapshot.queryParamMap.get('name')!;
    this.workerPhoneNumber = this.route.snapshot.queryParamMap.get('phoneNumber')!;
    this.workerEmail = this.route.snapshot.queryParamMap.get('email')!;
    this.workerExpertise = this.route.snapshot.queryParamMap.get('expertise')!;
    this.workerCity = this.route.snapshot.queryParamMap.get('city')!;
    this.workerSpecialities = this.route.snapshot.queryParamMap.getAll('specialities');
    this.workerPrice = this.route.snapshot.queryParamMap.get('price')!;
  }

}
