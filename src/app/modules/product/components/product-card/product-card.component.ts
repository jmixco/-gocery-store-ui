import { Component, Input } from '@angular/core';
import { ProductDto } from '../../model/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: 'product-card.component.html',
  styleUrls: ['product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product: ProductDto;
}
