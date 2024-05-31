import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AddressService } from 'src/app/services/addressService/address.service';
import { BookService } from 'src/app/services/bookService/book.service';
import { CartService } from 'src/app/services/cartService/cart.service';
import { DataService } from 'src/app/services/dataService/data.service';
import { UserService } from 'src/app/services/userService/user.service';
import { CART_ICON, DROP_DOWN, PROFILE_ICON, SEARCH_ICON } from 'src/assets/svg-icons';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { WishListService } from 'src/app/services/wishListService/wish-list.service';
import { OrderService } from 'src/app/services/orderService/order.service';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loginclick: boolean = false;
  CartValue!: any;
  loginLogOut: boolean = true;
  searchString: string = '';
  token: any;

  constructor(private httpservice:HttpService,private orderService:OrderService,private wishListService:WishListService,private router: Router,iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,private bookService:BookService,public dialog: MatDialog,private cartService:CartService,private dataService:DataService,private addressService:AddressService,private userService:UserService) {
    iconRegistry.addSvgIconLiteral("cart-icon", sanitizer.bypassSecurityTrustHtml(CART_ICON));
    iconRegistry.addSvgIconLiteral("profile-icon", sanitizer.bypassSecurityTrustHtml(PROFILE_ICON));
    iconRegistry.addSvgIconLiteral("search-icon", sanitizer.bypassSecurityTrustHtml(SEARCH_ICON));
    iconRegistry.addSvgIconLiteral("dropdown-icon", sanitizer.bypassSecurityTrustHtml(DROP_DOWN));
     
  }
  handleCart() {
    this.router.navigate(["dashboard/cart"]);
  }
  handleOrders() {
    this.router.navigate(["dashboard/order"]);
  }
  handleMywishList() {
    this.router.navigate(["dashboard/wishlist"]);
  }
  handleLoginSignup() {
    if (localStorage.getItem('AuthToken') != null) this.loginLogOut = false;
  }
  login() {
    const dialogRef = this.dialog.open(LoginComponent, { width: '720px', height: '480px' });
    dialogRef.afterClosed().subscribe(result => { });
    this.loginclick = !this.loginclick;
  }
  handleSearchString() {
    this.dataService.updateSearchString(this.searchString);
  }

  logout() {
    localStorage.clear();
    this.dataService.updateCartList([]); 
    this.dataService.updateWishList([]); 
    this.dataService.updateAddressList([]); 
    this.dataService.updateOrderList([]); 
    this.loginLogOut = true;
    // this.router.navigate([""]);
  }


  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.dataService.addToToken(this.token);
    
    this.bookService.getBooksApi().subscribe((res:any) => {
      this.bookService.changeState(res.data);
      this.dataService.updateBookList(res.data); 
    });

    if (localStorage.getItem('AuthToken') != null) {
      this.cartService.getCartApi().subscribe((res:any) => {
        this.CartValue = res.data;
        console.log(this.CartValue);
        this.cartService.changeState(res.data);
        this.dataService.updateCartList(res.data); 
      });

      this.wishListService.getAllWishListApiCall().subscribe(res => {
        this.dataService.updateWishList(res.data); 
      });
      this.addressService.getAddressApi().subscribe((res:any) => {
        this.dataService.updateAddressList(res.data); 
      });

      this.httpservice.getAllOrder().subscribe(res => {
        this.dataService.updateOrderList(res.data); 
      });

      this.loginLogOut = false;
    }
  }
  // openDialog() {
  //   this.dialog.open(LoginComponent)
  //   this.cartService.getCartApi().subscribe(res=>
  //     {
  //       this.dataService.getAllCartBooks(res);                  //dataservice call
  //     } 
  //   );
  //   this.bookService.getBooksApi().subscribe(res=>
  //     {
  //       this.dataService.getAllBooks(res);               //dataservice call
  //     } 
  //   );
     
  //   this.addressService.getAddressApi().subscribe(res=>
  //     {
  //       this.dataService.getUserAddress(res);
  //     }
  //   )
  // }

}
