import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AccountServicesService } from '../service/account-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private account: AccountServicesService) { }
  inserForm!: FormGroup;
  UserName!: FormControl;
  Password!: FormControl;
  returnURL!: string;
  ngOnInit(): void {
  }

}
