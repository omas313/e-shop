import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { OrderSuccessfulComponent } from './components/order-successful/order-successful.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';

export const routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent, pathMatch: 'full'
  },

  // anonymous user routes
  {
    path: 'shopping-cart', component: ShoppingCartComponent, pathMatch: 'full'
  },
  {
    path: 'products', component: ProductsComponent, pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent, pathMatch: 'full'
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
    path: 'order-successful', 
    component: OrderSuccessfulComponent, 
    canActivate: [AuthGuard],        
    pathMatch: 'full'
  },

  // admin routes
  {
    path: 'admin/products', 
    component: AdminProductsComponent, 
    canActivate: [AuthGuard, AdminGuard],
    pathMatch: 'full'
  },
  {
    path: 'admin/orders', 
    component: AdminOrdersComponent, 
    canActivate: [AuthGuard, AdminGuard],
    pathMatch: 'full'
  },

  {
    path: '**', component: NotFoundComponent, pathMatch: 'full'
  },
];
