import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { LoginResponse, TokenBody } from '../models/auth.model';
import { Observable } from 'rxjs';
import { SKIP_AUTH } from '../constants/auth.constant';
import * as moment from 'moment';
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
          this.saveToken(response.token);
          this.isAuthenticated = true;
        })
      );
  }

  retrieveToken() {
    return localStorage.getItem(environment.tokenKey);
  }
  saveToken(token: string) {
    localStorage.setItem(environment.tokenKey, token);
  }

  tryToRestoreLogin(): boolean {
    try {
      const token = this.retrieveToken();
      if (token) {
        const tokenBody = token.split('.')[1];
        const decodedTokenData: TokenBody = JSON.parse(atob(tokenBody));
        console.log(decodedTokenData);
        if (!decodedTokenData.exp) {
          return this.isAuthenticated;
        }
        const expirationDate: moment.Moment = moment(
          new Date(decodedTokenData.exp * 1000)
        );
        if (expirationDate.isBefore(moment())) {
          return this.isAuthenticated;
        }
        this.isAuthenticated = true;
      }
    } catch (error) {
      this.isAuthenticated = false;
    }
    return this.isAuthenticated;
  }
}
