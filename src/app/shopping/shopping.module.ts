import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'shared/services/auth.guard';
import { SharedModule } from 'shared/shared.module';

import { CheckoutComponent } from './components/checkout/checkout.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessfulComponent } from './components/order-successful/order-successful.component';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';
import { ProductsComponent } from './components/products/products.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      // anonymous user routes
      {
        path: 'products', component: ProductsComponent, pathMatch: 'full'
      },
      {
        path: 'shopping-cart', component: ShoppingCartComponent, pathMatch: 'full'
      },
      {
        path: 'products', component: ProductsComponent, pathMatch: 'full'
      },
    
      // authenticated user routes
      {
        path: 'my-orders', 
        component: MyOrdersComponent, 
        canActivate: [AuthGuard],        
        pathMatch: 'full'
      },
      {
        path: 'checkout', 
        component: CheckoutComponent, 
        canActivate: [AuthGuard],    
        pathMatch: 'full'
      },
      {
        path: 'order-successful/:id', 
        component: OrderSuccessfulComponent, 
        canActivate: [AuthGuard],        
        pathMatch: 'full'
      },
    ])
  ],
  declarations: [
    ShoppingCartComponent,
    ProductsComponent,
    CheckoutComponent,
    OrderSuccessfulComponent,
    MyOrdersComponent,
    ProductFilterComponent,
    ShippingFormComponent,
    ShoppingCartSummaryComponent,
  ]
})
export class ShoppingModule { }
