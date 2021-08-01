import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import {Users} from  'app/interfaces/user';
  import { from } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private db: AngularFirestore) {}

  /**
   * *** Retorna la data del usuario anexando el id de la collection ***
   */
  public getUsers() {
     return this.db
      .collection<Users>("users", ref => ref.where('user_email', '!=' , 'vazsegurosapp@gmail.com'))
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as Users;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  public getUsersWithToken() {
    return this.db
     .collection<Users>("users", ref => ref.where('user_token', '!=' , ''))
     .snapshotChanges()
     .pipe(
       map((actions) => {
         return actions.map((a) => {
           const data = a.payload.doc.data() as Users;
           const id = a.payload.doc.id;
           return { id, ...data };
         });
       })
     );
 }

  /**
   * *** Retorna la info del usuario consultado por ID ***
   * @param userId 
   */
  public getUserById(userId: string) {
    return this.db.collection("users").doc(`${userId}`).valueChanges();
  }

  async getUserByEmails(uid: string) {
    return this.db.collection<Users>("users").doc(uid).valueChanges();
  }

  public updateStatusInRequest(user: Users) {
    return this.db.collection('users').doc(`${user.user_uid}`).update(user);
  }
}
