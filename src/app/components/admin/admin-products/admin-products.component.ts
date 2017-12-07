import { Product } from './../../../models/product';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableResource } from 'angular-4-data-table/src/index';
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
  
  // itemResource = new DataTableResource(this.products);
  // items = [];
  // itemCount = 0;
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


  // data table
  // reloadItems(params) {
  //   this.itemResource.query(params).then(items => this.items = items);
  // }

  // // special properties:
  // rowClick(rowEvent) {
  //   console.log('Clicked: ' + rowEvent.row.item.title);
  // }

  // rowDoubleClick(rowEvent) {
  //   console.log('Double clicked: ' + rowEvent.row.item.title);
  // }

  // rowTooltip(item) { return item.price; }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
