import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}
  login(userName: string, password: string, remember: boolean) {
    return this.http
      .post(`${environment.apiUrl}/identity/login`, {
        email: userName,
        password,
      })
      .pipe(tap((response) => console.log(response)));
  }
}
