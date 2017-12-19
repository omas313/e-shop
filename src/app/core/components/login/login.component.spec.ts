import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuthService } from 'shared/services/auth.service';

import { LoginComponent } from './login.component';

class AuthServiceStub {
  login() {}
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        { provide: AuthService, useClass: AuthServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService login method when login is called', () => {
    const authService = TestBed.get(AuthService);
    const spy = spyOn(authService, "login");

    component.login();
    
    expect(spy).toHaveBeenCalled();
  });

  it('should have div with class content-container', () => {
    const de = fixture.debugElement.query(By.css('div.content-container'));

    expect(de).not.toBeNull();
  });

  it('should have a button that calls login method in component', () => {
    const de = fixture.debugElement.query(By.css('button'));
    const spy = spyOn(component, "login");

    de.triggerEventHandler("click", null);

    expect(de).not.toBeNull();
    expect(spy).toHaveBeenCalled();
  });
  
});
