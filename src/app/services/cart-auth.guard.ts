import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CartService } from './cart.service';

export const cartAuthGuard: CanActivateFn = (route, state) => {
  const cartService = inject(CartService);
  const router = inject(Router);
  console.log(cartService.isCartEmpty());
  if(cartService.isCartEmpty()){

    return true;
  }
  alert("Your cart is empty! Please add Items..")
   return router.parseUrl('/home');

};
