import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountServicesService } from '../service/account-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private account: AccountServicesService,private router:Router,private activatedrt:ActivatedRoute,private fb:FormBuilder) { }
  insertForm!: FormGroup;
  UserName!: FormControl;
  Password!: FormControl;
  returnURL!: string;
  ErrorMessage!:string;
  invalidLogin!:boolean;
  ngOnInit(): void {
    this.UserName=new FormControl('',[Validators.required]);
    this.Password=new FormControl('',[Validators.required]);
    this.returnURL=this.activatedrt.snapshot.queryParams['returnURL']||'/';
    this.insertForm=this.fb.group({
      "UserName":this.UserName,
      "Password":this.Password
    });
  }

  onSubmit(){
    let userLogin=this.insertForm.value;
    this.account.login(userLogin.UserName,userLogin.Password).subscribe((res)=>{
     // let token=res.token;
     // console.log(token);
      this.invalidLogin=false;
      this.router.navigateByUrl(this.returnURL);

    },(error)=>{

      this.invalidLogin=true;
      this.ErrorMessage="invalid details";
    });    
  }

}
