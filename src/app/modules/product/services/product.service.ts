import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProductDto } from '../model/product.model';

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}
  requestProducts(): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(`${environment.apiUrl}/products`);
  }
}
