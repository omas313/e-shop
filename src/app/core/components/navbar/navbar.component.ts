import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppUser } from '../../../shared/models/app-user';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { AuthService } from '../../../shared/services/auth.service';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';

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

  getChevronDirection() {
    return this.isCollapsed ? "fa-chevron-down" : "fa-chevron-up";
  }
  
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleIfOpen() {
    if (!this.isCollapsed) this.isCollapsed = true;
  }

  logout() {
    this.authService.logout();
  }
}
