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
  private tempCart=new BehaviorSubject<any>({});
  tempCartState=this.tempCart.asObservable();
  tempList:any []=[];
  changeTempCart(value:any)
  {

    this.modifyCart(value)
  }
  modifyCart(value: any[]) {
    // Flatten tempList if it's an array of arrays
    this.tempList = [...this.tempList].flat();

    console.log(value);
    
    // Iterate over each item in the value array
    for (const val of value) {
        // Check if any item in tempList has the same bookId as the current value
        const existingItem = this.tempList.find((item: any) => item.bookId === val.bookId);

        if (existingItem === undefined) {
            // If no item with the same bookId exists, add the new item to tempList
            this.tempList.push(val);
        } else {
            // If an item with the same bookId exists, update tempList
            this.tempList = this.tempList.map((item: any) => {
                // If the item's bookId matches, replace it with the new value
                if (item.bookId === val.bookId) {
                    return val;
                } else {
                    return item;
                }
            });
        }
    }

    // Update tempCart with the modified tempList
    this.tempCart.next(this.tempList);
}


  constructor() { }
}
