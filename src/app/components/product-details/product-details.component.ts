import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{

  constructor(private route: ActivatedRoute, private productService: ProductService,private cartService:CartService) { }

  product: any;


  ngOnInit() {
    const productId = this.route.snapshot.params['id'];
    this.getProductDetails(productId);
  }

  getProductDetails(productId: string) {
    this.productService.getProductById(productId).subscribe(
      (res) => {
        this.product = res;
      },
      (error) => {
        console.log('Error fetching product details:', error);
      }
    );
  }
  
  addToCart(item:any){
    item.quantity=1;
    item.total=item.price;
    this.cartService.addtoCart(item);
  }
}
