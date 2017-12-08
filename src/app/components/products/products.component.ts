import { CategoryService } from '../../services/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../models/product';
import { Subscription } from 'rxjs/Subscription';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products: Product[];
  filteredProducts: Product[];
  
  categories$: Observable<any[]>;
  currentCategory = "";

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute
  ) { 
    // get categories from db
    this.categories$ = this.categoryService.getAll();  
    
    
    // to ensure we get products then route query at the start
    this.productService.getAll()
      .switchMap(products => {
        this.filteredProducts = this.products = products;
        return this.route.queryParamMap;
      })
      .subscribe(params => this.changeFilter(params.get('category')));
    
  }

  changeFilter(category) {
    this.currentCategory = category;
    this.filteredProducts = !category ? this.products 
      : this.products.filter(p => p.category === category);
  }

}
