import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { Promotions } from 'app/interfaces/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {

  constructor(private db: AngularFirestore) { }

  public savePromotions(promotion: Promotions) {
    return this.db.collection('promotions').doc(`${promotion.promotion_id}`).set(promotion);
  }

  public updatePromotions(promotion: Promotions) {
    return this.db.collection('promotions').doc(`${promotion.promotion_id}`).update(promotion);
  }

  public getPromotions() {
    return this.db.collection('promotions').valueChanges()
  }

  public deletePromotion(promotion: Promotions) {
    return this.db.collection('promotions').doc(`${promotion.promotion_id}`).delete()
  }
}
