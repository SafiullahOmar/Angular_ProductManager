
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject, subscribeOn } from 'rxjs';
import { Observable } from 'rxjs';
import { product } from 'src/app/service/product';
import { ProductService } from 'src/app/service/product.service';


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

//update 
updateForm?:FormGroup;
_name?:FormControl;
_price?:FormControl;
_description?:FormControl;
_imgURL?:FormControl;
_id?:FormControl;

//add modal

@ViewChild('template') modal!:TemplateRef<any>;

// update

@ViewChild('editTemplate') editmodal!:TemplateRef<any>;

//modal properties
modalMessage?:string;
modalRef!:BsModalRef;
selectedProduct?:product;
product$!:Observable<product[]>;
products:product[]=[];
userRoleStatus?:string;

dtOptions: DataTables.Settings = {};
dtTrigger:Subject<any>=new Subject();

@ViewChild(DataTableDirective) dtElement!:DataTableDirective;
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
     this.dtOptions={
      pagingType:'full _numbers',
      pageLength:5,
      autoWidth:true,
      order:[[0,'desc']]
     }

     this.product$=this.productService.getproducts();
     this.product$.subscribe(res=>{
      this.products=res;
      this.dtTrigger.next(this.products);
     });
  }

}
