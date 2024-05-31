import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpService:HttpService) { }
  addOrderApi(data:any){
    
    return this.httpService.addOrderApiCall(`/Order`,data)
  }
}
