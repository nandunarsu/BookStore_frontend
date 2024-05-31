import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private bookobj  =new BehaviorSubject<any[]>([]);
  currentBookState=this.bookobj.asObservable();

  changeState(value:any[])
  {
    this.bookobj.next(value)
  }

  constructor(private httpService:HttpService) { }
  getBooksApi(){
    return this.httpService.bookApiCall('/Book');
  }
  
}
