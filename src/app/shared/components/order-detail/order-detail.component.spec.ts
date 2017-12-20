import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailComponent } from './order-detail.component';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'shared/services/order.service';
import { Observable } from 'rxjs/Observable';
import { By } from '@angular/platform-browser';

class ActivatedRouteStub {
  snapshot = {
    paramMap: { 
      get: function() {}
    }
  };
}

class OrderServiceStub {
  getOrder() {}
}

describe('OrderDetailComponent', () => {
  let component: OrderDetailComponent;
  let fixture: ComponentFixture<OrderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDetailComponent ],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: OrderService, useClass: OrderServiceStub },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get order id from the route', () => {
    const route = TestBed.get(ActivatedRoute);
    const routeSpy = spyOn(route.snapshot.paramMap, "get").and.returnValue("test1234");

    component.ngOnInit();
    
    expect(routeSpy).toHaveBeenCalledWith("id");
    expect(component.orderId).toEqual("test1234");
  });
  
  it('should get order observable from order service', () => {
    const route = TestBed.get(ActivatedRoute);
    const routeSpy = spyOn(route.snapshot.paramMap, "get").and.returnValue("test1234");
    const orderSpy = spyOn(TestBed.get(OrderService), "getOrder").and
      .returnValue(Observable.from([{}]));
    
    component.ngOnInit();
    
    expect(orderSpy).toHaveBeenCalledWith(component.orderId);
    expect(component.order$).toBeDefined();
  });

  // =======================
  // Integration
  // =======================

  it('should render the order card', () => {
    const route = TestBed.get(ActivatedRoute);
    const routeSpy = spyOn(route.snapshot.paramMap, "get").and.returnValue("test1234");
    const orderSpy = spyOn(TestBed.get(OrderService), "getOrder").and
      .returnValue(Observable.from([{ datePlaced: 11111111, shipping: {}}]));
    
    component.ngOnInit();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const card = fixture.debugElement.query(By.css('.card-body'));

      expect(card).not.toBeNull();
    });

  });

});
