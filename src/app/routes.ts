import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderSuccessfulComponent } from './components/order-successful/order-successful.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { AuthGuard } from './shared/services/auth.guard';

export const routes = [
  {
    path: '', redirectTo: 'products', pathMatch: 'full'
  },
  {
    path: 'products', component: ProductsComponent, pathMatch: 'full'
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
    path: 'order-successful/:id', 
    component: OrderSuccessfulComponent, 
    canActivate: [AuthGuard],        
    pathMatch: 'full'
  },
  {
    path: 'order-detail/:id', 
    component: OrderDetailComponent, 
    canActivate: [AuthGuard],        
    pathMatch: 'full'
  },

  {
    path: '**', component: NotFoundComponent, pathMatch: 'full'
  },
];
