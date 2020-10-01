import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { DemoNgZorroAntdModule } from '../../ng-zorro-antd.module';

import { CoverLetterRoutingModule } from './cover-letter-routing.module';
import { CoverLetterListComponent } from './list/list.component';
import { CoverLetterService } from './cover-letter.service';
import { CoverLetterFormComponent } from './form/form.component';
import { CoverLetterDetailsComponent } from './details/details.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoverLetterRoutingModule,
    CKEditorModule,
    DemoNgZorroAntdModule,
  ],
  declarations: [CoverLetterListComponent, CoverLetterFormComponent, CoverLetterDetailsComponent],
  providers: [CoverLetterService],
})
export class CoverLetterModule {}
