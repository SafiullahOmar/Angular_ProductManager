import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../guards/auth-guard.service';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {path:"",component:ProductListComponent,canActivate:[AuthGuardService]},
  {path:"product-list",component:ProductListComponent,canActivate:[AuthGuardService]},
  {path:":id",component:ProductDetailsComponent ,canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[
    AuthGuardService
  ]
})
export class ProductsRoutingModule { }
