import { Component } from '@angular/core';
import { AuthService } from './modules/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) {
    if (!this.authService.tryToRestoreLogin()) {
      this.router.navigate(['/auth/login']);
    }
  }
}
