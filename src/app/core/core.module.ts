import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'shared/shared.module';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  imports: [
    SharedModule,

    // we pass empty array here since we put the routes in the 
    // app module since we dont want to import the shopping module
    // because there a route that depends on it
    RouterModule.forChild([]),
    
  ],
  declarations: [
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    NotFoundComponent,
  ],
  exports: [NavbarComponent]
})
export class CoreModule { }
