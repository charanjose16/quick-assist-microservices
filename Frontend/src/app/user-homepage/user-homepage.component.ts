import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserHeaderComponent } from '../user-header/user-header.component';

@Component({
  selector: 'app-user-homepage',
  standalone: true,
  imports: [UserHeaderComponent,RouterModule],
  templateUrl: './user-homepage.component.html',
  styleUrl: './user-homepage.component.css'
})
export class UserHomepageComponent  implements OnInit{
  ngOnInit(): void {
    const reloadCount = Number(sessionStorage.getItem('reloadCount')) || 0;
  
    if (reloadCount < 1) { // Reload only up to 2 times
      sessionStorage.setItem('reloadCount', (reloadCount + 1).toString());
      window.location.reload();
    } else {
      console.log('Reloads limit reached');
    }
  }
  

 
}
