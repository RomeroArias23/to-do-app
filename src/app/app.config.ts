import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor, errorInterceptor } from './core/interceptors';

/**
 * Main application configuration object for Angular.
 * 
 * This config uses the standalone ApplicationConfig approach instead of NgModules.
 * It sets up the global providers for routing and HTTP client with interceptors.
 * 
 * Providers:
 * 1. `provideRouter(routes)`:
 *    - Configures Angular Router with the defined application routes.
 *    - Handles route navigation and lazy-loading of components.
 * 
 * 2. `provideHttpClient(withInterceptors([...]))`:
 *    - Registers Angular's HttpClient globally.
 *    - Attaches HTTP interceptors for all outgoing requests:
 *      - `authInterceptor`: automatically adds authentication tokens to requests.
 *      - `errorInterceptor`: handles HTTP errors, notifications, and unauthorized access.
 * 
 * Usage:
 * - This object is passed to Angular's `bootstrapApplication` to initialize
 *   the application with proper routing and HTTP request handling.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
  ],
};
