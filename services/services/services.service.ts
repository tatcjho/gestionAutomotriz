import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { StorageService } from '../storage/storage.service';
import { Service } from 'app/interfaces/service';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private next: any;

  constructor(
    private db: AngularFirestore,
    private storageService: StorageService
  ) { }

  public saveService(service: Service) {
    return this.db.collection('services').doc(`${service.service_id}`).set(service)
  }

  public updateService(service: Service) {
    return this.db.collection('services').doc(`${service.service_id}`).update(service)
  }

  public getServices() {
    return this.db.collection('services', ref => ref.orderBy('service_id', 'asc')).valueChanges()
  }

  public getServiceId(serviceId: string) {
    return this.db.collection('services').doc(`${serviceId}`).valueChanges()
  }

  public getServiceById(serviceId: string) {
    return this.db
      .collection("services")
      .doc(serviceId)
      .valueChanges();
  }


  public deleteService(service: Service) {
    return this.db.collection('services').doc(`${service.service_id}`).delete()
  }
}
