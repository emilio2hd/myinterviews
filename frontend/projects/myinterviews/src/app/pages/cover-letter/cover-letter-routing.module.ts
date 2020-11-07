import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoverLetterListComponent } from './list/list.component';
import { CoverLetterEditorComponent } from './editor/editor.component';
import { CoverLetterResolver } from './cover-letter.resolver';
import { CoverLetterDetailsComponent } from './details/details.component';
import { CoverLetterCopierResolver } from './cover-letter-copier.resolver';
import { SendEmailComponent } from './send-email/send-email.component';

// prettier-ignore
const routes: Routes = [
  { path: '', component: CoverLetterListComponent },
  { path: 'new', component: CoverLetterEditorComponent },
  {
    path: ':id',
    component: CoverLetterDetailsComponent,
    resolve: { coverLetter: CoverLetterResolver },
  },
  {
    path: ':id/edit',
    component: CoverLetterEditorComponent,
    resolve: { coverLetter: CoverLetterResolver },
  },
  {
    path: ':id/copy',
    component: CoverLetterEditorComponent,
    resolve: { coverLetter: CoverLetterCopierResolver }
  },
  {
    path: ':id/send-email',
    component: SendEmailComponent,
    resolve: { coverLetter: CoverLetterResolver }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoverLetterRoutingModule {}
