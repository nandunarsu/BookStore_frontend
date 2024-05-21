import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/bookService/book.service';
import { DataService } from 'src/app/services/dataService/data.service';

@Component({
  selector: 'app-book-container',
  templateUrl: './book-container.component.html',
  styleUrls: ['./book-container.component.scss']
})
export class BookContainerComponent implements OnInit {
  @Input() booksData:any[]=[]
  bookList:any;
  constructor(private router:Router,private bookService:BookService,private dataService:DataService) { }

  ngOnInit():void {
    this.dataService.allBookState.subscribe((res)=> (this.booksData=res));
  }
  handleClick(data:any)
  {

    console.log(data.bookId);
    // this.router.navigate([`/bookdetails`]);
   this.router.navigate([`/dashboard/bookdetails`,data.bookId]);
    //console.log(this.bookList)
   
  }

}
