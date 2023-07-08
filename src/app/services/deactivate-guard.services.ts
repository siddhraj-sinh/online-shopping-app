import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { CheckoutComponent } from "../components/checkout/checkout.component";
import { Observable } from "rxjs";

export class CanDeactivateGuardService implements CanDeactivate<CheckoutComponent>{
    
    
    canDeactivate(component: CheckoutComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): boolean{
      return true;
    }


}