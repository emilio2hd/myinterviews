import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoverLetterPageComponent } from './pages/cover-letter-page.component';

// prettier-ignore
const routes: Routes = [
  { path: '', component: CoverLetterPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoverLetterRoutingModule {}
