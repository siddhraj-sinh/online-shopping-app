import { Component, OnInit} from '@angular/core';
import { ActivatedRoute,Router ,NavigationStart } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  orderId: any;
  orderDetails: any;
  expectedDeliveryDate: string = "";

  constructor(private router: Router,private route:ActivatedRoute,private orderService:OrderService){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (event.url === '/checkout') {
          this.router.navigate(['/home']);
        }
      }
    });
  }
  ngOnInit() {
  
    this.orderId=this.route.snapshot.params['id'];
    this.loadOrderDetails(this.orderId);
  }
  loadOrderDetails(id:any): void {
    this.orderService.getOrderDetails(id).subscribe(
      orderDetails => {
        this.orderDetails = orderDetails;
        this.expectedDeliveryDate = '2/8/2023'
      }
    );
  }


}
