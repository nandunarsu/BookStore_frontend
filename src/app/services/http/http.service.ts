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
    // console.log(this.baseUrl + endpoint)
    return this.httpClient.get(`${this.baseUrl + endpoint}`);
        // return this.httpClient.get(endpoint);

  }
  cartApiCall(endpoint:string){
    return this.httpClient.get(`${this.baseUrl + endpoint}`,{headers:this.header});
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
 
}
