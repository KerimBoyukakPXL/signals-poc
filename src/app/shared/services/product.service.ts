import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Product} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http = inject(HttpClient);
  apiUrl = 'http://localhost:8090/api/product';
  private products = signal<Product[]>([]);

  productsSig = computed(() => {
    return this.products();
  });

  getProducts() {
    this.http.get<Product[]>(`${this.apiUrl}`).subscribe(products => {
      this.products.set(products);
    });
  }
  getProductById(id: number) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
  uploadProduct(name: string, description: string, price: number, imageUrl: string | null) {
    const body = { name, description, price, imageUrl };
    return this.http.post<Product>(`${this.apiUrl}`, body).subscribe({
      next: newProduct => {
        this.products.update(current => [...current, newProduct]);
      }
    });
  }
  updateProduct(id: number, name: string, description: string, price: number, imageUrl: string | null) {
    const body = { name, description, price, imageUrl };
    return this.http.put<Product>(`${this.apiUrl}/${id}`, body).subscribe({
      next: updatedProduct => {
        this.products.update(current => current.map(p => p.id === id ? updatedProduct : p));
      }
    });
  }
  deleteProductById(id: number) {
    this.http.delete<string>(`${this.apiUrl}/delete/${id}`, { responseType: 'text' as 'json' }).subscribe({
      next: () => {
        this.products.update(current => current.filter(p => p.id !== id));
      }
    });
  }
}
