import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductCardComponent } from 'shared/components/product-card/product-card.component';
import { QuantityChangerComponent } from 'shared/components/quantity-changer/quantity-changer.component';
import { AuthGuard } from 'shared/services/auth.guard';

import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UsersService } from './services/users.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProductCardComponent,
    QuantityChangerComponent
  ],
  exports: [
    ProductCardComponent,
    QuantityChangerComponent
  ],
  providers: [
    AuthService,
    UsersService,
    ProductService,
    CategoryService,
    OrderService,
    ShoppingCartService,
    AuthGuard
  ]
})
export class SharedModule { }
