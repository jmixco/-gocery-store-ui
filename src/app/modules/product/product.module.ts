import { NgModule } from '@angular/core';
import { ProductRoutingModule } from './product.module.routing';
import { CatalogComponent } from './components/catalog/catalog.component';
import { NzInputModule, NzButtonModule, NzMessageModule } from 'ng-zorro-antd';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './services/product.service';
const components = [CatalogComponent];
const services = [ProductService];
@NgModule({
  declarations: [components],
  imports: [
    ProductRoutingModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzInputModule,
    NzMessageModule,
  ],
  providers: [services],
})
export class ProductModule {}
