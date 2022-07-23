import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountServicesService } from '../service/account-services.service';
import{BsModalRef,BsModalService} from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  insertForm!: FormGroup;
  userName!: FormControl;
  password!: FormControl;
  cPassword!: FormControl;
  email!: FormControl;
  modalRef!:BsModalRef;
  errorList!:string[];
  @ViewChild('template') modal!:TemplateRef<any>;
  constructor(private account: AccountServicesService, private fb: FormBuilder, 
    private route: Router,private bsModalService:BsModalService) { }

  ngOnInit(): void {
    this.userName = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required]);
    this.cPassword = new FormControl('', [Validators.required, this.MustMatch(this.password)]);
    this.errorList=[];
    this.insertForm=this.fb.group({
      'userName':this.userName,
      'password':this.password,
      'email':this.email,
      'cPassword':this.cPassword
    });
  }

  MustMatch(passwordControl: AbstractControl): ValidatorFn {
    return (cPasswordControl: AbstractControl): { [key: string]: boolean } | null => {
      if (!passwordControl && !cPasswordControl) {
        return null;
      }
      if (passwordControl.hasError && !cPasswordControl.hasError) {
        return null;
      }
      if (cPasswordControl.value !== passwordControl.value) {
        return { 'mustMatch': true };
      } else {
        return null;
      }
    }
  }

  onSubmit(){
    let userDetails=this.insertForm.value;
    this.account.register(userDetails.userName,userDetails.password,userDetails.email).subscribe(res=>{
      this.route.navigate(['/login']);
    },error=>{
      console.log('error');
    });
   // this.modalRef=this.bsModalService.show(this.modal);
  }

}
