import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { RequestRoadSideAssistence } from 'app/interfaces/requestRoadSideAssistence';

@Injectable({
  providedIn: 'root'
})
export class RequeastRoadsideAssistenceService {

  constructor( private db: AngularFirestore,) { }

  public getRequests() {
    return this.db.collection('request_roadside_assistence', ref => ref.orderBy('request_roadside_assistence_id', 'asc')).valueChanges()
  }

  public updateStatusInRequest(request: RequestRoadSideAssistence) {
    return this.db.collection('request_roadside_assistence').doc(`${request.request_roadside_assistence_id}`).update(request);
  }


  public getRequestsId(requestId: string) {
    return this.db.collection('request_roadside_assistence').doc(`${requestId}`).valueChanges()
  }

  public getRequeststById(request_roadside_assistence_id: string) {
    return this.db
      .collection("request_roadside_assistence")
      .doc(request_roadside_assistence_id)
      .valueChanges();
  }


}
