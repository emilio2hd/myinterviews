import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsFormComponent } from './form/form.component';
import { SettingsResolver } from './settings.resolver';

@NgModule({
  declarations: [SettingsFormComponent],
  imports: [SharedModule, SettingsRoutingModule, ReactiveFormsModule],
  providers: [SettingsResolver],
})
export class SettingsModule {}
