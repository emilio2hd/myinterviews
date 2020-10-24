import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DemoNgZorroAntdModule } from '../../ng-zorro-antd.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsFormComponent } from './form/form.component';
import { SettingsService } from './settings.service';
import { SettingsResolver } from './settings.resolver';

@NgModule({
  declarations: [SettingsFormComponent],
  imports: [CommonModule, SettingsRoutingModule, ReactiveFormsModule, DemoNgZorroAntdModule],
  providers: [SettingsResolver, SettingsService],
})
export class SettingsModule {}
