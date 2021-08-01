import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { StorageService } from '../storage/storage.service';
import { Notifications } from 'app/interfaces/notification';
import { Users } from 'app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    private db: AngularFirestore,
    private storageService: StorageService
  ) { }

  public saveNotification(notification: Notifications) {
    return this.db.collection('notifications').doc(`${notification.notifications_id}`).set(notification)
  }

  public saveNotificationsByUsers(notification: Notifications, user: Users) {
    return this.db.collection('users').doc(`${user.user_email}`).collection(`notification`).doc(`${notification.notifications_id}`).set(notification)
  }

  public getNotifications() {
    return this.db.collection('notifications', ref => ref.orderBy('notifications_id', 'asc')).valueChanges()
  }
}
