import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {

  constructor(private router:Router) {} 

    userClicked() {
      this.router.navigate(['/user-signup'], { queryParams: { role: 'USER' } })
    }

    workerClicked() {
      this.router.navigate(['/worker-signup'],  { queryParams: { role: 'WORKER' } })
    }

}
