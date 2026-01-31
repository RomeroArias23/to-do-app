import { Injectable, signal } from '@angular/core';

/**
 * Authentication Service
 *
 * This service is responsible for managing authentication state
 * and access token handling on the client side.
 *
 * It uses Angular Signals to store reactive authentication data.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  /**
   * Reactive flag that indicates whether the user is authenticated.
   */
  private _isLoggedIn = signal<boolean>(true);

  /**
   * Reactive storage for the access token.
   * This is a demo token used for development purposes.
   * In a real application, this token would come from a backend API.
   */
  private _accessToken = signal<string>('demo-token-12345');

  /**
   * Returns the current authentication status.
   */
  isLoggedIn(): boolean {
    return this._isLoggedIn();
  }

  /**
   * Returns the current access token if the user is authenticated.
   * This method is used by HTTP interceptors to attach the token
   * to outgoing requests.
   */
  getAccessToken(): string | null {
    return this._isLoggedIn() ? this._accessToken() : null;
  }

  /**
   * Manually sets the access token.
   * Useful for scenarios such as token refresh or external authentication.
   */
  setAccessToken(token: string): void {
    this._accessToken.set(token);
  }

  /**
   * Simulates a login process.
   * In a real application, this method would call the backend,
   * validate credentials, and receive a JWT or access token.
   */
  login(): void {
    this._isLoggedIn.set(true);
    this._accessToken.set('demo-token-' + Date.now());
  }

  /**
   * Logs the user out by clearing authentication state
   * and removing the stored access token.
   */
  logout(): void {
    this._isLoggedIn.set(false);
    this._accessToken.set('');
  }
}
