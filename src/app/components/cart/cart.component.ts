import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cartService/cart.service';
import { DataService } from 'src/app/services/dataService/data.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartList: any[] = [];
  subscription: Subscription = new Subscription();
  templist!:any;
  flag:boolean=false
  count!: number;

  constructor(private cartService:CartService,private matDialog:MatDialog, private router:ActivatedRoute,private dataService:DataService) { }

  ngOnInit(): void {
    //  this.router.params.subscribe(res1 => {
    //   this.flag=res1['flag']
    //       })   
    // if(localStorage.getItem('AuthToken')==null||localStorage.getItem('AuthToken')=='')
    //   {
    this.dataService.tempCartState.subscribe(res=>{this.cartList=res;console.log(res);
      this.cartList=[...[...this.cartList]]
      console.log(this.cartList.flat());
      this.cartList=this.cartList;
      console.log(this.cartList);
      this.templist=this.cartList;
      
    })
      }

    // this.cartService.getCartApi().subscribe((res:any) => {
    //   this.cartList = res
    //   this.cartList= this.cartList.filter(ele=>{if(ele.quantity>0 && !ele.isUnCarted && !ele.isOrdered) return ele;})
    //     console.log(this.cartList);
    // })

    handleLoginorSignup(){
      const dialogRef = this.matDialog.open(LoginComponent);
 
   }
  }



