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
  const protectedRoutes = [
    '/home/event-list',
    '/home/event-create',
    '/home/event-create',
  ];
  const protectedDynamicRoutes = ['/home/event-detail'];
  const authRoutes = ['/authentication/login', '/authentication/register'];

  const isProtectedRoute =
    protectedRoutes.includes(state.url) ||
    protectedDynamicRoutes.some((route) => state.url.startsWith(route));

  const isAuthRoute = authRoutes.includes(state.url);
  const hasToken = !!localStorage.getItem('token');

  if (isProtectedRoute && !hasToken) {
    return router.createUrlTree(['/authentication/login']);
  } else if (isAuthRoute && hasToken) {
    return router.createUrlTree(['/home/event-list']);
  } else {
    return true;
  }
};
