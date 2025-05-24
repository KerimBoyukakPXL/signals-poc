import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {ProductService} from "../../shared/services/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  fb = inject(FormBuilder);
  productService = inject(ProductService);
  router = inject(Router);

  uploadProductForm!: FormGroup;


  ngOnInit(): void {
    this.uploadProductForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      imageUrl: ['']
    });
  }
  navigateToProducts() {
    this.router.navigate(['']);
  }

  onUpload() {
    if (this.uploadProductForm.valid) {
      const { name, description, price, imageUrl } = this.uploadProductForm.value;
      this.productService.uploadProduct(name, description, price, imageUrl || null);
      this.navigateToProducts();
    } else {
      this.uploadProductForm.markAllAsTouched();
    }
  }
}
