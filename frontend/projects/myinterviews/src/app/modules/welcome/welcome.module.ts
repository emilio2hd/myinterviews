import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';
import { DashboardService } from './dashboard.service';

@NgModule({
  imports: [SharedModule, WelcomeRoutingModule],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent],
  providers: [DashboardService],
})
export class WelcomeModule {}
