import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login.module.routing';
import { LoginComponent } from './components/login/login.component';
import {
  NzFormModule,
  NzInputModule,
  NzButtonModule,
  NzCheckboxModule,
  NzMessageModule,
} from 'ng-zorro-antd';
import { ReactiveFormsModule } from '@angular/forms';
const components = [LoginComponent];
@NgModule({
  declarations: [components],
  imports: [
    LoginRoutingModule,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzCheckboxModule,
    NzMessageModule,
  ],
})
export class LoginModule {}
