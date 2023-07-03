import { Component,OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private product:ProductService){}

  products: any[] = [];
  ngOnInit(){
   this.loadProducts();
  }

  loadProducts(){
    this.product.loadAllProducts().subscribe((res)=>{
      console.log(res);
      this.products=res;
    })
  }
}
