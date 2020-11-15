import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './modules/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'welcome',
    loadChildren: () => import('./modules/welcome/welcome.module').then((m) => m.WelcomeModule),
  },
  {
    path: 'cover-letter',
    loadChildren: () =>
      import('./modules/cover-letter/cover-letter.module').then((m) => m.CoverLetterModule),
  },
  {
    path: 'job-application',
    loadChildren: () =>
      import('./modules/job-application/job-application.module').then(
        (m) => m.JobApplicationModule
      ),
  },
  {
    path: 'interview',
    loadChildren: () =>
      import('./modules/interview/interview.module').then((m) => m.InterviewModule),
  },
  {
    path: 'settings',
    loadChildren: () => import('./modules/settings/settings.module').then((m) => m.SettingsModule),
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
