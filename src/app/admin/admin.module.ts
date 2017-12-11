import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'shared/services/auth.guard';
import { SharedModule } from 'shared/shared.module';

import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductFormComponent } from './components/admin-product-form/admin-product-form.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminGuard } from './services/admin.guard';

@NgModule({
  imports: [
    SharedModule,    
    RouterModule.forChild([
      {
        path: 'admin/products', 
        component: AdminProductsComponent, 
        canActivate: [AuthGuard, AdminGuard],
        pathMatch: 'full'
      },
      {
        path: 'admin/products/new', 
        component: AdminProductFormComponent, 
        canActivate: [AuthGuard, AdminGuard],
        pathMatch: 'full'
      },
      {
        path: 'admin/products/:id', 
        component: AdminProductFormComponent, 
        canActivate: [AuthGuard, AdminGuard],
        pathMatch: 'full'
      },
      {
        path: 'admin/orders', 
        component: AdminOrdersComponent, 
        canActivate: [AuthGuard, AdminGuard],
        pathMatch: 'full'
      },
    ]),
  ],
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    AdminProductFormComponent,
  ],
  providers: [
    AdminGuard        
  ]
})
export class AdminModule { }
