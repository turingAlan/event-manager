import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { autGuard } from './guard/aut-guard.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'authentication/login',
    component: LoginComponent,
    canActivate: [autGuard],
  },
  {
    path: 'authentication/register',
    component: RegisterComponent,
    canActivate: [autGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];
