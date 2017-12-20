import { Component, Input } from '@angular/core';

import { Product } from '../../models/product';
import { ShoppingCart } from '../../models/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input("product") product: Product;
  @Input("showActions") showActions = false;
  @Input("shoppingCart") shoppingCart: ShoppingCart;


  constructor(private cartService: ShoppingCartService) { }
  
  addToCart() {
    this.cartService.addToCart(this.product);
  }
  
}
