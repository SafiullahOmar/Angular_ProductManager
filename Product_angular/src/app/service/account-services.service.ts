import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountServicesService {
  private baseURLLogin: string = "/api/account/login";
  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private UserName = new BehaviorSubject<string | null>(localStorage.getItem('username'));
  private UserRole = new BehaviorSubject<string | null>(localStorage.getItem('userRole'));
  constructor(private http: HttpClient,private router:Router) { }

  login(username: string, password: string) {
    return this.http.post<any>(this.baseURLLogin, { username, password }).pipe(
      map(result=>{
        if(result.token && result){
          this.loginStatus.next(true);
          localStorage.setItem('loginStatus','1');
          localStorage.setItem('jwt',result.token);
          localStorage.setItem('loginStatus',result.userName);
          localStorage.setItem('userRole',result.userRole);
          localStorage.setItem('expiration',result.expiration);
        }

      })

    );
  }

  logOut(){
    this.loginStatus.next(false);
    localStorage.removeItem('loginStatus');
    localStorage.removeItem('jwt');
    localStorage.removeItem('loginStatus');
    localStorage.removeItem('userRole');
    localStorage.removeItem('expiration');
    this.router.navigate(['/login']);
  }

  get getIsloggIn(){
    return this.loginStatus.asObservable();
  }
  get getUserName(){
    return this.UserName.asObservable();
  }
  get getUserRole(){
    return this.UserRole.asObservable();
  }
  checkLoginStatus(): boolean {
    return false;
  }

}
