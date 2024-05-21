import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpService:HttpService) { }
  getCartApi(){
    return this.httpService.cartApiCall('/Cart');
  }
}
