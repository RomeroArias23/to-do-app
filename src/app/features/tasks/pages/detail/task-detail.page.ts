import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { switchMap } from 'rxjs';

import { TasksApiService } from '../../services/tasks-api.service';
import { Task } from '../../../../shared/models/task.model';

/**
 * TaskDetailPage
 *
 * Standalone page component responsible for displaying
 * the details of a single task.
 *
 * The task is resolved dynamically based on the `id`
 * route parameter and retrieved via the Tasks API service.
 */
@Component({
  standalone: true,
  selector: 'app-task-detail-page',
  imports: [CommonModule, RouterModule],
  templateUrl: './task-detail.page.html',
  styleUrls: ['./task-detail.page.scss'],
})
export class TaskDetailPage {

  /**
   * ActivatedRoute instance
   *
   * Provides access to route parameters and route metadata.
   * Used here to read the dynamic `id` segment from the URL.
   */
  private route = inject(ActivatedRoute);

  /**
   * TasksApiService instance
   *
   * Encapsulates all task-related data access logic
   * (HTTP calls or mock persistence).
   */
  private api = inject(TasksApiService);

  /**
   * Selected task stream
   *
   * Reactively listens to route parameter changes and
   * fetches the corresponding task by its identifier.
   *
   * - Uses `paramMap` to safely access route parameters
   * - Uses `switchMap` to cancel previous requests if the route changes
   * - Returns `null` (or an empty stream) if no valid `id` is provided
   *
   * This observable is typically consumed in the template
   * using the `async` pipe.
   */
  task$ = this.route.paramMap.pipe(
    switchMap(params => {
      const id = params.get('id');

      return id
        ? this.api.getTaskById(id)
        : [];
    })
  );
}
