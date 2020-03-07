import {
  fakeAsync,
  ComponentFixture,
  TestBed,
  tick,
} from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NzFormModule,
  NzButtonModule,
  NzInputModule,
  NzCheckboxModule,
  NzMessageModule,
  NzMessageService,
} from 'ng-zorro-antd';
import { AuthService } from 'src/app/modules/core/services/auth.service';
import { Router } from '@angular/router';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let nzMessageSpy: jasmine.SpyObj<NzMessageService>;

  beforeEach(fakeAsync(() => {
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', [
      'login',
      'retrieveToken',
      'saveToken',
      'tryToRestoreLogin',
    ]);
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
    nzMessageSpy = jasmine.createSpyObj<NzMessageService>('NzMessageService', [
      'success',
      'error',
    ]);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        NzFormModule,
        NzButtonModule,
        NzInputModule,
        NzCheckboxModule,
        NzMessageModule,
        IconsProviderModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        {
          provide: AuthService,
          useValue: authServiceSpy,
        },
        {
          provide: NzMessageService,
          useValue: nzMessageSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  }));

  it('should compile', async () => {
    expect(component).toBeTruthy();
  });
  it('should render the login form and be connected to the form', fakeAsync(() => {
    const testUser = 'testUser';
    const testPassword = 'testPassword';
    const componentDebug: DebugElement = fixture.debugElement;
    component.ngOnInit();
    fixture.detectChanges();
    tick();
    expect(component).toBeTruthy();

    const passwordDe = componentDebug.query(By.css('[name="password"]'));
    const userDe = componentDebug.query(By.css('[name="user"]'));
    const passwordEl: HTMLInputElement = passwordDe.nativeElement;
    const userEl: HTMLInputElement = userDe.nativeElement;
    expect(passwordDe).toBeTruthy();
    expect(userDe).toBeTruthy();

    userEl.value = testUser;
    passwordEl.value = testPassword;
    userEl.dispatchEvent(new Event('input'));
    passwordEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick();
    const { userName, password } = component.form.value;
    expect(userName).toBe(testUser);
    expect(password).toBe(testPassword);
  }));

  it('should render form validation messages when controls are not valid', fakeAsync(() => {
    const componentDebug: DebugElement = fixture.debugElement;
    const componentEl: HTMLElement = componentDebug.nativeElement;

    component.ngOnInit();
    fixture.detectChanges();
    tick();
    expect(component).toBeTruthy();

    const userDe = componentDebug.query(By.css('[name="user"]'));
    const passwordDe = componentDebug.query(By.css('[name="password"]'));
    const submitDe = componentDebug.query(By.css('.login-form-button'));
    const userEl: HTMLInputElement = userDe.nativeElement;
    const passwordEl: HTMLInputElement = passwordDe.nativeElement;

    expect(passwordDe).toBeTruthy();
    expect(userDe).toBeTruthy();

    userEl.value = '';
    passwordEl.value = '';
    userEl.dispatchEvent(new Event('input'));
    passwordEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick();
    const componentTemplate = componentEl.textContent;
    expect(componentTemplate.includes('Please input your username!')).toBe(
      true
    );
    expect(componentTemplate.includes('Please input your Password!')).toBe(
      true
    );
    expect(submitDe.properties.disabled).toBe(true);
  }));
});
