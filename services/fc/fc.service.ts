import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FichaControl } from 'app/interfaces/ficha_control';

@Injectable({
  providedIn: 'root'
})
export class FcService {

  constructor(private db: AngularFirestore) { }

  public saveficha(ficha: FichaControl) {
    return this.db.collection('ficha_control').doc(`${ficha.ficha_uid}`).set(ficha)
  }
  public updateficha(ficha: FichaControl) {
    return this.db.collection('ficha_control').doc(`${ficha.ficha_uid}`).update(ficha)
  }

  public getficha() {
    return this.db.collection('ficha_control', ref => ref.orderBy('ficha_uid', 'asc')).valueChanges()
  }

  public getfichaId(ficha_uid: string) {
    return this.db.collection('ficha_control').doc(`${ficha_uid}`).valueChanges()
  }

  public getfichaById(ficha_uid: string) {
    return this.db
      .collection("ficha_control")
      .doc(ficha_uid)
      .valueChanges();
  }

  public deleteficha(ficha: FichaControl) {
    return this.db.collection('ficha_control').doc(`${ficha.ficha_uid}`).delete()
  }
}
