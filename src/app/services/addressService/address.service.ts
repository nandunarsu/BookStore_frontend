import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private httpService:HttpService) { }
  getAddressApi(){
    return this.httpService.getAddressApiCall(`/Address/GetAddress`);
  }
  editaddressApi(data:any){
    return this.httpService.editaddressApiCall(`/Address/UpdateAddress`,data)
  }
  addaddressApi(data:any){
    return this.httpService.addaddressApiCall(`/Address`,data)
  }
  deleteaddressApi(addressId:any){
    console.log("addressid",addressId);
    return this.httpService.deleteaddressApiCall(`/Address/DeleteAddress?addressId=${addressId}`)
    
  }
}
