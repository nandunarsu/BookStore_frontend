import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  cartItems: any[] = [];
  wishListItems:any[]=[]
  token:any

  private searchString = new BehaviorSubject('');
  currSearchString = this.searchString.asObservable();

  private allbooks = new BehaviorSubject<any[]>([]);
  allBookState = this.allbooks.asObservable();

  private orderBook = new BehaviorSubject<any>({});
  orderBookState = this.orderBook.asObservable();

  private wishList =new BehaviorSubject<any[]>([]);
  currWishList = this.wishList.asObservable();

  private tempCart = new BehaviorSubject<any[]>([]);
  tempCartState = this.tempCart.asObservable();
  tempList: any[] = [];

  private bookList =  new BehaviorSubject<any[]>([]);
  currBookList = this.bookList.asObservable();

  private cartList = new BehaviorSubject<any[]>([]);
  currCartList = this.cartList.asObservable();

  private addressList = new BehaviorSubject<any[]>([]);
  currAddressList = this.addressList.asObservable();

  private orderList = new BehaviorSubject<any[]>([]);
  currOrderList = this.orderList.asObservable();

  constructor() { }

  updateSearchString(state:string){
    this.searchString.next(state)
   }

  changeAllBookList(value: any[]) {
    this.allbooks.next(value);
  }
  addToWishList(wishList: any) {
    this.wishListItems.push(wishList);
  }

  changeOrderBookState(value: any) {
    this.orderBook.next(value);
  }

  changeTempCart(value: any[]) {
    this.modifyCart(value);
  }

  modifyCart(value: any[]) {
    this.tempList = [...this.tempList].flat();

    console.log(value);

    for (const val of value) {
      const existingItem = this.tempList.find((item: any) => item.bookId === val.bookId);

      if (existingItem === undefined) {
        this.tempList.push(val);
      } else {
        this.tempList = this.tempList.map((item: any) => {
          if (item.bookId === val.bookId) {
            return val;
          } else {
            return item;
          }
        });
      }
    }

    this.tempCart.next(this.tempList);
  }

  getAllCartBooks(cartBooks: any) {
    this.cartList.next(cartBooks);
  }

  getAllBooks(books: any) {
    this.bookList.next(books);
  }

  getUserAddress(addressList: any) {
    this.addressList.next(addressList);
  }
  getOrderListValue() {
    return this.orderList.getValue();
  }
  getAddressListValue(): any[] {
    return this.addressList.getValue();
  }
  updateAddressList(value:any[]){
    this.addressList.next(value)
   }
   updateOrderList(value:any[]){
    this.orderList.next(value)
   }
   addToToken(setToken: any) {
    this.token=setToken;
  }
  updateBookList(state:any[]){
    this.bookList.next(state)
   }
   updateCartList(value:any[]){
     this.cartList.next(value)
   }
   updateWishList(value:any[]){
    this.wishList.next(value)
   }
}
