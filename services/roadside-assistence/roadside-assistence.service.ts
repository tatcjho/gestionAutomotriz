import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoadsideAssistenceService {
  private next: any;

  constructor(
    private db: AngularFirestore,
    private storageService: StorageService
  ) { }

  public saveRSA(av: RoadSideAssistence) {
    return this.db.collection('options_roadside_assistence').doc(`${av.roadside_assistence_id}`).set(av)
  }

  public updateRSA(av: RoadSideAssistence) {
    return this.db.collection('options_roadside_assistence').doc(`${av.roadside_assistence_id}`).update(av)
  }

  public getRSA() {
    return this.db.collection('options_roadside_assistence', ref => ref.orderBy('roadside_assistence_id', 'asc')).valueChanges()
  }

  public getRSAId(rsaId: string) {
    return this.db.collection('options_roadside_assistence').doc(`${rsaId}`).valueChanges()
  }

  public getRSAById(roadside_assistence_id: string) {
    return this.db
      .collection("options_roadside_assistence")
      .doc(roadside_assistence_id)
      .valueChanges();
  }


  public deleteRSA(av: RoadSideAssistence) {
    return this.db.collection('options_roadside_assistence').doc(`${av.roadside_assistence_id}`).delete()
  }
}


