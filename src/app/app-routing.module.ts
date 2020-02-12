import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './modules/core/components/main-layout/main-layout.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/app/welcome' },
  {
    path: 'app',
    component: MainLayoutComponent,
    children: [
      {
        path: 'welcome',
        loadChildren: () =>
          import('./modules/welcome/welcome.module').then(
            (m) => m.WelcomeModule
          ),
      },
    ],
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
