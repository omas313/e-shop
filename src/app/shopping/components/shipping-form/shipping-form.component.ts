import { OrderService } from '../../../shared/services/order.service';
import { AuthService } from '../../../shared/services/auth.service';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Component, Output, OnInit, OnDestroy, Input } from '@angular/core';
import { Order } from '../../../shared/models/order';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  // @Output("formSubmit") formSubmit = new EventEmitter<any>();
  
  // submitForm(form) {
  //   this.formSubmit.emit(form);
  // }
  
  @Input("cart") cart: ShoppingCart;
  
  userId: string;
  userSub: Subscription;
  shipping = {};

  constructor(
    private router: Router,
    private orderService: OrderService,
    private auth: AuthService
  ) {}
  
  async ngOnInit() {
    this.userSub = this.auth.user$.subscribe(u => this.userId = u.uid);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }


  async placeOrder(shippingData) {
    const order = new Order(this.userId, shippingData, this.cart);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(["/order-successful", result.key]);
  }
}
