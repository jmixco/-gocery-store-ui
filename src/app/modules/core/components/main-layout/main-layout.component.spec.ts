import { TestBed, async } from '@angular/core/testing';
import { MainLayoutComponent } from './main-layout.component';

describe('MainLayoutComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainLayoutComponent],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(MainLayoutComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'grocery-store-ui'`, () => {
    const fixture = TestBed.createComponent(MainLayoutComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('grocery-store-ui');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(MainLayoutComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'Welcome to grocery-store-ui!'
    );
  });
});
