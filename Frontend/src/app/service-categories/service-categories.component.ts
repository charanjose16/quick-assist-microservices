import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserHeaderComponent } from '../user-header/user-header.component';

@Component({
  selector: 'app-service-categories',
  standalone: true,
  imports: [UserHeaderComponent,RouterModule],
  templateUrl: './service-categories.component.html',
  styleUrl: './service-categories.component.css'
})
export class ServiceCategoriesComponent {

}
