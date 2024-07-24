import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'authentication/login',
    component: LoginComponent,
  },
  {
    path: 'authentication/register',
    component: RegisterComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];
