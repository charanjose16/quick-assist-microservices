import { Component } from '@angular/core';
import { WorkerHeaderComponent } from '../worker-header/worker-header.component';

@Component({
  selector: 'app-worker-homepage',
  standalone: true,
  imports: [WorkerHeaderComponent],
  templateUrl: './worker-homepage.component.html',
  styleUrl: './worker-homepage.component.css'
})
export class WorkerHomepageComponent {

}
