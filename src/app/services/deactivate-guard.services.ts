import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { CheckoutComponent } from "../components/checkout/checkout.component";
import { Observable } from "rxjs";
import { CartService } from "./cart.service";
@Injectable({
    providedIn: 'root'
  })
export class CanDeactivateGuardService implements CanDeactivate<CheckoutComponent>{
    
    constructor(private cartService:CartService){}
    canDeactivate(component: CheckoutComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): boolean{
        if (component.isFormEmpty()) {
            this.cartService.removeAllCart();
          }
        return component.canExit();
    }


}