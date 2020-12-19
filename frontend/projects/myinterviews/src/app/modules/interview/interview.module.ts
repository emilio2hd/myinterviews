import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SharedModule } from '@shared';

import { InterviewRoutingModule } from './interview-routing.module';
import { InterviewListComponent } from './list/list.component';
import { InterviewDetailsComponent } from './details/details.component';
import { InterviewApiService } from './interview.api.service';
import { InterviewResolver } from './interview.resolver';
import { InterviewFormComponent } from './form/form.component';
import { ApplicationsResolver } from './applications.resolver';

@NgModule({
  imports: [SharedModule, ReactiveFormsModule, InterviewRoutingModule, CKEditorModule],
  declarations: [InterviewListComponent, InterviewDetailsComponent, InterviewFormComponent],
  providers: [InterviewApiService, InterviewResolver, ApplicationsResolver],
})
export class InterviewModule {}
