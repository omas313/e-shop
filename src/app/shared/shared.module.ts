import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CustomFormsModule } from 'ng2-validation';
import { BsDropdownModule, CollapseModule } from 'ngx-bootstrap';
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
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    CustomFormsModule,    
    ReactiveFormsModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),

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
    OrderDetailComponent,

    CommonModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    CustomFormsModule,    
    ReactiveFormsModule,
    CollapseModule.forRoot().ngModule,
    BsDropdownModule.forRoot().ngModule,
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
