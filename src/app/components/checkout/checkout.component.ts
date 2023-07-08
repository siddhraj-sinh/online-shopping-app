import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  customer = {
    name: '',
    address: '',
    email: ''
  };

  products: any[] = [];
  grandTotal: number = 0;
  userId?: number | null;
  checkoutForm: FormGroup;
  orderId?: number;

  constructor(
    private router: Router,
    private cartService: CartService,
    private userService: UserService,
    private orderService: OrderService,
    private formBuilder: FormBuilder
  ) {
    this.checkoutForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phone: ['', Validators.required]
    });

    this.userId = userService.getCurrentUserId();
  }

  ngOnInit() {
    this.cartService.getProducts().subscribe(products => {
      this.products = products;
      this.grandTotal = this.cartService.getTotalPrice();
    });
  }

  placeOrder() {
    if (this.checkoutForm.invalid) {
      return;
    }

    // Prepare the order object
    const order = {
      userId: this.userId,
      customerName: this.checkoutForm.value.name,
      customerEmail: this.checkoutForm.value.email,
      customerPhone: this.checkoutForm.value.phone,
      customerAddress: this.checkoutForm.value.address,
      items: this.products,
      grandTotal: this.grandTotal,
      orderDate: new Date().toLocaleDateString()
    };

    this.orderService.addOrder(order).subscribe((res) => {
      console.log(res);
      this.orderId = res.id;
      console.log(this.orderId);
      
      // Clear the cart
      this.cartService.removeAllCart();

      // Navigate to the order confirmation page
      this.router.navigate(['/order-confirmation', this.orderId]);
    });
  }
  getControl(name:any):AbstractControl | null{
    return this.checkoutForm.get(name);
  }
  canExit(): boolean {
    if (this.isFormEmpty()) {
      return confirm('You have unsaved changes. Do you really want to discard these changes?');
    }
    return true;
  }
  
   isFormEmpty(): boolean {
    const formValues = this.checkoutForm.value;
    return (
      formValues.name === '' &&
      formValues.email === '' &&
      formValues.address === '' &&
      formValues.phone === ''
    );
  }
  
}
