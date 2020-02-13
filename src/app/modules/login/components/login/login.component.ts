import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/modules/core/services/auth.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }

  submitForm(): void {
    this.isLoading = true;
    console.log('submit');
    this.markFormAsDirty();

    if (this.form.valid) {
      const { userName, password, remember } = this.form.value;
      this.authService.login(userName, password, remember).subscribe(
        (response) => {
          this.message.success('Sucessfully Logged In');
          this.router.navigate(['/']);
        },
        (err) => {
          this.isLoading = false;

          this.message.error('Failed to Log In');
          console.error(err);
        }
      );
    }
  }

  private markFormAsDirty() {
    this.form.markAsDirty();
    this.form.updateValueAndValidity();
    if (this.form.controls) {
      for (const controlName of Object.keys(this.form.controls)) {
        const control = this.form.get(controlName);
        control.markAsDirty();
        control.updateValueAndValidity();
      }
    }
  }
}
