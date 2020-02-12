import { NgModule } from '@angular/core';
import { AuthService } from './services/auth.service';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
const components = [MainLayoutComponent];
const services = [AuthService];
@NgModule({
  declarations: [components],
  providers: [services],
  imports: [RouterModule, NgZorroAntdModule],
})
export class CoreModule {}
