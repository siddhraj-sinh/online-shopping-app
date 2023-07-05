import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:"/user/signin",
    pathMatch:'full'
   },
  {
   path:"home",
   component:HomeComponent
  },
  {
  path:"user",
  loadChildren:()=>import('./user/user.module').then(m=>m.UserModule)
  },
  { path: 'product/:id', component: ProductDetailsComponent },
  {
    path:'cart',
    component:CartComponent
  },
  {
    path:'checkout',
    component:CheckoutComponent
  },
  {
    path:'order-history',
    component:OrderHistoryComponent
  }, 
  {
   path:'order-confirmation/:id',
   component:OrderConfirmationComponent
  }
  // { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
