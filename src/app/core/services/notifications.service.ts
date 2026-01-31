import { Injectable } from '@angular/core';

/**
 * Notifications Service
 *
 * This service provides a centralized way to display user-facing
 * notifications such as errors, warnings, or success messages.
 *
 * In this simplified implementation, messages are logged to the console.
 * In a real-world application, this service would be integrated with
 * a UI notification system (e.g., toast/snackbar components).
 */
@Injectable({ providedIn: 'root' })
export class NotificationsService {

  /**
   * Displays an error notification.
   *
   * This method is typically called from HTTP interceptors,
   * guards, or components when an operation fails.
   *
   * @param message - Human-readable error message to present to the user
   */
  error(message: string): void {
    console.error('[Toast error]', message);
  }
}
