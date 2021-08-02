import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HistorialMantenimiento } from 'app/interfaces/historial_mantenimiento';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  constructor(private db: AngularFirestore,) { }

  public savehistorial(historial: HistorialMantenimiento) {
    return this.db.collection('historial').doc(`${historial.hist_dueno_uid}`).set(historial)
  }
  public updatehistorial(historial: HistorialMantenimiento) {
    return this.db.collection('historial').doc(`${historial.hist_dueno_uid}`).update(historial)
  }

  public gethistorials() {
    return this.db.collection('historial', ref => ref.orderBy('hist_dueno_uid', 'asc')).valueChanges()
  }

  public gethistorialId(hist_dueno_uid: string) {
    return this.db.collection('historial').doc(`${hist_dueno_uid}`).valueChanges()
  }

  public gethistorialsById(hist_dueno_uid: string) {
    return this.db
      .collection("historial")
      .doc(hist_dueno_uid)
      .valueChanges();
  }

  public deletehistorial(historial: HistorialMantenimiento) {
    return this.db.collection('historial').doc(`${historial.hist_dueno_uid}`).delete()
  }
}
