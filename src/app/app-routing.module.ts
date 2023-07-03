import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
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
   path:"",
   redirectTo:"/user/signup",
   pathMatch:'full'
  }
  // { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
