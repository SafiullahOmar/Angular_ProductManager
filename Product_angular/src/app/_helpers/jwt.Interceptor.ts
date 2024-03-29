import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';
import { AccountServicesService } from '../service/account-services.service';

@Injectable({
  providedIn: 'root'
})


export class JwtInterceptor implements HttpInterceptor {

    constructor (private acct : AccountServicesService) {}

    intercept(request : HttpRequest<any>, next : HttpHandler): Observable<HttpEvent<any>> 
    {
        // add authorization header with jwt token if available
        let currentuser = this.acct.getIsloggIn;
        let token = localStorage.getItem('jwt');

        if (currentuser && token !== undefined) 
        {
            request = request.clone({
                setHeaders: 
                {
                     Authorization: `Bearer ${token}` 
                    
                }
            });
        }

        return next.handle(request);
    }
}