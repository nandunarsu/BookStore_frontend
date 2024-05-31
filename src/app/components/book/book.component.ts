import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/bookService/book.service';
import { DataService } from 'src/app/services/dataService/data.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  bookList:[]=[];
  constructor(private bookService:BookService,private dataService:DataService) { }

  ngOnInit() {
    this.bookService.getBooksApi().subscribe((res:any)=> 
      {
        console.log(res.data);
        
        this.bookList = res;
        console.log(this.bookList)
       // this.dataService.changeAllBookList(res.data)
      }
        ,(err)=>console.log((err)))
//this.dataService.allBookState.subscribe((res)=> (this.bookList=res));
  }

}
