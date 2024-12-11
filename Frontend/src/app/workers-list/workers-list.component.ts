import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GetWorkersByProfessionService } from '../service/getWorkersByProfession/get-workers-by-profession.service';
import { UserHeaderComponent } from '../user-header/user-header.component';

@Component({
  selector: 'app-workers-list',
  standalone: true,
  imports: [RouterModule,UserHeaderComponent,CommonModule],
  templateUrl: './workers-list.component.html',
  styleUrl: './workers-list.component.css'
})
export class WorkersListComponent implements OnInit{

  profession: string | null = '';
  workers: any[] = [];
  filteredWorkers: any[] = [];
  uniqueCities: string[] = [];

  constructor(private route: ActivatedRoute,private getWorkersByProfession:GetWorkersByProfessionService) {}

  ngOnInit(): void {
    this.profession = this.route.snapshot.paramMap.get('profession');
    console.log('Selected profession:', this.profession);
    if (this.profession) {
      this.fetchWorkers(this.profession);
    }

  }

  fetchWorkers(profession: string): void {
    this.getWorkersByProfession.getWorkersByProfession(profession).subscribe(
      (response) => {
        this.workers = response;
        this.filteredWorkers = response; // Initially show all workers
        this.extractUniqueCities();
      },
      (error) => {
        console.error('Error fetching workers:', error);
      }
    );
  }

  extractUniqueCities(): void {
    const cities = this.workers.map(worker => worker.city);
    this.uniqueCities = Array.from(new Set(cities)); // Remove duplicates
  }

  onCityFilterChange(event: Event): void {
    const selectedCity = (event.target as HTMLSelectElement).value;
    this.filteredWorkers = selectedCity
      ? this.workers.filter(worker => worker.city === selectedCity)
      : this.workers; // Show all workers if no city is selected
  }



}
