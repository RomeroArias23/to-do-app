import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationsService } from '../services/notifications.service';

/**
 * Global HTTP Error Interceptor
 *
 * This interceptor centralizes HTTP error handling across the application.
 * It maps common HTTP error responses to user-friendly notifications
 * and performs global side effects such as logout and redirection.
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  /**
   * Inject required services using Angular's functional DI approach.
   */
  const auth = inject(AuthService);
  const notify = inject(NotificationsService);
  const router = inject(Router);

  /**
   * Forwards the request and intercepts any HTTP error response.
   */
  return next(req).pipe(
    catchError((err: unknown) => {
      /**
       * Handles HTTP-related errors.
       */
      if (err instanceof HttpErrorResponse) {
        /**
         * Network or connection error (no response from server).
         * Typically occurs when the backend is down or unreachable.
         */
        if (err.status === 0) {
          notify.error('No connection.');
          return throwError(() => err);
        }

        /**
         * Unauthorized error (401).
         * Indicates that the authentication token is invalid or expired.
         * The user is logged out and redirected to the login page.
         */
        if (err.status === 401) {
          auth.logout();
          notify.error('Session expired. Please log in again.');
          router.navigateByUrl('/login');
          return throwError(() => err);
        }

        /**
         * Forbidden error (403).
         * The user is authenticated but does not have permission
         * to perform the requested action.
         */
        if (err.status === 403) {
          notify.error('You do not have permission to perform this action.');
          return throwError(() => err);
        }

        /**
         * Handles all other HTTP errors.
         * Uses the backend-provided message when available,
         * otherwise falls back to a generic error message.
         */
        notify.error(err.error?.message ?? `Error (${err.status}).`);
      } else {
        /**
         * Handles unexpected or non-HTTP errors.
         */
        notify.error('Unexpected error.');
      }

      /**
       * Rethrows the error so that downstream subscribers
       * can react if needed.
       */
      return throwError(() => err);
    }),
  );
};
