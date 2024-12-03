import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserHeaderComponent } from '../user-header/user-header.component';

@Component({
  selector: 'app-workers-list',
  standalone: true,
  imports: [RouterModule,UserHeaderComponent],
  templateUrl: './workers-list.component.html',
  styleUrl: './workers-list.component.css'
})
export class WorkersListComponent {

}
