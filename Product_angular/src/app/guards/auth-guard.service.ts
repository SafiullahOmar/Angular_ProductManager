import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AccountServicesService } from '../service/account-services.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private account: AccountServicesService,private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.account.getIsloggIn.pipe(take(1), map((loginStatus: boolean) => {
      const destination: string = state.url;
      const productId :any = route.params['id'];
      var returnValu:boolean=false;


      // To check if user is not logged in
      if (!loginStatus) {
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });

        return false;
      }

      

      // if the user is already logged in
      switch (destination) {
        case '/products':
        case '/products/' + productId:
          {
            if (localStorage.getItem("userRole") === "Customer" || localStorage.getItem("userRole") === "Admin" || localStorage.getItem("userRole") === "Moderator") {
              returnValu = true;
            }
            break;
          }

        case '/products/update':
          {
            if (localStorage.getItem("userRole") === "Customer" || localStorage.getItem("userRole") === "Moderator") {
              this.router.navigate(['/access-denied'])

              returnValu= false;
            }

            if (localStorage.getItem("userRole") === "Admin") {

              returnValu= true;
            }

            break;
          }

        default:
          returnValu= false;
      }

      return returnValu;

    }));


  }
}