import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReporteMantenimiento } from 'app/interfaces/reportes_mantenimiento';

@Injectable({
  providedIn: 'root'
})
export class RmService {

  constructor(private db: AngularFirestore) { }

  public saveRM(rm: ReporteMantenimiento) {
    return this.db.collection('reporte_mantenimiento').doc(`${rm.reporte_uid}`).set(rm)
  }
  public updateRM(rm: ReporteMantenimiento) {
    return this.db.collection('reporte_mantenimiento').doc(`${rm.reporte_uid}`).update(rm)
  }

  public getRM() {
    return this.db.collection('reporte_mantenimiento', ref => ref.orderBy('reporte_uid', 'asc')).valueChanges()
  }

  public getRMId(reporte_uid: string) {
    return this.db.collection('reporte_mantenimiento').doc(`${reporte_uid}`).valueChanges()
  }

  public getRMById(reporte_uid: string) {
    return this.db
      .collection("reporte_mantenimiento")
      .doc(reporte_uid)
      .valueChanges();
  }

  public deleteRM(rm: ReporteMantenimiento) {
    return this.db.collection('reporte_mantenimiento').doc(`${rm.reporte_uid}`).delete()
  }
}
