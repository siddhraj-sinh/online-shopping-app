import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  customer = {
    name: '',
    address: '',
    email: ''
  };

  products: any[] = [];
  grandTotal:number = 0;

  constructor(private router: Router, private cartService: CartService) {
    // Subscribe to the cart items from the CartService
    this.cartService.getProducts().subscribe(products => {
      this.products = products;
      this.grandTotal=this.cartService.getTotalPrice();
    });
  }

  placeOrder() {
    // Prepare the order object
    const order = {
      customer: this.customer,
      products: this.products,
      orderDate: new Date().toISOString()
    };

    // Save the order in the database (you can implement this logic)
    // ...

    // Clear the cart
    this.cartService.removeAllCart();

    // Navigate to the order confirmation page
    this.router.navigate(['/order-confirmation']);
  }
}
