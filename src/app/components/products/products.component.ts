import { Component } from '@angular/core';
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
  category = "";

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { 
    // to ensure we get products then route query at the start
    this.productService.getAll()
      .switchMap(products => {
        this.filteredProducts = this.products = products;
        return this.route.queryParamMap;
      })
      .subscribe(params => this.onCategoryChanged(params.get('category')));
  }

  onCategoryChanged(newCategory) {
    this.category = newCategory;
    this.filteredProducts = !newCategory ? this.products 
      : this.products.filter(p => p.category === newCategory);
  }

}
