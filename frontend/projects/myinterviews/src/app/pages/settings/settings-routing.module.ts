import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsFormComponent } from './form/form.component';
import { SettingsResolver } from './settings.resolver';

const routes: Routes = [
  {
    path: '',
    component: SettingsFormComponent,
    resolve: { settings: SettingsResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
