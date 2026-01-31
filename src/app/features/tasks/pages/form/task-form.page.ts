import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { switchMap, of } from 'rxjs';

import { TasksApiService } from '../../services/tasks-api.service';
import { Task } from '../../../../shared/models/task.model';

/**
 * Page component responsible for creating and editing tasks.
 *
 * It supports two modes:
 * - Create mode: no `id` is present in the route
 * - Edit mode: an `id` is present in the route
 *
 * The mode is determined dynamically based on route parameters.
 */
@Component({
  standalone: true,
  selector: 'app-task-form-page',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './task-form.page.html',
  styleUrls: ['./task-form.page.scss'],
})
export class TaskFormPage implements OnInit {

  /** Dependency injection using the `inject()` API */
  private fb = inject(FormBuilder);
  private api = inject(TasksApiService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  /** Indicates whether the form is in edit mode */
  isEditMode = false;

  /** Task identifier used when editing an existing task */
  taskId?: string;

  /**
   * Typed reactive form definition
   * - title: required field
   * - description: optional field
   */
  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: [''],
  });

  /**
   * Component initialization logic:
   * - Reads route parameters
   * - Checks for the presence of an `id`
   * - If an `id` exists, switches to edit mode
   * - Fetches the task data and pre-fills the form
   */
  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          const id = params.get('id');

          // No id present → create mode
          if (!id) return of(null);

          // Id present → edit mode
          this.isEditMode = true;
          this.taskId = id;

          return this.api.getTaskById(id);
        })
      )
      .subscribe(task => {
        if (!task) return;

        // Populate the form with existing task data
        this.form.patchValue({
          title: task.title,
          description: task.description,
        });
      });
  }

  /**
   * Handles form submission:
   * - Validates the form
   * - Decides between create or update based on the mode
   * - Navigates back to the task list after success
   */
  submit() {
    if (this.form.invalid) return;

    const value = this.form.getRawValue();

    const action$ =
      this.isEditMode && this.taskId
        ? this.api.updateTask(this.taskId, value)
        : this.api.createTask(value);

    action$.subscribe(() => {
      this.router.navigate(['/tasks']);
    });
  }

  /**
   * Cancels the current action and navigates back to the task list
   */
  cancel() {
    this.router.navigate(['/tasks']);
  }
}