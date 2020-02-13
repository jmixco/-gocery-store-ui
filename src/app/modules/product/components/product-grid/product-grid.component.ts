import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-grid',
  templateUrl: 'product-grid.component.html',
  styleUrls: ['product-grid.component.scss'],
})
export class ProductGridComponent {
  @Input() products: ProductDto[];
}
