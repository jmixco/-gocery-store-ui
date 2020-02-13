import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { LoginResponse } from '../models/auth.model';
import { Observable } from 'rxjs';
import { SKIP_AUTH } from '../constants/auth.constant';

@Injectable()
export class AuthService {
  isAuthenticated = false;
  constructor(private http: HttpClient) {}
  login(
    userName: string,
    password: string,
    remember: boolean
  ): Observable<LoginResponse> {
    const headers = new HttpHeaders({
      [SKIP_AUTH]: JSON.stringify(true),
    });
    return this.http
      .post<LoginResponse>(
        `${environment.apiUrl}/identity/login`,
        {
          email: userName,
          password,
        },
        {
          headers,
        }
      )
      .pipe(
        tap((response) => {
          localStorage.setItem(environment.tokenKey, response.token);
          this.isAuthenticated = true;
        })
      );
  }

  retrieveToken() {
    return localStorage.getItem(environment.tokenKey);
  }
}
