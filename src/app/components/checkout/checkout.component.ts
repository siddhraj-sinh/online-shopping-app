import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators,FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  loginForm= new FormGroup({
    user : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required,Validators.email]),
    address : new FormControl('',Validators.required),
    phone : new FormControl('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])
  })
  
  customer = {
    name: '',
    address: '',
    email: ''
  };

  products: any[] = [];
  grandTotal:number = 0;
  userId?: number | null;
  orderId?: number;
  form={
    name:'',
    email:'',
    address:'',
    phone:''
  }
  constructor(private formBuilder :FormBuilder,private router: Router, private cartService: CartService, private userService: UserService,private orderService:OrderService) {
    // Subscribe to the cart items from the CartService
    this.cartService.getProducts().subscribe(products => {
      this.products = products;
      this.grandTotal=this.cartService.getTotalPrice();
    });
    this.userId = userService.getCurrentUserId();
  }
loginUser(){
  console.warn(this.loginForm.value)
}
  
getControl(name:any):AbstractControl | null{
  return this.loginForm.get(name);
}

  placeOrder() {
    console.log(this.form);

    // Prepare the order object
    const order = {
      userId: this.userId,
      customerName:this.form.name,
      customerEmail:this.form.email,
      customerPhone:this.form.phone,
      customerAddress:this.form.address,
      items: this.products,
      grandTotal:this.grandTotal,
      orderDate:new Date().toLocaleDateString()
    };


    this.orderService.addOrder(order).subscribe((res)=>{
      console.log(res);
      this.orderId=res.id;
      console.log(this.orderId);
        // Clear the cart
    this.cartService.removeAllCart();

    // Navigate to the order confirmation page
    this.router.navigate(['/order-confirmation', this.orderId]);
        // Clear the cart
    this.cartService.removeAllCart();
    })
  
  }
}
