import { AdminGuard } from './guards/admin.guard';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RouterModule } from '@angular/router';
import { CollapseModule, BsDropdownModule } from 'ngx-bootstrap';
import { CustomFormsModule } from 'ng2-validation';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { routes } from './routes';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderSuccessfulComponent } from './components/order-successful/order-successful.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminProductFormComponent } from './components/admin/admin-product-form/admin-product-form.component';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';
import { ProductCardComponent } from './components/product-card/product-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    NotFoundComponent,
    ShoppingCartComponent,
    ProductsComponent,
    CheckoutComponent,
    OrderSuccessfulComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    AdminProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    FormsModule,
    CustomFormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
    UsersService,
    ProductService,
    AdminGuard,
    AuthGuard,
    CategoryService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
