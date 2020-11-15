import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  dashboardData$ = this.dashboardService.getData();

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {}
}
