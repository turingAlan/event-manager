import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { autGuard } from './guard/aut-guard.guard';
import { EventListComponent } from './pages/event-list/event-list.component';
import { EventFormComponent } from './pages/event-form/event-form.component';
import { EventDetailComponent } from './pages/event-detail/event-detail.component';

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
    path: 'home/event-create',
    component: EventFormComponent,
    canActivate: [autGuard],
  },
  {
    path: 'home/event-detail/:id',
    component: EventDetailComponent,
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
