import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SharedModule } from '@shared';

import { CoverLetterRoutingModule } from './cover-letter-routing.module';
import { CoverLetterPageComponent } from './pages/cover-letter-page.component';
import { CoverLetterApiService } from './services';
import {
  FileUploadComponent,
  EditorDrawerComponent,
  EditorDrawerTitleComponent,
  EmailSenderComponent,
} from './components';

@NgModule({
  imports: [SharedModule, ReactiveFormsModule, CoverLetterRoutingModule, CKEditorModule],
  declarations: [
    CoverLetterPageComponent,
    FileUploadComponent,
    EditorDrawerComponent,
    EditorDrawerTitleComponent,
    EmailSenderComponent,
  ],
  providers: [CoverLetterApiService],
})
export class CoverLetterModule {}
