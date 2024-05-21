import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { HEART_ICON, STAR_ICON } from 'src/assets/svg-icons';
import { BookComponent } from '../book/book.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/dataService/data.service';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit,OnDestroy {
  subscription: Subscription = new Subscription();
selectBook:any
bookData:any
 
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,private router:Router,private httpService:HttpService,private route:ActivatedRoute,private dataService:DataService) {
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
   
    }
    ngOnDestroy(): void {
      this.subscription.unsubscribe();

  }
 

}
