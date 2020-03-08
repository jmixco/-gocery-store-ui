import { NgModule } from '@angular/core';
import { AuthService } from './services/auth.service';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
const components = [MainLayoutComponent];
const services = [AuthService];
@NgModule({
  declarations: [components],
  providers: [
    services,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  imports: [RouterModule, NgZorroAntdModule],
})
export class CoreModule {}
