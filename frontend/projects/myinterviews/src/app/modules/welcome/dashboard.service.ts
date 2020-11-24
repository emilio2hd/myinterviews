import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DasboardData } from './dashboard.models';

@Injectable()
export class DashboardService {
  constructor(private http: HttpClient) {}

  getData(): Observable<DasboardData> {
    return this.http.get<DasboardData>('/api/dashboard.json');
  }
}
