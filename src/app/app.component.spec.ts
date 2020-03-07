import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from './modules/core/services/auth.service';

describe('AppComponent', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', [
      'login',
      'retrieveToken',
      'saveToken',
      'tryToRestoreLogin',
    ]);
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        {
          provide: AuthService,
          useValue: authServiceSpy,
        },
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    authServiceSpy.tryToRestoreLogin.and.returnValue(true);
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should navigate to login if sesion was not restored', () => {
    authServiceSpy.tryToRestoreLogin.and.returnValue(false);
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
    expect(authServiceSpy.tryToRestoreLogin.calls.count()).toBe(
      1,
      'tryToRestoreLogin  called'
    );
    expect(routerSpy.navigate.calls.count()).toBe(1, 'navigate  called');
    expect(routerSpy.navigate.calls.first().args[0]).toEqual(
      ['/auth/login'],
      'should nave to login'
    );
  });
  it('should not navigate if sesion was restored', () => {
    authServiceSpy.tryToRestoreLogin.and.returnValue(true);
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
    expect(authServiceSpy.tryToRestoreLogin.calls.count()).toBe(
      1,
      'tryToRestoreLogin called'
    );
    expect(routerSpy.navigate.calls.count()).toBe(0, 'navigate not called');
  });
});
