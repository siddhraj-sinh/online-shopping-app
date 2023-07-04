import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  totalItem: number=0;  
  userService: any;
  constructor(private cartService:CartService){}
  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res)=>{
     this.totalItem = res.length;
    })
  }

  displayUser(item:any){
    this.userService.getUser(item);
   }
}
