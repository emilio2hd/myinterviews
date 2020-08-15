import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CKEditorModule } from 'ckeditor4-angular';

import { DemoNgZorroAntdModule } from '../../ng-zorro-antd.module';

import { CoverLetterRoutingModule } from './cover-letter-routing.module';
import { CoverLetterListComponent } from './list/list.component';
import { CoverLetterService } from './cover-letter.service';
import { CoverLetterFormComponent } from './form/form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoverLetterRoutingModule,
    CKEditorModule,
    DemoNgZorroAntdModule,
  ],
  declarations: [CoverLetterListComponent, CoverLetterFormComponent],
  providers: [CoverLetterService],
})
export class CoverLetterModule {}
