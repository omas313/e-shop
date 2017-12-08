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
  
  // sorting flags
  titleSortAsc = false;
  priceSortAsc = false;

  // pagination stuff
  pageLimit = 8;
  currentPage = 1;
  numPages = 1;
  paginatedIndices = [];
  
  
  constructor(
    private router: Router,
    private productService: ProductService
  ) {
    this.subscription = this.productService.getAll()
      .subscribe(products => {
        this.filteredProducts = this.products = products;
        this.changePage(1);
      });
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
    this.changePage(1);
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

  changePage(newPage: number) {
    // update number of total pages since we may have filtered
    this.numPages = Math.ceil(this.filteredProducts.length / this.pageLimit);
    
    if (newPage < 1) {
      console.log("Error: trying to set page < 1. Value obtained: ", newPage);
      newPage = 1;
    }
    if (newPage > this.numPages) {
      console.log("Error: trying to set page > total numPages. Value obtained: ", newPage);
      newPage = this.numPages;
    }

    // update current page
    this.currentPage = newPage;
    
    // calculate start and end indices based on pageLimit & numPages
    const start = this.pageLimit * (this.currentPage - 1);
    // if this is the last page, end at last index, else add in to the limit - 1 since first is included
    const end = this.numPages === this.currentPage ? 
      this.filteredProducts.length - 1 : start + this.pageLimit - 1;

    // fill the indices array which we will use to display 
    this.paginatedIndices = [];
    for (let i = start; i <= end; i++) 
      this.paginatedIndices.push(i);

    // console.log(this.currentPage);
    // console.log(this.paginatedIndices);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
