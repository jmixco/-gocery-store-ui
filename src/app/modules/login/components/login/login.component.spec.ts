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
import { LoginResponse } from 'src/app/modules/core/models/auth.model';
import { click } from 'src/test-helpers/click-helper';
import { cold, getTestScheduler } from 'jasmine-marbles';

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

    triggerComponentInit(fixture);
    fillLoginForm(fixture, testUser, testPassword);

    const { userName, password } = component.form.value;
    expect(userName).toBe(testUser);
    expect(password).toBe(testPassword);
  }));

  it('should render form validation messages when controls are not valid', fakeAsync(() => {
    const componentDebug: DebugElement = fixture.debugElement;
    const componentEl: HTMLElement = componentDebug.nativeElement;

    triggerComponentInit(fixture);

    fillLoginForm(fixture, '', '');

    const componentTemplate = componentEl.textContent;
    expect(componentTemplate.includes('Please input your username!')).toBe(
      true
    );
    expect(componentTemplate.includes('Please input your Password!')).toBe(
      true
    );

    const submitDe = componentDebug.query(By.css('.login-form-button'));
    expect(submitDe.properties.disabled).toBe(true);
  }));

  it('should call login when submit button is clicked', fakeAsync(() => {
    const testUser = 'testUser';
    const testPassword = 'testPassword';
    const loginResponse: LoginResponse = { token: 'testToken' };
    authServiceSpy.login.and.returnValue(cold('---x|', { x: loginResponse }));

    triggerComponentInit(fixture);
    fillLoginForm(fixture, testUser, testPassword);
    sumbitForm(fixture);

    expect(component.isLoading).toBe(
      true,
      'spinner should be shown while performing the login'
    );
    expect(authServiceSpy.login.calls.count()).toBe(
      1,
      'login should be called'
    );

    const loginSpy = authServiceSpy.login;
    const loginCall = loginSpy.calls.first();
    expect(loginCall.args[0]).toBe(testUser);
    expect(loginCall.args[1]).toBe(testPassword);

    getTestScheduler().flush();
    fixture.detectChanges();
    expect(component.isLoading).toBe(
      false,
      'should hide loader after request has finished'
    );
    expect(nzMessageSpy.success.calls.count()).toBe(
      1,
      'success message should be called'
    );
    expect(nzMessageSpy.success.calls.first().args[0]).toBe(
      'Sucessfully Logged In'
    );
    expect(routerSpy.navigate.calls.count()).toBe(
      1,
      'navigate should be called'
    );
    expect(routerSpy.navigate.calls.first().args[0]).toEqual(
      ['/'],
      'should navigate to /'
    );
  }));

  it('should display an error when login failed', fakeAsync(() => {
    const testUser = 'testUser';
    const testPassword = 'testPassword';
    const loginResponse: LoginResponse = { token: 'testToken' };

    authServiceSpy.login.and.returnValue(cold('---#|', { x: loginResponse }));

    triggerComponentInit(fixture);
    fillLoginForm(fixture, testUser, testPassword);
    sumbitForm(fixture);

    expect(component.isLoading).toBe(
      true,
      'spinner should be shown while performing the login'
    );
    expect(authServiceSpy.login.calls.count()).toBe(
      1,
      'login should be called'
    );

    getTestScheduler().flush();
    fixture.detectChanges();

    expect(component.isLoading).toBe(
      false,
      'should hide loader after request has finished'
    );
    expect(nzMessageSpy.error.calls.count()).toBe(
      1,
      'error message should be called'
    );
    expect(nzMessageSpy.error.calls.first().args[0]).toBe('Failed to Log In');
    expect(routerSpy.navigate.calls.count()).toBe(
      0,
      'navigate should be called'
    );
  }));
});

function triggerComponentInit(fixture: ComponentFixture<LoginComponent>) {
  const component = fixture.componentInstance;
  component.ngOnInit();
  tick();
  fixture.detectChanges();
  expect(component).toBeTruthy();
}

function fillLoginForm(
  fixture: ComponentFixture<LoginComponent>,
  testUser: string,
  testPassword: string
) {
  const component = fixture.componentInstance;
  const componentDebug: DebugElement = fixture.debugElement;
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
  tick();
  fixture.detectChanges();
}

function sumbitForm(fixture: ComponentFixture<LoginComponent>) {
  const component = fixture.componentInstance;
  const componentDebug: DebugElement = fixture.debugElement;

  const submitDe = componentDebug.query(By.css('.login-form-button'));

  expect(component.form.valid).toBe(true, 'form should be valid');
  click(submitDe.nativeElement);
}
