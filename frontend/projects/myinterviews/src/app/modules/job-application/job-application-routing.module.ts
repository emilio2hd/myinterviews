import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobApplicationFormComponent } from './form/form.component';
import { JobApplicationResolver } from './job-application.resolver';
import { JobApplicationListComponent } from './list/list.component';
import { JobApplicationDetailsComponent } from './details/details.component';

const routes: Routes = [
  { path: '', component: JobApplicationListComponent },
  { path: 'new', component: JobApplicationFormComponent },
  {
    path: ':id',
    component: JobApplicationDetailsComponent,
    resolve: { jobApplication: JobApplicationResolver },
  },
  {
    path: ':id/edit',
    component: JobApplicationFormComponent,
    resolve: { jobApplication: JobApplicationResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobApplicationRoutingModule {}
