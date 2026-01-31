import { Routes } from '@angular/router';

/**
 * Root-level routing configuration for the Angular application.
 * 
 * This array defines how top-level URL paths are handled and maps them
 * to specific modules or redirects. It supports lazy-loading for better performance.
 * 
 * Routes:
 * 1. `{ path: '', pathMatch: 'full', redirectTo: 'tasks' }`
 *    - When the URL is empty (base path), redirect to the `/tasks` route.
 *    - `pathMatch: 'full'` ensures the entire URL is matched before redirecting.
 * 
 * 2. `{ path: 'tasks', loadChildren: ... }`
 *    - Lazy-loads the Tasks feature module when navigating to `/tasks`.
 *    - Improves performance by loading feature code only when needed.
 *    - Dynamically imports `TASKS_ROUTES` from `tasks.routes.ts`.
 * 
 * 3. `{ path: '**', redirectTo: 'tasks' }`
 *    - Wildcard route to catch all unknown or unmatched URLs.
 *    - Redirects users back to the `/tasks` route as a fallback.
 * 
 * This configuration provides a clean, maintainable structure for routing
 * while supporting lazy-loading and default redirects.
 */
export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'tasks' },
    {
        path: 'tasks',
        loadChildren: () =>
            import('./features/tasks/tasks.routes').then(m => m.TASKS_ROUTES),
    },
    { path: '**', redirectTo: 'tasks' },
];
