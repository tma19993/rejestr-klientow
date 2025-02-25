import { inject } from '@angular/core';
import {
  CanLoadFn,
  CanMatchFn,
  Route,
  Router,
  UrlSegment,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuardLoad: CanMatchFn = (
  route: Route,
  segments: UrlSegment[],
) => {
  const isLoggedIn = inject(AuthService).isLoggedIn();
  return isLoggedIn ? true : inject(Router).createUrlTree(['/logowanie']);
};
