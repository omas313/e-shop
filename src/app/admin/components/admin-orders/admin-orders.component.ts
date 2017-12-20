import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { OrderService } from '../../../shared/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders$: Observable<any[]>;
  
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orders$ = this.orderService.getAllOrders();
  }

  getDate(datePlaced) {
    return new Date(datePlaced).toDateString();
  }

}
