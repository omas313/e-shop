import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';

export const routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent, pathMatch: 'full'
  },
  {
    path: 'shopping-cart', component: ShoppingCartComponent, pathMatch: 'full'
  },
  {
    path: '**', component: NotFoundComponent, pathMatch: 'full'
  },
];
