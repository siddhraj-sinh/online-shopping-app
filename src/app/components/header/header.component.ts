import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  totalItem: number=0;  
  public searchTerm !: string;
  constructor(private cartService:CartService, private router : Router){}
  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res)=>{
     this.totalItem = res.length;
    })
  }
  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['/user/signin']); 
  }
}
