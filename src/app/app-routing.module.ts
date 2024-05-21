import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { BookContainerComponent } from './components/book-container/book-container.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BookComponent } from './components/book/book.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { CartComponent } from './components/cart/cart.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:'header',component:HeaderComponent},
  {path:'bookcnt',component:BookContainerComponent},
  {path:'cart',component:CartComponent},
  {path:'customer',component:CustomerDetailsComponent},
  //{path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent, children:
  [
    {path: "book",component:BookComponent},
    {path:'bookdetails/:bookId',component:BookDetailsComponent},
    {path:'cart',component:CartComponent}
  ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
