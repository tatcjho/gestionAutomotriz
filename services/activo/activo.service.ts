import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { Activos } from 'app/interfaces/activos';

@Injectable({
  providedIn: 'root'
})
export class ActivoService {

  constructor(private db: AngularFirestore,
    ) { }

  public saveActivo(activo: Activos) {
    return this.db.collection('activos').doc(`${activo.activo_dueno_id}`).set(activo)
  }
  public updateActivo(activo: Activos) {
    return this.db.collection('activos').doc(`${activo.activo_dueno_id}`).update(activo)
  }

  public getActivos() {
    return this.db.collection('activos', ref => ref.orderBy('activo_dueno_id', 'asc')).valueChanges()
  }

  public getActivoId(activo_dueño_id: string) {
    return this.db.collection('activos').doc(`${activo_dueño_id}`).valueChanges()
  }

  public getActivosById(activo_dueño_id: string) {
    return this.db
      .collection("activos")
      .doc(activo_dueño_id)
      .valueChanges();
  }

  public deleteActivo(activo: Activos) {
    return this.db.collection('activos').doc(`${activo.activo_dueno_id}`).delete()
  }
}
