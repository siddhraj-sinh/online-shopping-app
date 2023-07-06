import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products:any[]=[];
  grandTotal:number = 0;
  constructor(private cartService:CartService){}
  ngOnInit(): void {
   
    this.cartService.getProducts().subscribe((res)=>{
      this.products=res;
      this.grandTotal=this.cartService.getTotalPrice();
    })
  }
 
  removeItem(item:any){
  this.cartService.removeCartItem(item);
  }
  emptycart(){
    this.cartService.removeAllCart();
  }
  increaseQuantity(item: any) {
    //this.cartService.updateCartItemQuantity(item, item.quantity + 1);
    this.cartService.updateCartItemQuantity(item, item.quantity + 1);
    this.grandTotal = this.cartService.getTotalPrice();
  }
  decreaseQuantity(item:any){
    if (item.quantity > 1) {
      this.cartService.updateCartItemQuantity(item, item.quantity - 1);
      this.grandTotal = this.cartService.getTotalPrice();
    }
  }
}
