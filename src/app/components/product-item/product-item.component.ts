import {Component, EventEmitter, Output, Input, Inject, inject} from '@angular/core';
import {Product} from "../../shared/models/product.model";
import {ProductService} from "../../shared/services/product.service";
import {Router} from "@angular/router";
import {DecimalPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [
    NgIf,
    DecimalPipe,
    NgIf
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  @Input() product: Product = {} as Product;
  @Output() productDeleted: EventEmitter<void> = new EventEmitter<void>();

  router = inject(Router);
  productService = inject(ProductService);


  deleteProduct(): void {
    this.productService.deleteProductById(this.product.id);
  }

  getLimitedDescription(description: string): string {
    return description.length > 80 ? description.substring(0, 80) + '...' : description;
  }
  navigateToEditProduct(): void {
    this.router.navigate(['/update-product', this.product.id]);
  }
}
