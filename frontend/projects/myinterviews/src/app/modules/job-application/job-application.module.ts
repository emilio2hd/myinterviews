import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SharedModule } from '@shared';

import { JobApplicationRoutingModule } from './job-application-routing.module';
import { JobApplicationListComponent } from './list/list.component';
import { JobApplicationApiService } from './job-application.api.service';
import { JobApplicationResolver } from './job-application.resolver';
import { JobApplicationFormComponent } from './form/form.component';
import { JobApplicationDetailsComponent } from './details/details.component';
import { ApplicationTimelineComponent } from './application-timeline/application-timeline.component';

@NgModule({
  imports: [SharedModule, JobApplicationRoutingModule, ReactiveFormsModule, CKEditorModule],
  declarations: [
    JobApplicationListComponent,
    JobApplicationFormComponent,
    JobApplicationDetailsComponent,
    ApplicationTimelineComponent,
  ],
  providers: [JobApplicationApiService, JobApplicationResolver],
})
export class JobApplicationModule {}
