import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProductService} from "../../shared/services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription, switchMap} from "rxjs";
import {Product} from "../../shared/models/product.model";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  updateProductForm!: FormGroup;
  errorUpdateMessage = false;
  private subscription: Subscription | null = null;

  ngOnInit(): void {
    this.updateProductForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      imageUrl: ['']
    });

    this.subscription = this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.productService.getProductById(id).subscribe({
        next: (product: Product) => {
          this.updateProductForm.patchValue({
            name: product.name,
            description: product.description,
            price: product.price,
            imageUrl: product.imageUrl
          });
        }
      });
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  navigateToProducts(): void {
    this.router.navigate(['']);
  }

  onUpdate(): void {
    if (this.updateProductForm.valid) {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      const { name, description, price, imageUrl } = this.updateProductForm.value;
      this.productService.updateProduct(id, name, description, price, imageUrl || null);
      this.navigateToProducts();
    } else {
      this.updateProductForm.markAllAsTouched();
    }
  }
}
