import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DateFilterService {

  constructor(private db: AngularFirestore) { }

  public getFilterByDate(date_init: string, date_end: string) {
    return this.db.collection('request_roadside_assistence', ref => ref.where('request_roadside_assistence_date', '>=' , date_init).where('request_roadside_assistence_date','<=', date_end)).valueChanges()
  }
}
