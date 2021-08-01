import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { RecursosHumanos } from 'app/interfaces/recursos_humanos';

@Injectable({
  providedIn: 'root'
})
export class RrhhService {

  constructor(private db: AngularFirestore) { }

  public saverrhh(rrhh: RecursosHumanos) {
    return this.db.collection('rrhh').doc(`${rrhh.recursos_uid}`).set(rrhh)
  }
  public updaterrhh(rrhh: RecursosHumanos) {
    return this.db.collection('rrhh').doc(`${rrhh.recursos_uid}`).update(rrhh)
  }

  public getrrhh() {
    return this.db.collection('rrhh', ref => ref.orderBy('recursos_uid', 'asc')).valueChanges()
  }

  public getrrhhId(recursos_uid: string) {
    return this.db.collection('rrhh').doc(`${recursos_uid}`).valueChanges()
  }

  public getrrhhById(recursos_uid: string) {
    return this.db
      .collection("rrhh")
      .doc(recursos_uid)
      .valueChanges();
  }

  public deleterrhh(rrhh: RecursosHumanos) {
    return this.db.collection('rrhh').doc(`${rrhh.recursos_uid}`).delete()
  }
}
