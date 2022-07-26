import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountServicesService } from '../service/account-services.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  constructor(private service:AccountServicesService,private productService:ProductService) { }

  loginStatus$!:Observable<boolean>;
  userName$!:Observable<string|null>;


  ngOnInit(): void {
    this.loginStatus$=this.service.getIsloggIn;
    this.userName$=this.service.getUserName; 
  }

  onLogout(){
    this.productService.clearCache(); 
    this.service.logOut();

  }

}
