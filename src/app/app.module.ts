import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AdminModule } from 'app/admin/admin.module';
import { HomeComponent } from 'app/core/components/home/home.component';
import { LoginComponent } from 'app/core/components/login/login.component';
import { NotFoundComponent } from 'app/core/components/not-found/not-found.component';
import { CoreModule } from 'app/core/core.module';
import { ProductsComponent } from 'app/shopping/components/products/products.component';
import { ShoppingModule } from 'app/shopping/shopping.module';
import { SharedModule } from 'shared/shared.module';

import { environment } from './../environments/environment';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
        
    CoreModule,
    AdminModule,
    SharedModule,
    ShoppingModule,
    
    // we are putting these here since we need products component
    // and we dont want to import shpping module to core module
    RouterModule.forRoot([
      {
        path: '', component: ProductsComponent, pathMatch: 'full'
      },
      {
        path: 'home', component: HomeComponent, pathMatch: 'full'
      },
      {
        path: 'login', component: LoginComponent, pathMatch: 'full'
      },
      {
        path: '**', component: NotFoundComponent, pathMatch: 'full'
      },
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
