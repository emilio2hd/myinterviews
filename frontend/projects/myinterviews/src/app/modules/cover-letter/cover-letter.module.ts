import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { DemoNgZorroAntdModule } from '../../ng-zorro-antd.module';

import { CoverLetterRoutingModule } from './cover-letter-routing.module';
import { CoverLetterListComponent } from './list/list.component';
import { CoverLetterService } from './cover-letter.service';
import { CoverLetterResolver } from './cover-letter.resolver';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { EditorDrawerComponent } from './editor-drawer/editor-drawer.component';
import { EditorDrawerTitleComponent } from './editor-drawer-title/editor-drawer-title.component';
import { EmailSenderComponent } from './email-sender/email-sender.component';

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
    FileUploadComponent,
    EditorDrawerComponent,
    EditorDrawerTitleComponent,
    EmailSenderComponent,
  ],
  providers: [CoverLetterService, CoverLetterResolver],
})
export class CoverLetterModule {}
