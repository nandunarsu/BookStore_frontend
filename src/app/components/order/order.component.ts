import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/dataService/data.service';
import { HttpService } from 'src/app/services/http/http.service';
import { OrderService } from 'src/app/services/orderService/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orderList! : any[];
  constructor(private router:Router,private route: ActivatedRoute,private httpService:HttpService,private dataService:DataService,private orderService:OrderService) { }

  handleBook() {
    this.router.navigate(["dashboard/book"]);
  }
  ngOnInit(): void {
    if (localStorage.getItem('AuthToken') != null) {

       this.dataService.currOrderList.subscribe(res=>{
        //  this.httpService.getAllOrder().subscribe(res => {
      this.orderList=res
      console.log(res);
      
    },err=>console.log(err))
  
   }
}

}
