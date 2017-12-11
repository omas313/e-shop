import { UsersService } from './shared/services/users.service';
import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private auth: AuthService, 
    private userService: UsersService, 
    private router: Router
  ) {

    // we are doing auth check when user log in here also the 
    // returnUrl redirection due to a bug, check authService
    this.auth.user$.subscribe(user => {
      if (!user) return;
      
      // store user in db, since we are using 3rd party (google) for
      // user info, we will always save their data on log in since they
      // may change it without the knowledge of this app
      // if we had a registration form, we would check if its a new user and
      // then save the data in db
      this.userService.save(user);
      
      // check for redirect url
      const returnUrl = localStorage.getItem("returnUrl");
      if (!returnUrl) return;
      
      // redirect somewhere then get rid of redirect url
      localStorage.removeItem("returnUrl");
      this.router.navigate([returnUrl]);
    });
  }
}
