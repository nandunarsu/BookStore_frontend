import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup ;
  signupForm!: FormGroup;
  loginSignupOpt:boolean = false;
  hide = true;

  constructor(private formBuilder:FormBuilder,private userService:UserService,private httpService:HttpService,@Inject(MAT_DIALOG_DATA)private data: {val: string},private route:Router,public dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
  } );

    this.signupForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    });
  }
  get loginControl() { return this.loginForm.controls; }

  get signupControl() {
    return this.signupForm.controls;
  }

  getErrorMessage(controlName: string) {
    const control = this.signupForm.get(controlName);
    if (control?.hasError('required')) {
      return 'You must enter a value';
    }
    if (controlName === 'email' && control?.hasError('email')) {
      return 'Not a valid email';
    }
    if (controlName === 'mobileNumber' && control?.hasError('pattern')) {
      return 'Invalid mobile number';
    }
    return '';
  }

  activeTab: string = 'login';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  login() {

    this.dialogRef.close();
    const { email, password } = this.loginForm.value;
    this.userService.loginApi({
      email: email,
      password: password
    }).subscribe((res:any)=>{
      localStorage.setItem("AuthToken",res.data)
      // this.route.navigate([''])
        if(this.data.val!='placeOrder')
        {
          window.location.reload();
        }
      });
    
  }

  signupmeth() {
    if (this.signupForm.valid) {
      const { fullName, email, password, mobileNumber } = this.signupForm.value;
      console.log(fullName, email, password, mobileNumber);
      
    }
  }

  goToLogin() {
    this.activeTab = 'login';
  }

  goToSignUp() {
    this.activeTab = 'signup';
  }

}
