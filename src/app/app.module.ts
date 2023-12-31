import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './components/cart/cart.component';
import { FilterPipe } from './shared/filter.pipe';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CanDeactivateGuardService } from './services/deactivate-guard.services';
import { SortByPipePipe } from './shared/sort-by-pipe.pipe';
import { CategoryFilterPipe } from './shared/category-filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductDetailsComponent,
    HeaderComponent,
    CartComponent,
    FilterPipe,
    CheckoutComponent,
    OrderHistoryComponent,
    OrderConfirmationComponent,
    ProfileComponent,
    SortByPipePipe,
    CategoryFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [CanDeactivateGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
