import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor(private httpService:HttpService) { }
  getAllWishListApiCall()
  {
    return this.httpService.getWishList();
  }
  addWishListApiCall(bookId:number)
  {
    return this.httpService.addWishList(bookId);
  }
  deleteWishListApiCall(wishListId:number)
  {
      return this.httpService.deleteWishList(wishListId);
  }
}
