import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AdminOrdersComponent } from 'app/admin/components/admin-orders/admin-orders.component';
import { OrderService } from 'shared/services/order.service';
import { Observable } from 'rxjs/Observable';
import { By } from '@angular/platform-browser';

class OrderServiceStub {
  getAllOrders() {}
}

describe('AdminOrdersComponent', () => {
  let component: AdminOrdersComponent;
  let fixture: ComponentFixture<AdminOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOrdersComponent ],
      providers: [ { provide: OrderService, useClass: OrderServiceStub }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get orders from OrderService', () => {
    const orderService = TestBed.get(OrderService);
    const spy = spyOn(orderService, "getAllOrders").and.returnValue(
      Observable.from([[1, 2, 3]])
    );

    component.ngOnInit();

    component.orders$.subscribe(data => {
      expect(data).toEqual([1, 2, 3]);
    });
  });

  it('should return correct date when getDate is called', () => {
    const spy = spyOn(component, "getDate").and.callThrough();
    const dateNumber = 1122334455;
    const date = new Date(1122334455).toDateString();

    const result = component.getDate(dateNumber);

    expect(spy).toHaveBeenCalledWith(dateNumber);
    expect(result).toBe(date);
  });


  // Integration tests

  it('should render orders in a table', () => {
    const orderService = TestBed.get(OrderService);
    const spy = spyOn(orderService, "getAllOrders").and.returnValue(
      Observable.from([[
        { key: "key1", datePlaced: 1122334455, shipping: { name: "name 1" } },
        { key: "key2", datePlaced: 1122334455, shipping: { name: "name 2" } }
      ]])
    );

    component.ngOnInit(); // to get orders

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const des = fixture.debugElement.queryAll(By.css('table tbody tr'));
  
      expect(des.length).toBe(2);
    });
  });

  it('should render link with routerLink to /order-detail', () => {
    const orderService = TestBed.get(OrderService);
    const spy = spyOn(orderService, "getAllOrders").and.returnValue(
      Observable.from([[
        { key: "testKey 1", datePlaced: 1122334455, shipping: { name: "name 1" } },
        { key: "testKey 2", datePlaced: 1122334455, shipping: { name: "name 2" } }
      ]])
    );

    component.ngOnInit(); // to get orders

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const links = fixture.debugElement.queryAll(By.css('table tbody tr a'))
        .filter(de => {
          const routerLink = de.nativeElement["routerLink"];
          return routerLink[0] === "/order-detail"
            && routerLink[1].indexOf("testKey") !== -1;
        });
      
      expect(links.length).toBe(2);
    });
  });

  it('should render no orders when no orders are received', () => {
    const orderService = TestBed.get(OrderService);
    const spy = spyOn(orderService, "getAllOrders").and.returnValue(Observable.from([[]]));

    component.ngOnInit();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const des = fixture.debugElement.queryAll(By.css('table tbody tr'));
      const noOrdersEl = fixture.debugElement.query(By.css('#no-orders')).nativeElement;

      expect(noOrdersEl.innerText.toLowerCase()).toContain("no orders");
      expect(des.length).toBe(0);
    });
  });

});
