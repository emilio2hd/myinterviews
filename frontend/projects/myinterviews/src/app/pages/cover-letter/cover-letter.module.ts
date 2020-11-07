import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { DemoNgZorroAntdModule } from '../../ng-zorro-antd.module';

import { CoverLetterRoutingModule } from './cover-letter-routing.module';
import { CoverLetterListComponent } from './list/list.component';
import { CoverLetterService } from './cover-letter.service';
import { CoverLetterEditorComponent } from './editor/editor.component';
import { CoverLetterDetailsComponent } from './details/details.component';
import { CoverLetterResolver } from './cover-letter.resolver';
import { CoverLetterCopierResolver } from './cover-letter-copier.resolver';
import { SendEmailComponent } from './send-email/send-email.component';
import { FileUploadComponent } from './send-email/file-upload/file-upload.component';
import { CoverLetterFormComponent } from './editor/form/form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoverLetterRoutingModule,
    CKEditorModule,
    DemoNgZorroAntdModule,
  ],
  declarations: [
    CoverLetterListComponent,
    CoverLetterEditorComponent,
    CoverLetterFormComponent,
    CoverLetterDetailsComponent,
    SendEmailComponent,
    FileUploadComponent,
  ],
  providers: [CoverLetterService, CoverLetterResolver, CoverLetterCopierResolver],
})
export class CoverLetterModule {}
