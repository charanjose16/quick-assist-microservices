import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserHeaderComponent } from '../user-header/user-header.component';

@Component({
  selector: 'app-service-categories',
  standalone: true,
  imports: [UserHeaderComponent,RouterModule],
  templateUrl: './service-categories.component.html',
  styleUrl: './service-categories.component.css'
})
export class ServiceCategoriesComponent {

  constructor (private router:Router){}

  navigateToWorkerList(profession: string): void {
    this.router.navigate(['/worker-list', profession]);
  }
}
