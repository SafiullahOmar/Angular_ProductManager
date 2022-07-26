import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styles: [
  ]
})
export class ProductListComponent implements OnInit {

insertForm!:FormGroup;
name?:FormControl;
price?:FormControl;
description?:FormControl;
imgURL?:FormControl;


updateForm?:FormGroup;
_name?:FormControl;
_price?:FormControl;
_description?:FormControl;
_imgURL?:FormControl;
_id?:FormControl;

  constructor() { }

  ngOnInit(): void {
  }

}
