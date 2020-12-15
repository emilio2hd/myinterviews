import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from '@layout/layout.module';

import { DemoNgZorroAntdModule } from '../../ng-zorro-antd.module';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';
import { DashboardService } from './dashboard.service';

@NgModule({
  imports: [CommonModule, WelcomeRoutingModule, LayoutModule, DemoNgZorroAntdModule],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent],
  providers: [DashboardService],
})
export class WelcomeModule {}
