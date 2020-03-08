import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProductDto } from '../../model/product.model';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
})
export class CatalogComponent {
  products$: Observable<ProductDto[]>;
  constructor(private productService: ProductService) {
    this.products$ = this.productService.requestProducts().pipe(
      tap((products) => {
        products.sort((prev, next) => {
          return prev.name.localeCompare(next.name);
        });
      })
    );
  }
}
