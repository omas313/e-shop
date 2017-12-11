import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CategoryService } from '../../shared/services/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {

  @Input("category") category = "";
  
  categories$: Observable<any[]>;

  constructor(private categoryService: CategoryService) {
    this.categories$ = this.categoryService.getAll();
  }

}
