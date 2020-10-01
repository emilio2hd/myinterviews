import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoverLetterListComponent } from './list/list.component';
import { CoverLetterFormComponent } from './form/form.component';
import { CoverLetterResolver } from './cover-letter.resolver';
import { CoverLetterDetailsComponent } from './details/details.component';

// prettier-ignore
const routes: Routes = [
  { path: '', component: CoverLetterListComponent },
  { path: 'new', component: CoverLetterFormComponent },
  {
    path: ':id',
    component: CoverLetterDetailsComponent,
    resolve: { coverLetter: CoverLetterResolver },
  },
  {
    path: ':id/edit',
    component: CoverLetterFormComponent,
    resolve: { coverLetter: CoverLetterResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoverLetterRoutingModule {}
