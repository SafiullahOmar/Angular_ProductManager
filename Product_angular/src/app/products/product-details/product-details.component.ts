import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styles: [
  ]
})
export class ProductDetailsComponent implements OnInit {

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
  }

}
