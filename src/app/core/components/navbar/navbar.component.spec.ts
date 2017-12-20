import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BsDropdownModule } from 'ngx-bootstrap';
import { Observable } from 'rxjs/Observable';
import { AuthService } from 'shared/services/auth.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

import { NavbarComponent } from './navbar.component';

class AuthServiceStub {
  logout() {}
  get appUser$(): Observable<any> { 
    return Observable.of({ 
      name: "test name", 
      email: "test email", 
      isAdmin: true
    }); 
  }
}

class ShoppingCartServiceStub {
  getCart() { return Promise.resolve(Observable.of(null)); }
}

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ BsDropdownModule.forRoot() ],
      declarations: [ NavbarComponent ],
      providers: [
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: ShoppingCartService, useClass: ShoppingCartServiceStub }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {    
    expect(component).toBeTruthy();
  });

  it('should get appUser form authService', () => {
    expect(component.appUser.name).toBe("test name");
    expect(component.appUser.email).toBe("test email");
    expect(component.appUser.isAdmin).toBeTruthy();
  });

  it('should get cart from ShoppingCartService', () => {
    const cartService = TestBed.get(ShoppingCartService);
    const spy = spyOn(cartService, "getCart");

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  it('should return correct badge class according to count when getCartBadgeColor is called', () => {
    expect(component.getCartBadgeColor(0)).toBe("badge-secondary");
    expect(component.getCartBadgeColor(-1)).toBe("badge-orange");
    expect(component.getCartBadgeColor(10)).toBe("badge-orange");
    expect(component.getCartBadgeColor("")).toBe("badge-orange");
  });

  it('should return fa-chevron-up when isCollapsed field is false when getChevronDirection is called', () => {
    component.isCollapsed = false;

    expect(component.getChevronDirection()).toBe("fa-chevron-up");
  });

  it('should return fa-chevron-down when isCollapsed field is true when getChevronDirection is called', () => {
    component.isCollapsed = true;

    expect(component.getChevronDirection()).toBe("fa-chevron-down");
  });

  it('should set isCollapsed field to false if it is true when toggleCollapse is called', () => {
    component.isCollapsed = true;

    component.toggleCollapse();

    expect(component.isCollapsed).toBeFalsy();
  });

  it('should set isCollapsed field to true if it is false when toggleCollapse is called', () => {
    component.isCollapsed = false;

    component.toggleCollapse();

    expect(component.isCollapsed).toBeTruthy();
  });

  it('should set isCollapsed field to true when isCollapsed is false when toggleIfOpen is called', () => {
    component.isCollapsed = false;

    component.toggleIfOpen();

    expect(component.isCollapsed).toBeTruthy();
  });

  it('should not touch isCollapsed field when it is true when toggleIfOpen is called', () => {
    component.isCollapsed = true;

    component.toggleIfOpen();

    expect(component.isCollapsed).toBeTruthy();
  });

  it('should call logout on AuthService when logout is called', () => {
    const authService = TestBed.get(AuthService);
    const spy = spyOn(authService, "logout");

    component.logout();

    expect(spy).toHaveBeenCalled();
  });

  // =============================
  // Integration tests
  // =============================

  it('should have a navbar-brand link with routerLink to home', () => {
    const de = fixture.debugElement.query(By.css('a.navbar-brand'));

    expect(de).not.toBeNull();
    expect(de.nativeElement["routerLink"][0]).toBe("/home");
  });

  it('should call toggleIfOpen to when home link is clicked and have isCollapsed set to true', () => {
    const de = fixture.debugElement.query(By.css('a.navbar-brand'));
    const spy = spyOn(component, "toggleIfOpen");

    de.triggerEventHandler("click", null);

    expect(spy).toHaveBeenCalled();
    expect(component.isCollapsed).toBeTruthy();
  });

  it('should call toggleCollapse when navbar-toggler button is clicked', () => {
    const de = fixture.debugElement.query(By.css('button.navbar-toggler'));
    const spy = spyOn(component, "toggleCollapse").and.callThrough();
    component.isCollapsed = false;

    de.triggerEventHandler("click", null);

    expect(spy).toHaveBeenCalled();
    expect(component.isCollapsed).toBeTruthy();
  });

  it('should have a link with routerLink to /products', () => {
    const des = fixture.debugElement.queryAll(By.css('a.nav-link'));
    const productsLink = des.find(de => {
      if (!de.nativeElement["routerLink"]) return false;
      else return de.nativeElement["routerLink"][0] === "/products";
    });

    expect(productsLink).toBeDefined();
  });

  it('should have a link with routerLink to /shopping-cart', () => {
    const des = fixture.debugElement.queryAll(By.css('a.nav-link'));
    const cartLink = des.find(de => {
      if (!de.nativeElement["routerLink"]) return false;
      else return de.nativeElement["routerLink"][0] === "/shopping-cart";
    });

    expect(cartLink).toBeDefined();
  });

  it('should have a dropdownToggle with user\'s name', async(() => {
    const dd = fixture.debugElement.query(By.css('[dropdownToggle]'));

    expect(dd.nativeElement.innerText).toBe("test name");
  }));

  it('should have a link with routerLink to /my-orders', async(() => {
    const dd = fixture.debugElement.query(By.css('[dropdownToggle]'));
    dd.triggerEventHandler("click", null);

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      
      const des = fixture.debugElement.queryAll(By.css('a.nav-link'));
      const ordersLink = des.find(de => {
        if (!de.nativeElement["routerLink"]) return false;
        return de.nativeElement["routerLink"][0] === "/my-orders";
      });
  
      expect(ordersLink).toBeDefined();
    });
  }));

  it('should have a link with routerLink to /admin/orders when user is admin', async(() => {
    const dd = fixture.debugElement.query(By.css('[dropdownToggle]'));
    dd.triggerEventHandler("click", null);

    component.appUser.isAdmin = true;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const des = fixture.debugElement.queryAll(By.css('a.nav-link'));
      const adminOrders = des.find(de => {
        if (!de.nativeElement["routerLink"]) return false;
        return de.nativeElement["routerLink"][0] === "/admin/orders";
      });
  
      expect(adminOrders).toBeDefined();
    });
  }));

  it('should have a link with routerLink to /admin/products when user is admin', async(() => {
    const dd = fixture.debugElement.query(By.css('[dropdownToggle]'));
    dd.triggerEventHandler("click", null);

    component.appUser.isAdmin = true;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      
      const des = fixture.debugElement.queryAll(By.css('a.nav-link'));
      const adminOrders = des.find(de => {
        if (!de.nativeElement["routerLink"]) return false;
        return de.nativeElement["routerLink"][0] === "/admin/products";
      });
  
      expect(adminOrders).toBeDefined();
    });
  }));

  it('should have a link to logout that calls logout method', async(() => {
    const spy = spyOn(component, "logout").and.returnValue(null);
    const dd = fixture.debugElement.query(By.css('[dropdownToggle]'));
    dd.triggerEventHandler("click", null);

    fixture.whenStable().then(() => {
      const des = fixture.debugElement.queryAll(By.css('a.nav-link'));
      const logOutLink = des.find(de => de.nativeElement.innerText === "Log Out");

      logOutLink.parent.triggerEventHandler("click", null);
  
      expect(spy).toHaveBeenCalled();
    });
  }));

  it('should have a link with routerLink to /login', () => {
    component.appUser = null;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      
      const des = fixture.debugElement.queryAll(By.css('a.nav-link'));
      const loginLink = des.find(de => {
        if (!de.nativeElement["routerLink"]) return false;
        return de.nativeElement["routerLink"][0] === "/login";
      });
  
      expect(loginLink).toBeDefined();
    });
  });



});
