import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  const _cookieService = inject(CookieService);
  const token = _cookieService.get('token');
  const router = inject(Router);
  if(!token) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
