import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';

const routes: Routes = [
  {
    path: 'welcome',
    loadChildren: () => import('../welcome/welcome.module').then((m) => m.WelcomeModule),
  },
  {
    path: 'cover-letter',
    loadChildren: () =>
      import('../cover-letter/cover-letter.module').then((m) => m.CoverLetterModule),
  },
  {
    path: 'job-application',
    loadChildren: () =>
      import('../job-application/job-application.module').then((m) => m.JobApplicationModule),
  },
  {
    path: 'interview',
    loadChildren: () => import('../interview/interview.module').then((m) => m.InterviewModule),
  },
  {
    path: 'settings',
    loadChildren: () => import('../settings/settings.module').then((m) => m.SettingsModule),
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
