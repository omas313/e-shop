import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppUser } from '../../models/app-user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  appUser: AppUser;

  // resopnsive collapse button
  isCollapsed = true;
  
  constructor(private authService: AuthService) {
    // we don't need to unsub here since we want to see the changes
    this.authService.appUser$.subscribe(u => this.appUser = u);
  }
  
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    this.authService.logout();
  }
}
