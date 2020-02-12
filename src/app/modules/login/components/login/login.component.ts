import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/modules/core/services/auth.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }

  submitForm(): void {
    console.log('submit');
    this.form.markAsDirty();
    this.form.updateValueAndValidity();
    if (this.form.valid) {
      const { userName, password, remember } = this.form.value;
      this.authService.login(userName, password, remember).subscribe(
        (response) => {
          this.message.success('Sucessfully Logged In');
        },
        (err) => {
          this.message.error('Failed to Log In');
          console.error(err);
        }
      );
    }
  }
}
