import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

import { ProductCardComponent } from './product-card.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { filter } from 'rxjs/operator/filter';

class ShoppingCartServiceStub {
  addToCart() {}
}

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCardComponent ],
      providers: [
        { provide: ShoppingCartService, useClass: ShoppingCartServiceStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardComponent);
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

  // ================
  // Integration
  // ================

  it('should render card for the product', () => {
    spyOn(TestBed.get(ShoppingCartService), "addToCart");
    component.product = { price: 1, title: "1", category: "1", imageUrl: "1", key: "1" };
    
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      
      const de = fixture.debugElement.query(By.css('.card-body'));

      expect(de).not.toBeNull();
    });
  });

  it('should not render card for the product', () => {
    spyOn(TestBed.get(ShoppingCartService), "addToCart");
    component.product = null;
    
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      
      const de = fixture.debugElement.query(By.css('.card-body'));

      expect(de).toBeNull();
    });
  });

  it('should render add to cart button when showActions is true && shoppingCart has 0 from the product', () => {
    component.shoppingCart = new ShoppingCart({});
    component.showActions = true;
    component.product = { price: 1, title: "1", category: "1", imageUrl: "1", key: "1" };    
    spyOn(component.shoppingCart, "getQuantityOf").and.returnValue(0);

    fixture.whenStable().then(() => {
      fixture.detectChanges();

       const btn = fixture.debugElement
        .queryAll(By.css('button'))
        .find(de => de.nativeElement.innerText === "Add to Cart");
      
      expect(btn).not.toBeNull();
    });
  });

  it('should call addToCart method when add to cart button is clicked', () => {
    component.shoppingCart = new ShoppingCart({});
    component.showActions = true;
    component.product = { price: 1, title: "1", category: "1", imageUrl: "1", key: "1" };
    spyOn(component.shoppingCart, "getQuantityOf").and.returnValue(0);
    const spy = spyOn(component, "addToCart");
    
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      fixture.debugElement
        .queryAll(By.css('button'))
        .find(de => de.nativeElement.innerText === "Add to Cart")
        .triggerEventHandler("click", null);
      
      expect(spy).toHaveBeenCalled();
    });
  });

  it('should render app quantity changer and not the add to cart button when the cart has a quantity > 0 from this product', () => {
    component.shoppingCart = new ShoppingCart({});
    component.showActions = true;
    component.product = { price: 1, title: "1", category: "1", imageUrl: "1", key: "1" };
    
    spyOn(component.shoppingCart, "getQuantityOf").and.returnValue(99);

    fixture.whenStable().then(() => {
      fixture.detectChanges();

       const btn = fixture.debugElement
        .queryAll(By.css('button'))
        .find(de => de.nativeElement.innerText === "Add to Cart");
      const quantityChanger = fixture.debugElement.query(By.css('app-quantity-changer'));

      expect(quantityChanger).toBeDefined();
      expect(btn).toBeUndefined();
    });
  });

});
