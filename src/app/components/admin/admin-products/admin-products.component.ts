import { Product } from './../../../models/product';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ProductService } from '../../../services/product.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  // products$: Observable<any[]>;
  // we want to filter here on the client since there arent many products
  // so we should get the organic list here
  subscription: Subscription;
  products: Product[];
  filteredProducts: Product[];

  titleSortAsc = false;
  priceSortAsc = false;
  
  constructor(
    private router: Router,
    private productService: ProductService
  ) {
    this.subscription = this.productService.getProducts()
      .subscribe(products => this.filteredProducts = this.products = products);
    // this.itemResource.count().then(count => this.itemCount = count);
  }

  ngOnInit() {
  }

  newProduct() {
    this.router.navigateByUrl("/admin/products/new");
  }

  filter(search: FormControl) {
    // can sub to value changes @oninit and use debounce and 
    // disctinct until changed
    this.filteredProducts = 
      search.value ? this.products.filter(p => 
          p.title.toLowerCase().indexOf(search.value.toLowerCase()) !== -1)
        : this.products;
  }

  sortByTitle() {
    // switch sort type before sorting to display correct caret
    this.titleSortAsc = !this.titleSortAsc;    
    this.filteredProducts = this.filteredProducts
    .sort((p1, p2) => {
      // get lower cased titles
      const t1 = p1.title.toLowerCase();
      const t2 = p2.title.toLowerCase();
      // sort string ascending
      if (t1 < t2) return this.titleSortAsc ? -1 : 1;
        if (t1 > t2) return this.titleSortAsc ? 1 : -1;
        // no sorting
        return 0;
      });
  }
  
  sortByPrice() {
    // switch sort type before sorting to display correct caret
    this.priceSortAsc = !this.priceSortAsc;
    this.filteredProducts = this.filteredProducts
      .sort((p1, p2) => this.priceSortAsc ? p1.price - p2.price : p2.price - p1.price);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
