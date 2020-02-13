import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SKIP_AUTH } from '../constants/auth.constant';

export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const skipAuth = request.headers.get(SKIP_AUTH);
    request.headers.delete(SKIP_AUTH);
    if (skipAuth) {
      return next.handle(request);
    } else {
      if (!this.authService.isAuthenticated) {
        throw new Error(
          'Cannot send request to registered endpoint if the user is not authenticated.'
        );
      }
      const token = this.authService.retrieveToken();
      const authorizedRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(authorizedRequest);
    }
  }
}
