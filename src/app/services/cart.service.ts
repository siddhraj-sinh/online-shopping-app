import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList: any =[];
  public productList = new BehaviorSubject<any>([]);
  
  public search = new BehaviorSubject<string>("");

  constructor() { }
  getProducts(){
    return this.productList.asObservable();
  }

  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  addtoCart(product : any){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList)
    alert(`Would you like to add the ${product.productName} to your cart?`);
  }
  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }
  removeCartItem(product: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id=== a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }
  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }
  updateCartItemQuantity(product: any, quantity: number) {
    const item = this.cartItemList.find((item: any) => item.id === product.id);
    if (item) {
      item.quantity = quantity;
      item.total = item.price * quantity;
      this.productList.next(this.cartItemList);
    }
  }
  isCartEmpty():boolean{
    return this.cartItemList.length > 0;
  }
}
