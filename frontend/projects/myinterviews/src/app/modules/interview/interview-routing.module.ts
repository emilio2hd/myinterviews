import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InterviewListComponent } from './list/list.component';
import { InterviewDetailsComponent } from './details/details.component';
import { InterviewResolver } from './interview.resolver';
import { InterviewFormComponent } from './form/form.component';
import { ApplicationsResolver } from './applications.resolver';

const routes: Routes = [
  { path: '', component: InterviewListComponent },
  {
    path: 'new',
    component: InterviewFormComponent,
    resolve: { applications: ApplicationsResolver },
  },
  {
    path: ':id',
    component: InterviewDetailsComponent,
    resolve: { interview: InterviewResolver },
  },
  {
    path: ':id/edit',
    component: InterviewFormComponent,
    resolve: { applications: ApplicationsResolver, interview: InterviewResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InterviewRoutingModule {}
