import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent {
  userId: any;
  orders: any[] = [];
  selectedOrder: any = null;


  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private productService: ProductService
  ) {
    this.userId = userService.getCurrentUserId();
  }

  ngOnInit(): void {
    this.loadOrderHistory();
  }
  loadOrderHistory(): void {
    // Assuming you have a method in the order service to retrieve the order history
    this.orderService.getOrderHistory(this.userId).subscribe(
      orders => {
        this.orders = orders;
      }
    );
  }
  showProductDetails(order: any): void {
    this.selectedOrder = order;
  }

}
