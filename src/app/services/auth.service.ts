/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // Get the request token
  private getRequestToken(): Observable<string> {
    const url = `${environment.apiUrl}/authentication/token/new${environment.apiKey}`;
    return this.http.get<any>(url).pipe(
      map((response) => response.request_token),
      catchError(this.handleError),
    );
  }

  // Validate the request token with the user's credentials
  private validateRequestToken(requestToken: string): Observable<void> {
    const url = `${environment.apiUrl}/authentication/token/validate_with_login${environment.apiKey}`;
    const body = {
      username: environment.username,
      password: environment.password,
      request_token: requestToken,
    };
    return this.http.post<any>(url, body).pipe(
      map(() => {}),
      catchError(this.handleError),
    );
  }

  // Create a session ID
  private createSession(requestToken: string): Observable<string> {
    const url = `${environment.apiUrl}/authentication/session/new${environment.apiKey}`;
    const body = { request_token: requestToken };
    return this.http.post<any>(url, body).pipe(
      map((response) => response.session_id),
      catchError(this.handleError),
    );
  }

  // Get account details to retrieve accountId
  private getAccountId(sessionId: string): Observable<number> {
    const url = `${environment.apiUrl}/account${environment.apiKey}&session_id=${sessionId}`;
    return this.http.get<any>(url).pipe(
      map((response) => response.id),
      catchError(this.handleError),
    );
  }

  // Public method to get accountId
  public authenticateAndGetAccountId(): Observable<any> {
    return this.getRequestToken().pipe(
      switchMap((requestToken) =>
        this.validateRequestToken(requestToken).pipe(
          switchMap(() => this.createSession(requestToken)),
          switchMap((sessionId) =>
            this.getAccountId(sessionId).pipe(
              map((accountId) => ({ accountId, sessionId })),
            ),
          ),
        ),
      ),
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
