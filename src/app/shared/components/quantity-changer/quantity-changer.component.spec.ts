import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityChangerComponent } from './quantity-changer.component';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ShoppingCart } from 'shared/models/shopping-cart';

class ShoppingCartServiceStub {
  addToCart() {}
  removeFromCart() {}
}

describe('QuantityChangerComponent', () => {
  let component: QuantityChangerComponent;
  let fixture: ComponentFixture<QuantityChangerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantityChangerComponent ],
      providers: [
        { provide: ShoppingCartService, useClass: ShoppingCartServiceStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantityChangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call cartService.addToCart passing in product when addToCart is called', () => {
    const spy = spyOn(TestBed.get(ShoppingCartService), "addToCart");
    component.product = { price: 1, title: "1", category: "1", imageUrl: "1", key: "1" };
    
    component.addToCart();

    expect(spy).toHaveBeenCalledWith(component.product);
  });

  it('should call cartService.removeFromCart passing in product when removeFromCart is called', () => {
    const spy = spyOn(TestBed.get(ShoppingCartService), "removeFromCart");
    component.product = { price: 1, title: "1", category: "1", imageUrl: "1", key: "1" };
    
    component.removeFromCart();

    expect(spy).toHaveBeenCalledWith(component.product);
  });

  // ================
  // Integration
  // ================

  it('should not render add and remove buttons when theres no shopping cart', () => {
    const des = fixture.debugElement.queryAll(By.css('button'));

    expect(des.length).toEqual(0);
  });

  it('should render add and remove buttons when theres a shopping cart', () => {
    component.shoppingCart = new ShoppingCart({});
    spyOn(component.shoppingCart, "getQuantityOf").and.returnValue(0);
    
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const des = fixture.debugElement.queryAll(By.css('button'));
  
      expect(des.length).toEqual(2);
    });
  });

  it('should render correct amount of the product in shopping cart', () => {
    component.shoppingCart = new ShoppingCart({});
    spyOn(component.shoppingCart, "getQuantityOf").and.returnValue(99);
    
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const amountText = fixture.debugElement.query(By.css('.quantity div'))
        .nativeElement.innerText;
  
      expect(amountText).toContain("99");
    });
  });

  it('should call removeFromCart when - button is clicked', () => {
    component.shoppingCart = new ShoppingCart({});
    spyOn(component.shoppingCart, "getQuantityOf").and.returnValue(0);
    const spy = spyOn(component, "removeFromCart");

    fixture.whenStable().then(() => {
      fixture.detectChanges();

       fixture.debugElement
        .queryAll(By.css('button'))
        .find(de => de.nativeElement.innerText === "-")
        .triggerEventHandler("click", null);
      
      expect(spy).toHaveBeenCalled();
    });
  });

  it('should call addToCart when + button is clicked', () => {
    component.shoppingCart = new ShoppingCart({});
    spyOn(component.shoppingCart, "getQuantityOf").and.returnValue(0);
    const spy = spyOn(component, "addToCart");

    fixture.whenStable().then(() => {
      fixture.detectChanges();

       fixture.debugElement
        .queryAll(By.css('button'))
        .find(de => de.nativeElement.innerText === "+")
        .triggerEventHandler("click", null);
      
      expect(spy).toHaveBeenCalled();
    });
  });

});
