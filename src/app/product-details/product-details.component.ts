import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

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

}
