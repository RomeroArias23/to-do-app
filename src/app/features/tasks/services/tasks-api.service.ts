import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Task } from '../../../shared/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksApiService {
  /**
   * In-memory data store that simulates a backend database.
   * This allows the application to behave as if it were
   * communicating with a real REST API.
   */
  private tasks: Task[] = [
    {
      id: '1',
      title: 'Learn Angular basics',
      description: 'Components, services, routing',
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Implement interceptors',
      description: 'Auth and error handling',
      status: 'done',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  /**
   * GET /tasks
   * Returns the full list of tasks.
   * A small delay is added to simulate network latency.
   */
  getTasks(): Observable<Task[]> {
    return of(this.tasks).pipe(delay(200));
  }

  /**
   * GET /tasks/:id
   * Retrieves a single task by its identifier.
   * Returns undefined if the task does not exist.
   */
  getTaskById(id: string): Observable<Task | undefined> {
    const task = this.tasks.find(t => t.id === id);
    return of(task).pipe(delay(150));
  }

  /**
   * POST /tasks
   * Creates a new task using the provided title and description.
   * The task is initialized with a "pending" status and timestamps.
   */
  createTask(
    input: Pick<Task, 'title' | 'description'>
  ): Observable<Task> {
    const now = new Date().toISOString();

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: input.title,
      description: input.description,
      status: 'pending',
      createdAt: now,
      updatedAt: now,
    };

    // Prepend the new task to simulate latest-first ordering
    this.tasks = [newTask, ...this.tasks];

    return of(newTask).pipe(delay(150));
  }

  /**
   * PATCH /tasks/:id
   * Partially updates an existing task.
   * Only title, description, or status can be modified.
   * Returns the updated task or undefined if not found.
   */
  updateTask(
    id: string,
    patch: Partial<Pick<Task, 'title' | 'description' | 'status'>>
  ): Observable<Task | undefined> {
    const now = new Date().toISOString();
    let updated: Task | undefined;

    this.tasks = this.tasks.map(t => {
      if (t.id !== id) return t;

      updated = { ...t, ...patch, updatedAt: now };
      return updated!;
    });

    return of(updated).pipe(delay(150));
  }

  /**
   * DELETE /tasks/:id
   * Removes a task from the in-memory store.
   * Returns true if a task was deleted, false otherwise.
   */
  deleteTask(id: string): Observable<boolean> {
    const before = this.tasks.length;
    this.tasks = this.tasks.filter(t => t.id !== id);

    return of(this.tasks.length < before).pipe(delay(150));
  }
}