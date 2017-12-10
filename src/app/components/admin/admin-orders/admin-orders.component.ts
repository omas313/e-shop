import { OrderService } from '../../../services/order.service';
import { AuthService } from '../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders$: Observable<any[]>;
  
  constructor(
    private orderService: OrderService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.orders$ = this.orderService.getAllOrders();
  }

  getDate(datePlaced) {
    return new Date(datePlaced).toDateString();
  }

}
