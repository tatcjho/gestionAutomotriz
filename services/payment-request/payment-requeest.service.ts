import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Payment } from 'app/interfaces/payment_request';
import { Users } from 'app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class PaymentRequeestService {

  constructor(private db: AngularFirestore) { }

  public savePaymentRequest(payment: Payment) {
    return this.db.collection('payment_requests').doc(`${payment.payment_request_uid}`).set(payment)
  }

   public savePaymentRequestsByUsers(payment: Payment, user: Users) {
     return this.db.collection('users').doc(`${user.user_email}`).collection(`payment_requests`).doc(`${payment.payment_request_uid}`).set(payment)
   }

  public getPaymentRequests() {
    return this.db.collection('payment_requests', ref => ref.orderBy('payment_request_uid', 'asc')).valueChanges()
  }
}
