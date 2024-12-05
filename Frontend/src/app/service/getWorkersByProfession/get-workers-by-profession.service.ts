import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetWorkersByProfessionService {

  private baseUrl = 'http://localhost:8888'; // Adjust base URL as needed

  constructor(private http: HttpClient) {}

  getWorkersByProfession(profession: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users/allWorkers/${profession}`);
  }
}
