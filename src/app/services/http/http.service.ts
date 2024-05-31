import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  header= new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('AuthToken')}` || ""
  })
  baseUrl:string="https://localhost:7049/api"

  constructor(private httpClient:HttpClient) { }
  bookApiCall(endpoint:string){
   
    return this.httpClient.get(`${this.baseUrl + endpoint}`);
       

  }
  cartApiCall(endpoint:string){
    return this.httpClient.get(`${this.baseUrl + endpoint}`,{headers:this.header});
  }
  cartDeleteApiCall(endpoint:string){
    return this.httpClient.delete(`${this.baseUrl + endpoint}`,{headers:this.header});
  }
  loginsignupApiCall(data:any,endpoint:string){
    return this.httpClient.post(`${this.baseUrl + endpoint}`,data);
    }
    addToCartApiCall(endpoint:string,data:any){
      return this.httpClient.post(`${this.baseUrl + endpoint}`,data,{headers:this.header});
    }
    addToCart(endpoint:string,data:{quantity:number,bookId:number},token?:string):Observable<any>
    {
      if(token!=null)
        {
          return this.httpClient.post<any>(`${this.baseUrl + endpoint}`,{...data},{headers:new HttpHeaders({Authorization:`Bearer ${token}`})})
        }
      return this.httpClient.post<any>(`${this.baseUrl + endpoint}`,{...data},{headers:this.header})
    }
    getAddressApiCall(endpoint:string){
      return this.httpClient.get(`${this.baseUrl + endpoint}`,{headers:this.header});
    }
    editaddressApiCall(endpoint:string,data:any){
      return this.httpClient.put(`${this.baseUrl + endpoint}`,data,{headers:this.header});
    }
    addaddressApiCall(endpoint:string,data:any){
      return this.httpClient.post(`${this.baseUrl + endpoint}`,data,{headers:this.header});
    }
    deleteaddressApiCall(endpoint:string){
      return this.httpClient.delete(`${this.baseUrl + endpoint}`,{headers:this.header});
    }
    addOrderApiCall(endpoint:string,data:any){
      return this.httpClient.post(`${this.baseUrl + endpoint}`,data ,{headers:this.header});
    }
    updateQuantiyToCart(cartId:number,quantity:number,token?:string):Observable<any>
    {
      if(token!=null)
        {
          return this.httpClient.put<any>(`${this.baseUrl}/Cart/${cartId}/${quantity}`,{},{headers:new HttpHeaders({Authorization:`Bearer ${token}`})})
        }
      return this.httpClient.put<any>(`${this.baseUrl}/Cart/${cartId}/${quantity}`,{},{headers:this.header})
    }
    addOrder(orderBody: { addressId: any; orderDate: string; bookId: any; }):Observable<any> {
      return this.httpClient.post(`${this.baseUrl}/Order`,{...orderBody},{headers:this.header})
    }
    getAllOrder():Observable<any> {
      return this.httpClient.get(`${this.baseUrl}/Order/GetOrder`,{headers:this.header})
    }
    getWishList():Observable<any>
  {
    return this.httpClient.get<any>(`${this.baseUrl}/WishList`,{headers:this.header})
  }
  addWishList(BookId:number):Observable<any>{
    // const requestBody = { bookId: bookId};
    return this.httpClient.post(`${this.baseUrl}/WishList`,{bookId: BookId},{headers:this.header})
  }
  deleteWishList(wishListId:number):Observable<any>
  {
    return this.httpClient.delete(`${this.baseUrl}/WishList?wishListId=${wishListId}`,{headers:this.header})
  }
  getNamebyToken():Observable<any>
  {
    return this.httpClient.get<any>(`${this.baseUrl}/Book/getNameByToken`,{headers:this.header})
  }
  
}
