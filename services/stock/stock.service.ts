import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { GestionStock } from 'app/interfaces/gestion_stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private db: AngularFirestore) { }
  
  
  public savestock(stock: GestionStock) {
    return this.db.collection('stock').doc(`${stock.gestion_uid}`).set(stock)
  }
  public updatestock(stock: GestionStock) {
    return this.db.collection('stock').doc(`${stock.gestion_uid}`).update(stock)
  }

  public getstock() {
    return this.db.collection('stock', ref => ref.orderBy('gestion_uid', 'asc')).valueChanges()
  }

  public getstockId(gestion_uid: string) {
    return this.db.collection('stock').doc(`${gestion_uid}`).valueChanges()
  }

  public getstockById(gestion_uid: string) {
    return this.db
      .collection("stock")
      .doc(gestion_uid)
      .valueChanges();
  }

  public deletestock(stock: GestionStock) {
    return this.db.collection('stock').doc(`${stock.gestion_uid}`).delete()
  }
}
