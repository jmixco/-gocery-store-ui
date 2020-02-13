import { NgModule } from '@angular/core';
import { ProductRoutingModule } from './product.module.routing';
import { CatalogComponent } from './components/catalog/catalog.component';
import {
  NzInputModule,
  NzButtonModule,
  NzMessageModule,
  NzIconModule,
  NzCardModule,
  NzAvatarModule,
} from 'ng-zorro-antd';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './services/product.service';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductGridComponent } from './components/product-grid/product-grid.component';
const components = [
  CatalogComponent,
  ProductCardComponent,
  ProductGridComponent,
];
const services = [ProductService];
@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzInputModule,
    NzMessageModule,
    NzIconModule,
    NzCardModule,
    NzAvatarModule,
  ],
  providers: [services],
})
export class ProductModule {}
