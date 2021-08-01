import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { StorageService } from '../storage/storage.service';
import { BranchOffices } from 'app/interfaces/branch-offices';

@Injectable({
  providedIn: 'root'
})
export class BranchOfficesService {
  private next: any;

  constructor(
    private db: AngularFirestore,
    private storageService: StorageService
  ) { }

  public saveBranchOffice(branchOffice: BranchOffices) {
    return this.db.collection('branch_offices').doc(`${branchOffice.branch_offices_id}`).set(branchOffice)
  }

  public updateBranchOffice(branchOffice: BranchOffices) {
    return this.db.collection('branch_offices').doc(`${branchOffice.branch_offices_id}`).update(branchOffice)
  }

  public getBranchOffices() {
    return this.db.collection('branch_offices', ref => ref.orderBy('branch_offices_id', 'asc')).valueChanges()
  }

  public getBranchOfficeId(branchOfficeId: string) {
    return this.db.collection('branch_offices').doc(`${branchOfficeId}`).valueChanges()
  }

  public getbranchOfficeById(branch_offices_id: string) {
    return this.db
      .collection("branch_offices")
      .doc(branch_offices_id)
      .valueChanges();
  }

  public deleteBranchOffice(branchOffice: BranchOffices) {
    return this.db.collection('branch_offices').doc(`${branchOffice.branch_offices_id}`).delete()
  }
}
