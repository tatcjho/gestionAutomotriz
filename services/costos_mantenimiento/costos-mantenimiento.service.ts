import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CostosMantenimiento } from 'app/interfaces/costos_mantenimiento';

@Injectable({
  providedIn: 'root'
})
export class CostosMantenimientoService {

  constructor(private db: AngularFirestore,) { }

  public savecostosMan(costosMan: CostosMantenimiento) {
    return this.db.collection('costos_mantenimiento').doc(`${costosMan.costos_uid}`).set(costosMan)
  }
  public updatecostosMan(costosMan: CostosMantenimiento) {
    return this.db.collection('costos_mantenimiento').doc(`${costosMan.costos_uid}`).update(costosMan)
  }

  public getcostosMans() {
    return this.db.collection('costos_mantenimiento', ref => ref.orderBy('costos_uid', 'asc')).valueChanges()
  }

  public getcostosManId(costos_uid: string) {
    return this.db.collection('costos_mantenimiento').doc(`${costos_uid}`).valueChanges()
  }

  public getcostosMansById(costos_uid: string) {
    return this.db
      .collection("costos_mantenimiento")
      .doc(costos_uid)
      .valueChanges();
  }

  public deletecostosMan(costosMan: CostosMantenimiento) {
    return this.db.collection('costos_mantenimiento').doc(`${costosMan.costos_uid}`).delete()
  }
}
