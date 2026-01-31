import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, Subject, switchMap, startWith } from 'rxjs';

import { TasksApiService } from '../../services/tasks-api.service';
import { TaskCardComponent } from '../../components/task-card/task-card.component';
import { Task } from '../../../../shared/models/task.model';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-tasks-list-page',
  imports: [CommonModule, RouterModule, TaskCardComponent],
  templateUrl: './tasks-list.page.html',
  styleUrls: ['./tasks-list.page.scss'],
})
export class TasksListPage {
  /* --- Dependencies ---
     Services are injected using Angular's inject() function
     to keep the component constructor clean and explicit. */
  private api = inject(TasksApiService);
  private auth = inject(AuthService);

  /* --- Refresh trigger ---
     Subject used to explicitly re-fetch tasks after
     create, update, or delete operations. */
  private refresh$ = new Subject<void>();

  /* --- Tasks stream ---
     Emits the task list on initialization and whenever
     refresh$ emits. This keeps data fetching reactive
     and avoids manual state management. */
  tasks$: Observable<Task[]> = this.refresh$.pipe(
    startWith(void 0),              // Triggers initial load
    switchMap(() => this.api.getTasks())
  );

  /* --- Authentication state ---
     Exposed as a function to keep templates simple and
     always reflect the latest auth state. */
  isLoggedIn = () => this.auth.isLoggedIn();

  /* --- trackBy function ---
     Optimizes ngFor rendering by tracking tasks by id
     instead of by object reference. */
  trackById = (_: number, task: Task) => task.id;

  /* --- Toggle task status ---
     1. Fetches the current task
     2. Determines the next status (pending ↔ done)
     3. Updates the task
     4. Refreshes the task list */
  onToggle(id: string) {
    this.api.getTaskById(id).pipe(
      switchMap(task => {
        if (!task) return this.api.getTasks();

        const nextStatus =
          task.status === 'done' ? 'pending' : 'done';

        return this.api.updateTask(id, { status: nextStatus }).pipe(
          switchMap(() => this.api.getTasks())
        );
      })
    ).subscribe(() => this.refresh$.next());
  }

  /* --- Delete task ---
     Removes a task by id and refreshes the list
     once the operation completes. */
  onDelete(id: string) {
    this.api.deleteTask(id).subscribe(() => this.refresh$.next());
  }

  /* --- Demo helper ---
     Creates a sample task directly from the UI.
     Useful for demos, testing, or interviews. */
  createDemoTask() {
    this.api
      .createTask({
        title: 'Nueva tarea',
        description: 'Creada desde la UI',
      })
      .subscribe(() => this.refresh$.next());
  }

  /* --- Authentication actions ---
     Simple wrappers around the AuthService
     to demonstrate login/logout flows in the UI. */
  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }
}