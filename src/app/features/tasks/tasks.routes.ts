import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

/**
 * Route configuration for the Tasks feature.
 * 
 * This file defines all child routes related to task management and
 * leverages Angular standalone components with lazy loading to
 * optimize bundle size and initial load performance.
 */
export const TASKS_ROUTES: Routes = [
  {
    /**
     * Base route: /tasks
     * 
     * Displays the list of all tasks.
     * This page is publicly accessible and does not require authentication.
     */
    path: '',
    loadComponent: () =>
      import('./pages/list/tasks-list.page').then(m => m.TasksListPage),
  },
  {
    /**
     * Route: /tasks/new
     * 
     * Displays the task creation form.
     * Access is protected by the authGuard to ensure only authenticated
     * users can create new tasks.
     */
    path: 'new',
    canActivate: [authGuard],
    loadComponent: () =>
      import('../tasks/pages/form/task-form.page').then(m => m.TaskFormPage),
  },
  {
    /**
     * Route: /tasks/:id
     * 
     * Displays the details of a specific task identified by its ID.
     * The task ID is extracted from the route parameters.
     */
    path: ':id',
    loadComponent: () =>
      import('../tasks/pages/detail/task-detail.page').then(m => m.TaskDetailPage),
  },
];