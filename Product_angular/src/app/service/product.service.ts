import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, flatMap, Observable, shareReplay } from 'rxjs';
import { product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseURL: string = "https://localhost:44362/api/Products/";
  private products!: Observable<product[]> | null;
  constructor(private http: HttpClient) { }
  getproducts(): Observable<product[]> {
    if (!this.products) {
      this.products = this.http.get<product[]>(this.baseURL + 'GetProducts').pipe(shareReplay());
    }
    return this.products;
  }
  getProductById(id: number): Observable<product> {
    return this.getproducts().pipe(flatMap(result => result), first(product => product.productId == id));

  }
  insertProduct(newProduct: product) {
    return this.http.post<product>(this.baseURL + "AddProduct", newProduct);
  }
  updateProduct(id: number, editProduct: product): Observable<product> {
    return this.http.put<product>(this.baseURL + "UpdateProduct/" + id, editProduct);
  }
  deleteProduct(id: number) {
    return this.http.delete(this.baseURL + "DeleteProduct/" + id);
  }

  clearCache() {
    this.products = null;
  }
}

