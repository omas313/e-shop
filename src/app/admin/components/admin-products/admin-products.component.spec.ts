import { Product } from '../../../shared/models/product';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ProductService } from 'shared/services/product.service';

import { AdminProductsComponent } from './admin-products.component';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { By } from '@angular/platform-browser';

class RouterStub {
  navigateByUrl() {}
}

class ProductServiceStub {
  getAll() {
    return Observable.from([[
      { key: "test key 1", title: "test title 1", price: 8, category: "test category 1", imageUrl: "test imageUrl 1" },
      { key: "test key 2", title: "test title 2", price: 99, category: "test category 2", imageUrl: "test imageUrl 2" },
    ]]);
  }
}

describe('AdminProductsComponent', () => {
  let component: AdminProductsComponent;
  let fixture: ComponentFixture<AdminProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ AdminProductsComponent ],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ProductService, useClass: ProductServiceStub },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe and get products on init', () => {
    const spy = spyOn(TestBed.get(ProductService), "getAll").and.callThrough();
    const negationSpy = spyOn(component, "changePage");

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
    expect(negationSpy).toHaveBeenCalled();
    expect(component.products.length).toEqual(2);
    expect(component.filteredProducts.length).toEqual(2);
    expect(component.subscription).toBeDefined();
  });

  it('should changePage to 1 and init correct pagination fields on init', () => {
    const productsSpy = spyOn(TestBed.get(ProductService), "getAll").and.callThrough();
    const changePageSpy = spyOn(component, "changePage").and.callThrough();

    component.ngOnInit();

    expect(productsSpy).toHaveBeenCalled();
    expect(changePageSpy).toHaveBeenCalledWith(1);
  });

  it('should call router.navigateByUrl when newProduct is called', () => {
    const spy = spyOn(TestBed.get(Router), "navigateByUrl");

    component.newProduct();

    expect(spy).toHaveBeenCalledWith("/admin/products/new");
  });

  it('should call filter products and filter by given search value', () => {
    const productsSpy = spyOn(TestBed.get(ProductService), "getAll").and.callThrough();
    const changePageSpy = spyOn(component, "changePage");
    const control = new FormControl();
    control.setValue("title 1");

    component.ngOnInit();
    component.filter(control);

    expect(component.filteredProducts.length).toEqual(1);
    expect(component.filteredProducts[0].title).toEqual("test title 1");
  });

  it('should call filter products with "" as a search value and not filter out anything', () => {
    const productsSpy = spyOn(TestBed.get(ProductService), "getAll").and.callThrough();
    const changePageSpy = spyOn(component, "changePage");
    const control = new FormControl();
    control.setValue("");

    component.ngOnInit();
    component.filter(control);

    expect(component.filteredProducts.length).toEqual(2);
  });

  it('should call filter products with "asdf" as a search value and filter out everything', () => {
    const productsSpy = spyOn(TestBed.get(ProductService), "getAll").and.callThrough();
    const changePageSpy = spyOn(component, "changePage");
    const control = new FormControl();
    control.setValue("asdf");

    component.ngOnInit();
    component.filter(control);

    expect(component.filteredProducts.length).toEqual(0);
  });

  it('should sort products by ascending title', () => {
    const productsSpy = spyOn(TestBed.get(ProductService), "getAll").and.callThrough();
    const changePageSpy = spyOn(component, "changePage");

    component.ngOnInit();
    component.sortByTitle();

    expect(component.filteredProducts[0].title < component.filteredProducts[1].title).toBeTruthy();
  });

  it('should sort products by descending title', () => {
    const productsSpy = spyOn(TestBed.get(ProductService), "getAll").and.callThrough();
    const changePageSpy = spyOn(component, "changePage");

    component.ngOnInit();
    component.sortByTitle();
    component.sortByTitle();

    expect(component.filteredProducts[0].title > component.filteredProducts[1].title).toBeTruthy();
  });

  it('should sort products by ascending price', () => {
    const productsSpy = spyOn(TestBed.get(ProductService), "getAll").and.callThrough();
    const changePageSpy = spyOn(component, "changePage");

    component.ngOnInit();
    component.sortByPrice();

    expect(component.filteredProducts[0].price < component.filteredProducts[1].price).toBeTruthy();
  });

  it('should sort products by descending price', () => {
    const productsSpy = spyOn(TestBed.get(ProductService), "getAll").and.callThrough();
    const changePageSpy = spyOn(component, "changePage");

    component.ngOnInit();
    component.sortByPrice();
    component.sortByPrice();

    expect(component.filteredProducts[0].price > component.filteredProducts[1].price).toBeTruthy();
  });

  it('should calculate correct pagination values on init', () => {
    const productsSpy = spyOn(TestBed.get(ProductService), "getAll").and.returnValue(
      Observable.from([[
        { key: "k1", title: "t1", price: 1, category: "c1", imageUrl: "i1" },
        { key: "k2", title: "t2", price: 2, category: "c2", imageUrl: "i2" },
        { key: "k3", title: "t3", price: 3, category: "c3", imageUrl: "i3" },
        { key: "k4", title: "t4", price: 4, category: "c4", imageUrl: "i4" }
      ]])
    );
    const changePageSpy = spyOn(component, "changePage").and.callThrough();

    component.pageLimit = 2;
    component.ngOnInit();

    expect(component.filteredProducts.length).toEqual(4);
    expect(changePageSpy).toHaveBeenCalledWith(1);
    expect(component.pageLimit).toEqual(2);
    expect(component.numPages).toEqual(2);
    expect(component.currentPage).toEqual(1);
    expect(component.paginatedIndices).toEqual([0, 1]);
  });

  it('should calculate correct pagination values when change page is called', () => {
    component.ngOnInit();
    component.pageLimit = 1;
    component.changePage(1);
    
    expect(component.pageLimit).toEqual(1);
    expect(component.numPages).toEqual(2);
    expect(component.currentPage).toEqual(1);
    expect(component.paginatedIndices).toEqual([0]);
  });

  it('should calculate correct pagination values when changePage to next page is called', () => {
    component.ngOnInit();
    component.pageLimit = 1;
    component.changePage(2);
    
    expect(component.currentPage).toEqual(2);
    expect(component.paginatedIndices).toEqual([1]);
  });

  it('should set currentPage to 1 when change page is called with value less than 1', () => {
    const productsSpy = spyOn(TestBed.get(ProductService), "getAll").and.callThrough();

    component.ngOnInit();
    component.changePage(-1);

    expect(component.currentPage).toEqual(1);
  });

  it('should set currentPage to last page when changePage is called with a number greater than calculated number of pages', () => {
    const productsSpy = spyOn(TestBed.get(ProductService), "getAll").and.callThrough();

    component.ngOnInit();
    component.changePage(55);

    expect(component.currentPage).toEqual(component.numPages);
  });

  // =================================
  // Integration tests
  // =================================

  it('should call newProduct method when button is clicked', () => {
    const btn = fixture.debugElement.queryAll(By.css('.btn-primary'))
      .find(de => de.nativeElement.innerText === "New Product");
    const methodSpy = spyOn(component, "newProduct").and.callThrough();
    const routerSpy = spyOn(TestBed.get(Router), "navigateByUrl");

    btn.triggerEventHandler("click", null);

    expect(methodSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalled();
  });

  it('should render the input for filtering', () => {
    const de = fixture.debugElement.query(By.css('input[name=search]'));

    expect(de).not.toBeNull();
  });

  it('should call filter method when input keyup is triggered', () => {
    const spy = spyOn(component, "filter");

    const input = fixture.debugElement.query(By.css('input[name=search]'));
    input.triggerEventHandler("keyup", null);

    expect(spy).toHaveBeenCalled();
  });

  it('should render products in a table', () => {
    component.ngOnInit(); 

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const des = fixture.debugElement.queryAll(By.css('table tbody tr'));
  
      expect(des.length).toBe(2);
    });
  });

  it('should render edit links with the products in a table', () => {
    component.ngOnInit(); 

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const des = fixture.debugElement.queryAll(By.css('table tbody tr a'));
      
      expect(des.length).toBe(2);
      des.forEach(de => {
        expect(de.properties["routerLink"].length).toBe(2);
        expect(de.properties["routerLink"][0]).toBe("/admin/products");
        expect(de.properties["routerLink"][1]).toBeDefined();
      });
    });
  });

  it('should not render table when there are no products', () => {
    spyOn(TestBed.get(ProductService), "getAll").and
      .returnValue(Observable.from([[]]));
    component.ngOnInit(); 

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const des = fixture.debugElement.queryAll(By.css('table tbody tr'));
  
      expect(des.length).toBe(0);
    });
  });


});
