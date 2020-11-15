import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoverLetterListComponent } from './pages/list.component';

// prettier-ignore
const routes: Routes = [
  { path: '', component: CoverLetterListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoverLetterRoutingModule {}
