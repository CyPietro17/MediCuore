import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

export const CanActivate = () => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);
  if (!authService.isUserLoggedIn) {
    router.navigate(['/']);
    return false;
  } else {
    return true;
  }
};

export const CanActivateChild = () => {
  const authService: AuthService = inject(AuthService);
  return authService.isAdminRole();
};
