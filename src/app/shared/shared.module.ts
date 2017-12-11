import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderDetailComponent } from 'shared/components/order-detail/order-detail.component';
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
    CommonModule,
    RouterModule.forChild([
      {
        path: 'order-detail/:id',
        component: OrderDetailComponent,
        canActivate: [AuthGuard],
        pathMatch: 'full'
      },
    ])
  ],
  declarations: [
    ProductCardComponent,
    QuantityChangerComponent,
    OrderDetailComponent    
  ],
  exports: [
    ProductCardComponent,
    QuantityChangerComponent,
    OrderDetailComponent    
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
