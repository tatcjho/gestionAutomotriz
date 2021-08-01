import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ControlMantenimiento } from 'app/interfaces/control_mantenimiento';

@Injectable({
  providedIn: 'root'
})
export class CmrService {

  constructor(private db: AngularFirestore,) { }

  public saveControl(control: ControlMantenimiento) {
    return this.db.collection('control_mantenimiento_rutinario').doc(`${control.control_man_id}`).set(control)
  }
  public updateControl(control: ControlMantenimiento) {
    return this.db.collection('control_mantenimiento_rutinario').doc(`${control.control_man_id}`).update(control)
  }

  public getControl() {
    return this.db.collection('control_mantenimiento_rutinario', ref => ref.orderBy('control_man_id', 'asc')).valueChanges()
  }

  public getControlId(control_man_id: string) {
    return this.db.collection('control_mantenimiento_rutinario').doc(`${control_man_id}`).valueChanges()
  }

  public getControlById(control_man_id: string) {
    return this.db
      .collection("control_mantenimiento_rutinario")
      .doc(control_man_id)
      .valueChanges();
  }

  public deleteControl(control: ControlMantenimiento) {
    return this.db.collection('control_mantenimiento_rutinario').doc(`${control.control_man_id}`).delete()
  }
}

