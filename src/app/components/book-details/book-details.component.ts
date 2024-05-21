import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { HEART_ICON, STAR_ICON } from 'src/assets/svg-icons';
import { BookComponent } from '../book/book.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/dataService/data.service';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';
import { CartService } from 'src/app/services/cartService/cart.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit,OnDestroy {
  subscription: Subscription = new Subscription();
  selectBook:any
  bookData:any
  bookId!: number
  count: number = 1;
  bookCount: boolean = false;
  cartId!: number;
  tempcart: any[] = [];
 
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,private cartService:CartService,private router:Router,private httpService:HttpService,private route:ActivatedRoute,private dataService:DataService) {
    iconRegistry.addSvgIconLiteral("heart-icon", sanitizer.bypassSecurityTrustHtml(HEART_ICON)); 
    iconRegistry.addSvgIconLiteral("star-icon", sanitizer.bypassSecurityTrustHtml(STAR_ICON)); 
  }

  ngOnInit(): void {
   // this.subscription = this.dataService.allBookState.subscribe((res1:any[]) => {
      this.httpService.bookApiCall(`/Book`).subscribe((res1:any)=>{
      console.log(res1);
      this.bookData = res1

      this.route.params.subscribe(res2 => {
        this.selectBook = res1.filter((e:any) => e.bookId == res2['bookId'])[0]
      })
      console.log(this.selectBook);
    })
    // this.cartService.getCartApi().subscribe((res:any) => {
    //   this.bookData = res.filter((e: any) => e.bookId == this.selectBook.bookId)
    //   console.log(this.bookData);

    //   for (let i = 0; i < this.bookData.length; i++) {
    //     if (!this.bookData[i].isUnCarted && !this.bookData[i].isOrdered) {
    //       this.bookCount = true;
    //       this.count = this.bookData[i].quantity;
    //       this.cartId = this.bookData[i].cartId;
    //     }

    //   }
    // })
    // if (localStorage.getItem('AuthToken') == null) {
    //   this.dataService.tempCartState.subscribe(res => 
    //     {
    //     const flatRes = res.flat();
    //     let found = false;
    //     for (let i = 0; i < flatRes.length; i++) {
    //       const ele = flatRes[i];
    //       if (this.selectBook.bookId === ele.bookId) 
    //         {
    //         found = true;
    //         this.count = ele.quantity
    //         this.bookCount = true;
    //       }
    //     }
    //   })
    // }
  }
  handleAddBook(data: any) {
    this.bookCount = !this.bookCount
    // this.cartService.addCartApi({ quantity: 1, bookId: data.bookId }).subscribe((res:any) => this.cartId = res, err => {
    //    this.tempcart[this.tempcart.length] = data;
    //   this.tempcart[0].quantity = 1;
    var tempdata=[];
    tempdata[tempdata.length]=data;
     this.dataService.changeTempCart(tempdata);
    // });
  }

    ngOnDestroy(): void {
      this.subscription.unsubscribe();

  }
 

}
