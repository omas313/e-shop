import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AdminModule } from 'app/admin/admin.module';
import { ShoppingModule } from 'app/shopping/shopping.module';
import { BsDropdownModule, CollapseModule } from 'ngx-bootstrap';
import { SharedModule } from 'shared/shared.module';

import { environment } from './../environments/environment';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    NotFoundComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    AdminModule,
    SharedModule,
    ShoppingModule,
    RouterModule.forRoot([
      {
        path: '', redirectTo: 'products', pathMatch: 'full'
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
    ]),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
