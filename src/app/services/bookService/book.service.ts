import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpService:HttpService) { }
  getBooksApi(){
    return this.httpService.bookApiCall('/Book');
  }
}
