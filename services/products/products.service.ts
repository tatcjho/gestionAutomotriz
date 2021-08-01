import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { Product } from 'app/interfaces/product';
import { StorageService } from '../storage/storage.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private next: any;

  constructor(
    private db: AngularFirestore,
    private storageService: StorageService
    ) { }

  public saveProduct(product: Product) {
    return this.db.collection('products').doc(`${product.product_id}`).set(product)
  }

  public updateProduct(product: Product) {
    return this.db.collection('products').doc(`${product.product_id}`).update(product)
  }

  public getProducts() {
    return this.db.collection('products', ref => ref.orderBy('product_id', 'asc')).valueChanges()
  }

  public getProductId(productId: string) {
    return this.db.collection('products').doc(`${productId}`).valueChanges()
  }

  public getProductById(product_id: string) {
    return this.db
      .collection("products")
      .doc(product_id)
      .valueChanges();
  }


  public deleteProduct(product: Product) {
    return this.db.collection('products').doc(`${product.product_id}`).delete()
  }
}
