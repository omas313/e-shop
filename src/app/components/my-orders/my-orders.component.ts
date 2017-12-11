import { AuthService } from '../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders$: Observable<any[]>;
  
  constructor(
    private orderService: OrderService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.orders$ = this.auth.user$.switchMap(u =>  this.orderService.getUserOrders(u.uid));
  }

  getDate(datePlaced) {
    return new Date(datePlaced).toDateString();
  }

}
