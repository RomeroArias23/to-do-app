import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

/**
 * Authentication Guard
 *
 * This guard protects routes that require the user to be authenticated.
 * It runs before route activation and decides whether navigation is allowed.
 */
export const authGuard: CanActivateFn = () => {
  /**
   * Injects the AuthService to access the current authentication state.
   * Using `inject()` allows dependency injection in functional guards
   * without relying on class-based constructors.
   */
  const auth = inject(AuthService);

  /**
   * Injects the Angular Router to handle redirection when access is denied.
   */
  const router = inject(Router);

  /**
   * If the user is authenticated, allow route activation.
   * Returning `true` tells Angular Router to proceed with navigation.
   */
  if (auth.isLoggedIn()) {
    return true;
  }

  /**
   * If the user is not authenticated, block route activation
   * and redirect the user to the `/tasks` route.
   *
   * Returning a UrlTree is the recommended approach because it avoids
   * side effects and integrates cleanly with Angular's navigation lifecycle.
   */
  return router.createUrlTree(['/tasks']);
};
