import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartobj  =new BehaviorSubject<any[]>([]);
  currentCartState=this.cartobj.asObservable();

  changeState(value:any[])
  {
    this.cartobj.next(value)
  }

  constructor(private httpService:HttpService) { }
  getCartApi(){
    return this.httpService.cartApiCall(`/Cart`);
  }
  addCartApi(data:any){
    return this.httpService.addToCartApiCall(`/Cart`,data);
  }
  cartDeleteApi(data:any){
    return this.httpService.cartDeleteApiCall(`/Cart?cartId=${data}`)
  }
  updateQuantityToCartApiCall(cartId:number,quantity:number,token?:string)
  {
    return this.httpService.updateQuantiyToCart(cartId,quantity,token);
  }
}
