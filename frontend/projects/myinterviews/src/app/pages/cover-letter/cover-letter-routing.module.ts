import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoverLetterListComponent } from './list/list.component';
import { CoverLetterFormComponent } from './form/form.component';

// prettier-ignore
const routes: Routes = [
  { path: '', component: CoverLetterListComponent },
  { path: 'new', component: CoverLetterFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoverLetterRoutingModule {}
