import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl:string="https://localhost:7049/api"
  
  constructor(private httpClient:HttpClient) { }
  bookApiCall(endpoint:string){
    // console.log(this.baseUrl + endpoint)
    return this.httpClient.get(`${this.baseUrl + endpoint}`);
        // return this.httpClient.get(endpoint);

  }
  cartApiCall(endpoint:string){
    return this.httpClient.get(`${this.baseUrl + endpoint}`);
  }
}
