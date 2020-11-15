import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DemoNgZorroAntdModule } from '../../ng-zorro-antd.module';

import { JobApplicationRoutingModule } from './job-application-routing.module';
import { JobApplicationListComponent } from './list/list.component';
import { JobApplicationService } from './job-application.service';
import { JobApplicationResolver } from './job-application.resolver';
import { JobApplicationFormComponent } from './form/form.component';
import { JobApplicationDetailsComponent } from './details/details.component';

@NgModule({
  imports: [
    CommonModule,
    JobApplicationRoutingModule,
    DemoNgZorroAntdModule,
    ReactiveFormsModule,
    CKEditorModule,
  ],
  declarations: [
    JobApplicationListComponent,
    JobApplicationFormComponent,
    JobApplicationDetailsComponent,
  ],
  providers: [JobApplicationService, JobApplicationResolver],
})
export class JobApplicationModule {}
