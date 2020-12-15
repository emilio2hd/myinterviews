import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LayoutModule } from '@app/@layout/layout.module';

import { DemoNgZorroAntdModule } from '../../ng-zorro-antd.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsFormComponent } from './form/form.component';
import { SettingsResolver } from './settings.resolver';

@NgModule({
  declarations: [SettingsFormComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    DemoNgZorroAntdModule,
  ],
  providers: [SettingsResolver],
})
export class SettingsModule {}
