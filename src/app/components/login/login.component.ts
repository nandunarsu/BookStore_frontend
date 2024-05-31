import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/services/addressService/address.service';
import { BookService } from 'src/app/services/bookService/book.service';
import { CartService } from 'src/app/services/cartService/cart.service';
import { DataService } from 'src/app/services/dataService/data.service';
import { HttpService } from 'src/app/services/http/http.service';
import { OrderService } from 'src/app/services/orderService/order.service';
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
  cartlist:any;
  templist:any;
  addressList:any;
  bookList:any;

  constructor(private dataservice:DataService,private bookService:BookService,private cartService:CartService,private orderService:OrderService,private addressService:AddressService,@Inject(MAT_DIALOG_DATA)private data: {val: string},public dialogRef: MatDialogRef<LoginComponent>,private route:Router,private formBuilder:FormBuilder,private userService:UserService,private httpService:HttpService) { }
  
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
      this.route.navigate([''])
     // uncomment below one afterwards
        if(this.data.val!='placeOrder')
        {
          this.cartlist=this.data;
          this.templist=this.cartlist;
          console.log(this.templist);
           
            var v=localStorage.getItem('authToken')+'';
            
            this.cartService.getCartApi().subscribe(res => {
              this.cartlist = res
              this.cartlist= this.cartlist.filter((ele:any)=>{if(ele.quantity>0 && !ele.isUnCarted && !ele.isOrdered) return ele;})
                console.log(this.cartlist);
    
              console.log(this.updateCart(this.templist,this.cartlist,localStorage.getItem('AuthToken')));
              window.location.reload()
            },err=>console.log(err)
          )
          // window.location.reload();
        }

      });
    
  }
  updateCart(a: any, b: any,token?:any) {
    for (const itemA of a) {
      const itemB = b.find((item:any) => item.bookId === itemA.bookId);
      if (itemB) {
          itemB.quantity += itemA.quantity;
          this.cartService.updateQuantityToCartApiCall(itemB.cartId,itemB.quantity,token).subscribe(res=>console.log(res)
        )

      } else {
          b.push(itemA);
          this.cartService.addCartApi({bookId:itemA.bookId,quantity:itemA.quantity}).subscribe(res=>console.log(res)
          )
      }
  }
  return b;
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
