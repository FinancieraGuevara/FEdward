import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

export const authInverseGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isAuthenticated())
  {
    const userRole = authService.getUser();
    if (userRole?.role==='ROLE_OWNER')
    {
      router.navigate(['/owner']);
    } else if (userRole?.role==='ROLE_SEDE'){
      router.navigate(['/sede']);
    }
    // if(userRole?.role==='ROLE_NANAY')
    // {
    //   router.navigate(['/nanay'])
    // }
    return false;
  }
  return true;
};
