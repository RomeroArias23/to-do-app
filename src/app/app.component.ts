import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Root application component.
 * 
 * This is the main entry point of the Angular application. It serves
 * as a container for all routed views using the Angular RouterOutlet.
 * 
 * Standalone Component:
 * - Uses Angular's standalone component approach (no NgModule required).
 * 
 * Template:
 * - Contains only a <router-outlet /> which dynamically loads
 *   components based on the active route.
 * 
 * Usage:
 * - Acts as the shell of the application.
 * - All feature pages and components will be rendered within this component
 *   according to the configured routes.
 */
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    template: `<router-outlet />`
})
export class AppComponent {}