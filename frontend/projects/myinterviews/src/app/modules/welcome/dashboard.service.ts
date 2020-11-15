import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DasboardData } from './dashboard.model';
import { Observable } from 'rxjs';

@Injectable()
export class DashboardService {
  constructor(private http: HttpClient) {}

  getData(): Observable<DasboardData> {
    return this.http.get<DasboardData>('/api/dashboard.json');
  }
}
