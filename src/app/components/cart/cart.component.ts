import { Component, OnInit, Sanitizer } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cartService/cart.service';
import { DataService } from 'src/app/services/dataService/data.service';
import { LoginComponent } from '../login/login.component';
import { LOCATION_ICON } from 'src/assets/svg-icons';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from 'src/app/services/addressService/address.service';
import { OrderService } from 'src/app/services/orderService/order.service';
import { WishListService } from 'src/app/services/wishListService/wish-list.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartList:any=[]
  orders:any;
  order: boolean = true;
  editaddress: boolean = true;
  editadd: any = {};
  addressList: any[] = [];
  addressForm!: FormGroup;
  orderaddress: any;
  placeorder: boolean=true;
  emptyAddress: any = { 
    addressId: null,
    name: '',
    mobileNumber: '',
    address: '',
    city: '',
    state: '',
    type: ''
  };

  constructor(private dialog: MatDialog,private route:Router,private orderService:OrderService,private addresService:AddressService,private formbuilder:FormBuilder,iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,private cartService:CartService,private matDialog:MatDialog, private router:ActivatedRoute,private dataService:DataService) { 
    iconRegistry.addSvgIconLiteral("location-icon", sanitizer.bypassSecurityTrustHtml(LOCATION_ICON));
  }

  handleBook() {
    this.route.navigate(["dashboard/book"]);
  }
  
 
  ngOnInit(): void {
    // if (localStorage.getItem('AuthToken') != null) {
       this.cartService.getCartApi().subscribe((result1:any) => {
         //this.dataService.currCartList.subscribe((result1:any) => {
          console.log("cartresult",result1);
          
          this.cartList = result1.data.filter((e: any) => e.quantity >= 1);
          console.log("km",this.cartList);
      });
      this.loadAddresses();
    // }
    //  else {
    //    this.cartList = this.dataService.currCartList.subscribe((res:any) => res.quantity >= 1);
    // }

    this.addressForm = this.formbuilder.group({
      name: [this.emptyAddress.name, Validators.required],
      mobileNumber: [this.emptyAddress.mobileNumber, [Validators.required, Validators.pattern('[0-9]{10}')]],
      address: [this.emptyAddress.address, Validators.required],
      city: [this.emptyAddress.city, Validators.required],
      state: [this.emptyAddress.state, Validators.required],
      type: [this.emptyAddress.type, Validators.required]
    });
  }

  increaseCount(book:any) {
    if (localStorage.getItem('AuthToken') != null) {
      this.cartService.updateQuantityToCartApiCall(book.bookId,++book.quantity).subscribe(res =>{
        this.cartService.getCartApi().subscribe((updatedCartData:any) => {
          this.cartService.changeState(updatedCartData.data);
        });
    },err => console.log(err)
    )}
    else{
      this.dataService.cartItems.forEach((cartItem: any) => {
        if (cartItem.bookId === book.bookId) {
            cartItem.bookQuantity = ++cartItem.quantity;
        }
      });  
    }
  }
  decreaseCount(book:any) {
    if (book.quantity > 1) {
      if (localStorage.getItem('AuthToken') != null) {
        this.cartService.updateQuantityToCartApiCall(book.bookId,--book.quantity).subscribe(res =>{
          this.cartService.getCartApi().subscribe((updatedCartData:any) => {
            this.cartService.changeState(updatedCartData.data);
          });
      },err => console.log(err)
      )}
      else{
        this.dataService.cartItems.forEach((cartItem: any) => {
        if (cartItem.bookId === book.bookId) {
            cartItem.bookQuantity = --cartItem.quantity;
        }
        });  
      }
    }
  }

  placeOrder(){
    if (localStorage.getItem('AuthToken') != null)this.placeorder=false;
    else {
      const dialogRef = this.dialog.open(LoginComponent, { width: '720px', height: '480px' });
      dialogRef.afterClosed().subscribe((result:any) => {});
      this.loadAddresses();

    }
  }

  removeCart(book:any){
    if (localStorage.getItem('AuthToken') != null) {
      this.cartList=this.cartList.filter((res:any)=> book.cartId != res.cartId)
    this.cartService.cartDeleteApi(book.cartId).subscribe((res:any) =>{
      this.cartService.getCartApi().subscribe((updatedCartData:any) => {
        this.cartService.changeState(updatedCartData.data);
      });
    },err => console.log(err)
    )}
    else{
      this.dataService.cartItems = this.dataService.cartItems.filter((cartItem:any) => cartItem.bookId !== book.bookId); 
    }
  }

  loadAddresses() {
    
      this.addresService.getAddressApi().subscribe((res:any) => {
      this.addressList = res.data;
    });
  }

  handleAddress() {
    if (this.addressForm.invalid) {
      console.log('Form is invalid');return;
    }
    const userData = this.addressForm.value;
    if (this.editadd && this.editadd.addressId) {
      userData.addressId = this.editadd.addressId;
      this.addresService.editaddressApi(userData).subscribe((res: any) => {
          this.updateAddressListInService(userData);
          this.loadAddresses(); 
        },
        (err: any) => console.log(err)
      );
    } else {
      console.log(userData);
      this.addresService.addaddressApi(userData).subscribe((res: any) => {
          this.updateAddressListInService(userData);
          this.loadAddresses(); 
        },
        (err: any) => console.log(err)
      );
    }
    this.editaddress = true;
  }
  
  updateAddressListInService(newAddress: any) {
    let currentAddresses = this.dataService.getAddressListValue(); 
    let updatedAddresses;
  
    if (newAddress.addressId) {
      updatedAddresses = currentAddresses.map((address:any) =>
        address.addressId === newAddress.addressId ? newAddress : address
      );
    } else {
      updatedAddresses = [...currentAddresses, newAddress];
    }
  
    this.dataService.updateAddressList(updatedAddresses); 
  }
  
  
  

  orderAddress(address: any) {
    this.order = false;
    this.orderaddress = address;
    console.log(this.orderaddress);
  }

  orderSummery() {
    this.order = false;
  }

  editAddress(address: any) {
    this.editaddress = false;
    this.editadd = address;
    this.addressForm.patchValue({
      addressId: address.addressId,
      name: address.name,
      mobileNumber: address.mobileNumber,
      address: address.address,
      city: address.city,
      state: address.state,
      type: address.type,
      userId: address.userId
    });
  }

  removeAddress(addressId: number) {
    this.addresService.deleteaddressApi(addressId).subscribe(res => {
      this.dataService.currAddressList.subscribe((addresses:any) => {
        const updatedAddresses = addresses.filter((address:any) => address.addressId !== addressId);
        this.dataService.updateAddressList(updatedAddresses);
      });  
      this.loadAddresses();
    }, err => {
      console.error('Error removing address', err);
    });
  }
  handleOrder() {
    const orderDate = new Date();
    const displayOptions: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    const formattedOrderDate = orderDate.toLocaleDateString('en-US', displayOptions); // Format for display, e.g., "May 26"
    const isoOrderDate = orderDate.toISOString(); // Format for sending to the server, e.g., "2024-05-26T14:15:22.123Z"
  
    const orders = this.cartList.map((book:any) => ({
      addressId: this.orderaddress.addressId,
      orderDate: isoOrderDate,
      bookId: book.bookId
    }));
  
    const processNextOrder = (index: number) => {
      if (index < orders.length) {
        const orderBody = orders[index];
        this.orderService.addOrderApi(orderBody).subscribe((res:any) => {
          const order = {
            orderId: res.data[0],
            orderDate: formattedOrderDate, 
            bookId: this.cartList[index].bookId,
            bookName: this.cartList[index].bookName,
            authorName: this.cartList[index].authorName,
            price: this.cartList[index].price,
            bookImage: this.cartList[index].bookImage
          };
          this.route.navigate(['dashboard/orderplaced']);
  
          let currentOrderList: any[] = this.dataService.getOrderListValue();
          const updatedOrderList = [...currentOrderList, order];
          this.dataService.updateOrderList(updatedOrderList);
  
          // Remove cart item
          this.cartService.cartDeleteApi(this.cartList[index].cartId).subscribe(() => {
            processNextOrder(index + 1);
          }, err => {
            console.error('Error removing cart', err);
            processNextOrder(index + 1); // Continue processing the next order even if an error occurs
          });
        }, err => {
          console.error('Error adding order', err);
          processNextOrder(index + 1); // Continue processing the next order even if an error occurs
        });
      } else {
        this.route.navigate(['/orderplaced']);
      }
    };
    processNextOrder(0);
  }

}