import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  private apiUrl = "http://localhost:3000/api/v1/customers/"; 
  private tokenKey = 'auth-token';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string, password: string }): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials)
      .pipe(
        map((response: { token: string; }) => {
          if (response && response.token) {
            localStorage.setItem(this.tokenKey, response.token);
            return true;
          } else {
            return false;
          }
        }),
        catchError((error: any) => {
          console.error('Login failed', error);
          return of(false);
        })
      );
  }

  register(user: any): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/register`, user)
      .pipe(
        map((response: { success: boolean; }) => {
          // Check the response from the server and return true if registration is successful
          return response.success === true;
        }),
        catchError((error: any) => {
          console.error('Registration failed', error);
          return of(false);
        })
      );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
