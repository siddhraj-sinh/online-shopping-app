import { Component,OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private product:ProductService,private cartService:CartService){}

  products: any[] = [];
  searchKey:string ="";
  filterForm!: FormGroup;
  categoryFilterControl: FormControl = new FormControl('');
  sortFilterControl: FormControl = new FormControl('select');

  ngOnInit(){
   this.loadProducts();

   this.cartService.search.subscribe((val:any)=>{
    this.searchKey = val;
  })
  }

  loadProducts(){
    this.product.loadAllProducts().subscribe((res)=>{
      console.log(res);
      this.products=res;

      this.products.forEach((a:any)=>{
        Object.assign(a,{quantity:1,total:a.price});
      })
    });
  }

  addToCart(item:any){
   this.cartService.addtoCart(item);
   
  }
}
