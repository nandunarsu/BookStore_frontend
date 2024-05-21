import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class DataService {

  private allbooks = new BehaviorSubject<any[]>([]);
  allBookState=this.allbooks.asObservable();
  changeAllBookList(value:any[])
  {
    this.allbooks.next(value)
  }


  constructor() { }
}
