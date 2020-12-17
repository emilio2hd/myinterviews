import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import { LayoutModule } from '@layout/layout.module';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';
import { DashboardService } from './dashboard.service';

@NgModule({
  imports: [SharedModule, WelcomeRoutingModule, LayoutModule],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent],
  providers: [DashboardService],
})
export class WelcomeModule {}
