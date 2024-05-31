import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import { AddressService } from 'src/app/services/addressService/address.service';
import { BookService } from 'src/app/services/bookService/book.service';
import { CartService } from 'src/app/services/cartService/cart.service';
import { HttpService } from 'src/app/services/http/http.service';
import { OrderService } from 'src/app/services/orderService/order.service';
import { DROP_DOWN, LOCATION_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  orderaddress: any;
  order: boolean = true;
  orderId! : number;
  cartList!: any;
  editaddress: boolean = true;
  editadd: any = {};
  addressList: any[] = [];
  addressForm!: FormGroup;
  emptyAddress: any = { 
    addressId: null,
    name: '',
    mobileNumber: '',
    address: '',
    city: '',
    state: '',
    type: ''
  };

  
  constructor(private httpService:HttpService,private router:Router,private orderService:OrderService,private formbuilder:FormBuilder,iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,private cartService:CartService,private route:ActivatedRoute,private bookService:BookService,private addresService:AddressService) {
    iconRegistry.addSvgIconLiteral("location-icon", sanitizer.bypassSecurityTrustHtml(LOCATION_ICON));
    iconRegistry.addSvgIconLiteral("drop-down-icon", sanitizer.bypassSecurityTrustHtml(DROP_DOWN));    
  }

  loadAddresses() {
    this.addresService.getAddressApi().subscribe((res: any) => {
      if (res && res.data && Array.isArray(res.data)) {
        this.addressList = res.data;
      } else {
        console.error("Expected an array but got:", res);
      }
      console.log(this.addressList); // Debugging
    }, (err) => {
      console.error("Error loading addresses", err);
    });
  }
  handleaddress() {
    this.editaddress = false;
    if (this.addressForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    const userData = this.addressForm.value;

    if (this.editadd && this.editadd.addressId) {
      userData.addressId=this.editadd.addressId;
      this.addresService.editaddressApi(userData).subscribe(
        (res:any) => {
          console.log(res);
          this.loadAddresses();
          console.log("edited address",res);
        },
        (err:any) => console.log(err)
      );
    } else {
      console.log(userData);
      
      this.addresService.addaddressApi(userData).subscribe(
        res => {console.log(res);
          this.loadAddresses();
          console.log(res);
        },
        err => console.log(err)
      );
    }
  }

  editAddress(address: any) {
    this.editaddress = false;
    this.editadd = address;
    this.addressForm.patchValue({
      addressId:address.addressId,
      name: address.name,
      mobileNumber: address.mobileNumber,
      address: address.address,
      city: address.city,
      state: address.state,
      type: address.type,
      userId:address.userId
    });
  }

  removeAddress(addressId: number) {
    this.addresService.deleteaddressApi(addressId).subscribe(res => {
      this.loadAddresses();
    });
  }
  orderAddress(address: any) {
    this.order = false;
    this.orderaddress = address;
    console.log(this.orderaddress);
  }
  orderSummery() {
    this.order = false;
  }
  handleOrder() {
    const orderDate = new Date().toISOString().slice(0, 10);
    const orderBody = {
      addressId: this.orderaddress.addressId,
      orderDate: orderDate,
      bookId: this.cartList.bookId
    };
    this.httpService.addOrder(orderBody).subscribe((res:any) => {
      this.orderId = res.data[0];
      console.log(this.orderId);
      this.cartService.cartDeleteApi(this.cartList.cartId).subscribe(() => {
        this.router.navigate([`/order`, this.orderId]);
      }, err => {
        console.error('Error removing cart', err);
      });
    }, err => {
      console.error('Error adding order', err);
    });
  }


  ngOnInit(): void {
    if (localStorage.getItem('AuthToken') != null) {
      this.bookService.getBooksApi().subscribe((res1:any) => {
        this.cartList = res1
        console.log(this.cartList)
        this.cartList= this.cartList.filter((ele:any)=>{if(ele.quantity>0 && !ele.isUnCarted && !ele.isOrdered) return ele;})
          
        this.route.params.subscribe(res2 => {
          this.cartList = res1.filter((e:any) => e.bookId == res2['bookId'])[0]
          console.log(this.cartList);
        })
      });
      this.loadAddresses();
    }
     else {
      this.route.params.subscribe((result2) => {
        this.cartList = this.cartService.getCartApi().subscribe((res:any)=>{
        return res.filter((e: any) => e.cartId == result2['cartId'])[0];
        })
      });
    }
    this.addressForm = this.formbuilder.group({
      name: [this.emptyAddress.name, Validators.required],
      mobileNumber: [this.emptyAddress.mobileNumber, [Validators.required, Validators.pattern('[0-9]{10}')]],
      address: [this.emptyAddress.address, Validators.required],
      city: [this.emptyAddress.city, Validators.required],
      state: [this.emptyAddress.state, Validators.required],
      type: [this.emptyAddress.type, Validators.required]
    });
  }

}
