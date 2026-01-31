import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Task } from '../../../../shared/models/task.model';

/**
 * TaskCardComponent
 *
 * Presentational (dumb) component responsible for displaying
 * the visual representation of a single task.
 *
 * This component:
 * - Receives task data via @Input
 * - Emits user interactions via @Output events
 * - Does NOT contain business logic or data fetching
 *
 * Designed to be reusable and easy to test.
 */
@Component({
  selector: 'app-task-card',

  /**
   * Standalone component
   *
   * Uses Angular standalone APIs instead of NgModules
   * for better tree-shaking and simpler dependency management.
   */
  standalone: true,

  /**
   * Module dependencies required by the template
   */
  imports: [
    CommonModule,   // Structural directives like *ngIf, *ngFor
    RouterModule,   // RouterLink support inside the template
  ],

  /**
   * Externalized template and styles
   *
   * Keeps HTML, SCSS, and TypeScript clearly separated
   * for maintainability and readability.
   */
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent {

  /**
   * Task input data
   *
   * The task object to be rendered by the card.
   * Marked as required to ensure the component
   * is always used with valid data.
   */
  @Input({ required: true })
  task!: Task;

  /**
   * Toggle event
   *
   * Emitted when the user requests to toggle the task status
   * (e.g., pending ↔ done).
   *
   * Emits the task id so the parent component
   * can decide how to handle the state change.
   */
  @Output()
  toggle = new EventEmitter<string>();

  /**
   * Remove event
   *
   * Emitted when the user requests to delete the task.
   *
   * The actual deletion logic is delegated to
   * the parent container component.
   */
  @Output()
  remove = new EventEmitter<string>();
}
