import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { autGuard } from './guard/aut-guard.guard';
import { HomeComponent } from './pages/home/home.component';
import { EventListComponent } from './pages/event-list/event-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home/event-list',
    pathMatch: 'full',
  },
  {
    path: 'home/event-list',
    component: EventListComponent,
    canActivate: [autGuard],
  },
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
