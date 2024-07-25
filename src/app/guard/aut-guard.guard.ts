import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';

export const autGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const protectedRoute = ['/home/event-list', '/home/event-create'];
  const authRoute = ['/authentication/login', '/authentication/register'];

  return protectedRoute.includes(state.url) && !localStorage.getItem('token')
    ? router.navigate(['/authentication/login'])
    : authRoute.includes(state.url) && localStorage.getItem('token')
    ? router.navigate(['/home'])
    : true;
};
