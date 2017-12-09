import { ProductService } from '../../../services/product.service';
import { Category } from './../../../models/category';
import { Product } from '../../../models/product';
import { CategoryService } from '../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { CustomValidators } from 'ng2-validation';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.css']
})
export class AdminProductFormComponent implements OnInit {

  form: FormGroup;
  
  id: string;
  product = {
    title: '',
    imageUrl: '',
    price: 0, 
    category: ''
  };
  
  categories$: Observable<any[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private fb: FormBuilder
  ) { 
    
    // get categories observable from db
    this.categories$ = this.categoryService.getAll();
    
    // check params to see if we are editing
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.id)
      this.productService.getProduct(this.id)
        .take(1)
        .subscribe(p => this.product = p);
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      price: ['', [ 
        Validators.required, 
        CustomValidators.min(0)
      ]],
      category: ['', Validators.required],
      imageUrl: ['', [
        Validators.required, 
        CustomValidators.url
      ]]
    });
  }

  submit() {
    // check id theres an id to decide whether we create or update
    if (this.id) this.productService.update(this.id, this.product);
    else this.productService.create(this.product);
    
    // here we are being optimistic about the server response, we immediately
    // navigate away and expect the products page to load the new product soon
    this.router.navigateByUrl("/admin/products");
  }
  
  delete() {
    if (!confirm("Delete " + this.product.title + "?")) return;

    this.productService.delete(this.id);
    this.router.navigateByUrl("/admin/products");
  }

  get title() { return this.form.get("title") as FormControl; }
  get price() { return this.form.get("price") as FormControl; }
  get category() { return this.form.get("category") as FormControl; }
  get imageUrl() { return this.form.get("imageUrl") as FormControl; }

}
