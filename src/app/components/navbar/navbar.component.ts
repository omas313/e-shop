import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUser } from '../../models/app-user';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ShoppingCart } from '../../models/shopping-cart';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  // responsive collapse button
  isCollapsed = true;
  
  constructor(
    private authService: AuthService,
    private cartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    // we don't need to unsub from these observables 
    // here since we want to see the changes and also there is only
    // one instance of this navbar component in the entire application's
    // lifetime

    // get user changes
    this.authService.appUser$.subscribe(u => this.appUser = u);

    // get cart and calculate item count
    this.cart$ = await this.cartService.getCart();
  }

  getCartBadgeColor(count) {
    return count === 0 ? "badge-secondary" : "badge-orange";
  }
  
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    this.authService.logout();
  }
}
