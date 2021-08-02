import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ManoObra } from 'app/interfaces/mano_obra';

@Injectable({
  providedIn: 'root'
})
export class ManoService {

  constructor(private db: AngularFirestore) { }

  public savemano(mano: ManoObra) {
    return this.db.collection('mano').doc(`${mano.mano_uid}`).set(mano)
  }
  public updatemano(mano: ManoObra) {
    return this.db.collection('mano').doc(`${mano.mano_uid}`).update(mano)
  }

  public getmano() {
    return this.db.collection('mano', ref => ref.orderBy('mano_uid', 'asc')).valueChanges()
  }

  public getmanoId(mano_uid: string) {
    return this.db.collection('mano').doc(`${mano_uid}`).valueChanges()
  }

  public getmanoById(mano_uid: string) {
    return this.db
      .collection("mano")
      .doc(mano_uid)
      .valueChanges();
  }

  public deletemano(mano: ManoObra) {
    return this.db.collection('mano').doc(`${mano.mano_uid}`).delete()
  }
}
