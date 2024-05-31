import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/dataService/data.service';
import { WishListService } from 'src/app/services/wishListService/wish-list.service';
import { DELETE_FOREVER_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  wishList:any;
  tempWishList:any;
  bookList:any;
  constructor(private dataservice:DataService,private wishListService:WishListService,iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,private route:Router) {
    iconRegistry.addSvgIconLiteral("delete-icon", sanitizer.bypassSecurityTrustHtml(DELETE_FOREVER_ICON));
   }

  ngOnInit(): void {
    if (localStorage.getItem('AuthToken') != null) {

      this.wishListService.getAllWishListApiCall().subscribe(res =>{
        this.wishList = res.data;
            console.log("wishList-data",this.wishList);
            
  })
  }   else {
    this.wishList = this.dataservice.wishListItems;
  }
}
  handleBook() {
    this.route.navigate(["dashboard/book"]);
  }
  removeWishList(wishListId:number)
  {
   this.wishListService.deleteWishListApiCall(wishListId).subscribe(res=>{
    console.log(res)
    console.log(wishListId);
    console.log(this.wishList);
    
    
    this.wishList=this.wishList.filter((ele:any)=>ele.WishListId!=wishListId)
  })
    
  
  }

}
