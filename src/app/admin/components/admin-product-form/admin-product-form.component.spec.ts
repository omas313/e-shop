import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminProductFormComponent } from 'app/admin/components/admin-product-form/admin-product-form.component';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import { Observable } from 'rxjs/Observable';
import { By } from '@angular/platform-browser';

class ActivatedRouteStub {
  snapshot = {
    paramMap: { 
      get: function() {}
    }
  };
}

class CategoryServiceStub {
  getAll() {}
}

class ProductServiceStub {
  getProduct() {}
  update() {}
  create() {}
  delete() {}
}

class RouterStub {
  navigateByUrl() {}
}


describe('AdminProductFormComponent', () => {
  let component: AdminProductFormComponent;
  let fixture: ComponentFixture<AdminProductFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProductFormComponent ],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: CategoryService, useClass: CategoryServiceStub },
        { provide: ProductService, useClass: ProductServiceStub },
        { provide: Router, useClass: RouterStub },
        FormBuilder
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductFormComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get categories observable from categoryService', () => {
    const categoryService = TestBed.get(CategoryService);
    const spy = spyOn(categoryService, "getAll").and.returnValue(Observable.from([[1, 2, 3]]));

    component.ngOnInit();

    component.categories$.subscribe(values => {
      expect(spy).toHaveBeenCalled();
      expect(values).toEqual([1, 2, 3]);
    });
  });
  
  it('should not call productService.getProduct when no id is passed in activated route', () => {
    const route: ActivatedRoute = TestBed.get(ActivatedRoute);
    const routeSpy = spyOn(route.snapshot.paramMap, "get").and.returnValue("");
    const productService = TestBed.get(ProductService);
    const productServiceSpy = spyOn(productService, "getProduct");

    component.ngOnInit();

    expect(routeSpy).toHaveBeenCalled();
    expect(productServiceSpy).not.toHaveBeenCalled();
  });

  it('should call productService.getProduct with the id passed in activated route', () => {
    const route: ActivatedRoute = TestBed.get(ActivatedRoute);
    const routeSpy = spyOn(route.snapshot.paramMap, "get").and.returnValue("testId");
    const productService = TestBed.get(ProductService);
    const productServiceSpy = spyOn(productService, "getProduct").and
      .returnValue(Observable.from([{ 
        title: "testTitle", imageUrl: "testUrl", category: "testCat", price: 0 
      }]));

    component.ngOnInit();

    expect(routeSpy).toHaveBeenCalled();
    expect(productServiceSpy).toHaveBeenCalledWith("testId");
    expect(component.product).toEqual({ 
      title: "testTitle", imageUrl: "testUrl", category: "testCat", price: 0 
    });
  });

  it('should create form', () => {
    component.ngOnInit();

    expect(component.form).toBeDefined();
  });

  it('should create form fields', () => {
    component.ngOnInit();

    expect(component.title).toBeDefined();
    expect(component.title instanceof FormControl).toBeTruthy();
    expect(component.price).toBeDefined();
    expect(component.price instanceof FormControl).toBeTruthy();
    expect(component.category).toBeDefined();
    expect(component.category instanceof FormControl).toBeTruthy();
    expect(component.imageUrl).toBeDefined();
    expect(component.imageUrl instanceof FormControl).toBeTruthy();
  });

  it('should call productService.update with params:(id, product) if id is defined when submitting form', () => {
    component.id = "testId";
    component.product = { title: "testTitle", imageUrl: "testUrl", category: "testCat", price: 0 };
    const productService = TestBed.get(ProductService);
    const productServiceSpy = spyOn(productService, "update");
        
    component.submit();

    expect(productServiceSpy).toHaveBeenCalledWith(component.id, component.product);
  });

  it('should call productService.create with params:(product) if id is not defined when submitting form', () => {
    component.id = "";
    component.product = { title: "testTitle", imageUrl: "testUrl", category: "testCat", price: 0 };
    const productService = TestBed.get(ProductService);
    const productServiceSpy = spyOn(productService, "create");
        
    component.submit();

    expect(productServiceSpy).toHaveBeenCalledWith(component.product);
  });

  it('should call router.navigateByUrl when submitting form', () => {
    const router = TestBed.get(Router);
    const routerSpy = spyOn(router, "navigateByUrl");
        
    component.submit();

    expect(routerSpy).toHaveBeenCalledWith("/admin/products");
  });

  it('should include product title when confirmation is requests when calling delete', () => {
    component.product = { title: "testTitle", imageUrl: "testUrl", category: "testCat", price: 0 };
    const confirmSpy = spyOn(window, "confirm").and.returnValue(false);
        
    component.delete();

    expect(confirmSpy).toHaveBeenCalledWith(`Delete ${component.product.title}?`);
  });

  it('should do nothing when confirmation is declined when calling delete', () => {
    const confirmSpy = spyOn(window, "confirm").and.returnValue(false);
    const routerSpy = spyOn(TestBed.get(Router), "navigateByUrl");      
    const productServiceSpy = spyOn(TestBed.get(ProductService), "create");
        
    component.delete();

    expect(routerSpy).not.toHaveBeenCalled();
    expect(productServiceSpy).not.toHaveBeenCalled();
  });

  it('should call productService.delete and router.navigateByUrl when confirmed when calling delete', () => {
    const confirmSpy = spyOn(window, "confirm").and.returnValue(true);
    const routerSpy = spyOn(TestBed.get(Router), "navigateByUrl");      
    const productServiceSpy = spyOn(TestBed.get(ProductService), "delete");
    component.id = "testId";

    component.delete();

    expect(productServiceSpy).toHaveBeenCalledWith("testId");
    expect(routerSpy).toHaveBeenCalledWith("/admin/products");
  });

  // Integration testing

  it('should render form with an existing product', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const formDe = fixture.debugElement.query(By.css('form'));

    expect(formDe).not.toBeNull();
  });

  it('should not render form if there is no product', () => {
    component.ngOnInit();
    component.product = null;

    fixture.detectChanges();
    const formDe = fixture.debugElement.query(By.css('form'));

    expect(formDe).toBeNull();
  });

  it('should render form inputs with name === formControlName and ngModel attributes', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const inputs = fixture.debugElement.queryAll(By.css('.form-control'));

    inputs.forEach(de => {
      // name should be the same as formControlName
      expect(de.attributes["name"]).toEqual(de.attributes["formControlName"]);
      // should have ngModel attribute
      expect(Object.getOwnPropertyNames(de.properties).find(p => p === "ngModel"))
        .toEqual("ngModel");
    });
  });

  it('should not render any alert divs by defauls', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const alerts = fixture.debugElement.queryAll(By.css('.alert.alert-danger'));

    expect(alerts.length).toEqual(0);
  });

  it('should update form control with input value', () => {
    component.ngOnInit();
    fixture.detectChanges();
    
    const product = { title: "testTitle", imageUrl: "testUrl", category: "testCat", price: 0 };
    
    component.title.setValue(product.title);
    component.imageUrl.setValue(product.imageUrl);
    component.price.setValue(product.price);
    component.category.setValue(product.category);

    expect(component.form.value).toEqual(product);
  });

  it('should call delete method when delete button is clicked', () => {
    const route: ActivatedRoute = TestBed.get(ActivatedRoute);
    const routeSpy = spyOn(route.snapshot.paramMap, "get").and.returnValue("testId");
    const productServiceSpy = spyOn(TestBed.get(ProductService), "getProduct").and
      .returnValue(Observable.from([{ 
        title: "testTitle", imageUrl: "testUrl", category: "testCat", price: 0 
      }]));
    const deleteSpy = spyOn(component, "delete");
    
    component.ngOnInit();
    fixture.detectChanges();
    
    fixture.whenStable().then(() => {
      const btn = fixture.debugElement.query(By.css('.btn-danger'));
      btn.triggerEventHandler("click", null);

      expect(deleteSpy).toHaveBeenCalled();
    });
  });

  
});
