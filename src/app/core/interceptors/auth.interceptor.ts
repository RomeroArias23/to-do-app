import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

/**
 * Authentication HTTP Interceptor
 *
 * This interceptor automatically attaches a Bearer token to outgoing
 * HTTP requests when the user is authenticated.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  /**
   * Injects the AuthService to retrieve the current access token.
   * Using `inject()` enables dependency injection in functional interceptors
   * without the need for class-based implementations.
   */
  const auth = inject(AuthService);

  /**
   * Retrieves the access token from the authentication service.
   * If the user is not authenticated, this will return `null`.
   */
  const token = auth.getAccessToken();

  /**
   * If no token is available, forward the original request unchanged.
   * This ensures that public or unauthenticated endpoints continue to work.
   */
  if (!token) {
    return next(req);
  }

  /**
   * Clones the original HTTP request and adds the Authorization header.
   * Requests are immutable, so cloning is required to modify headers.
   */
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  /**
   * Forwards the modified request with the Authorization header attached.
   */
  return next(authReq);
};
