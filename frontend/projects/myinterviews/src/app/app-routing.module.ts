import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then((m) => m.WelcomeModule),
  },
  {
    path: 'cover-letter',
    loadChildren: () =>
      import('./pages/cover-letter/cover-letter.module').then((m) => m.CoverLetterModule),
  },
  {
    path: 'job-application',
    loadChildren: () =>
      import('./pages/job-application/job-application.module').then((m) => m.JobApplicationModule),
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
