import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ProductItemComponent} from "../product-item/product-item.component";
import {AsyncPipe, NgClass, NgForOf} from "@angular/common";
import {Product} from "../../shared/models/product.model";
import {Router} from "@angular/router";
import {ProductService} from "../../shared/services/product.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ProductItemComponent,
    NgForOf
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  private router = inject(Router);
  private productService = inject(ProductService);
  productsSig = this.productService.productsSig;

  ngOnInit(): void {
    this.productService.getProducts();
  }

  navigateToAddProduct(): void {
    this.router.navigate(['/add-product']);  }
}
