import { Component, OnInit, ViewChild } from '@angular/core';
import { Notifications } from 'app/interfaces/notification';
import { UserService } from 'app/services/user/user.service';
import { StorageService } from 'app/services/storage/storage.service';
import { NotificationsService } from 'app/services/notifications/notifications.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { DateService } from 'app/services/date/date.service';
import { Users } from 'app/interfaces/user';


declare var $: any;
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  public isEdit = false;
  public notification: Notifications;
  public user: Users;
  public arrayUsers: any[];
  public infoUser: Users;
  public allUser: Array<Users> = [];
  public selectAll = false;
  public notificationsList: Array<Notifications>;
  public arrayTokensUsers: Array<any> = [];
  public users: Array<Users>;
  public arrayAddUsers: Array<any> = [];
  public imageSrc: any;
  public imageFile: any;
  public dataSource: MatTableDataSource<Notifications>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("TableNotification") paginator: MatPaginator;
  public displayedColumns: string[] = [
    "Id",
    "Título",
    "Descripción",
    "Hora",
    "Fecha",
    "Ver"
  ];



  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private notificationService: NotificationsService,
    private router: Router,
    private dateService: DateService
  ) { }

  ngOnInit(): void {
    this.notification = {};
      this.user = {};
      //this.getUsers()
      this.getNotifications();
  }


      /**
   * *** Function para filtar en data table ***
   * @param event
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public onSelectAll(isSelectAll) {
    if (isSelectAll) {
      this.selectAll = true;
      this.arrayAddUsers = [];
    } else {
      this.selectAll = false;
    }
  }

  public getNotifications() {
    this.notificationService.getNotifications().subscribe(notifications => {
      this.notificationsList = notifications;
      this.dataSource = new MatTableDataSource<Notifications>(notifications);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  // public async getUsers() {
  //   (await this.usersService.getUserByEmails(this.user.user_email)).subscribe((user) => {
  //     this.user = user;
  //   });
  // }

  public getUsers() {
    this.users = []
    this.userService
      .getUsers()
      .pipe(take(1))
      .subscribe((user) => {
        //console.log(user);
        this.users = user;
        if (this.users) {
          this.getTokensUser();
        }
      });
  }

  public getUsersWithToken(){
    this.users = []
    this.userService
      .getUsersWithToken()
      .pipe(take(1))
      .subscribe((user) => {
        //console.log(user);
        this.users = user;
        if (this.users) {
          this.getTokensUser();
        }
      });
  }

  public getTokensUser() {
    this.arrayTokensUsers = [];
    this.users.forEach((user) => {
      this.arrayTokensUsers.push(user.user_token);
    });
  }

  


   public newNotification() {
    this.getUsers();
    this.getTokensUser();
    this.selectAll = false;
    var id = new Date().getTime();

    this.notification = {
      notifications_id: id.toString(),
      notifications_title: "",
      notifications_description: "",
      notifications_status: false,
      notifications_sent_to_all: false,
    };
  }

  public async addNotification(notification: Notifications) {
    
    // if (this.notification.notifications_sent_to_all === false) {
    //   Swal.fire(
    //     "Atención",
    //     "Debe seleccionar al menos un usuario ó la opción enviar a todos los usuarios",
    //     "error"
    //   );
    //   return;
    // } else {
      Swal.fire({
        
        text: "¿Confirma que desea enviar esta notificación?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, confirmo!',
        cancelButtonText: 'Cancelar!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          notification.notifications_date = this.dateService.getDateCurrent();
          notification.notifications_time = this.dateService.getTimeCurrent();
          notification.notifications_status = false;
          notification.notifications_sent_to_all= true
          this.selectAll = true;
          //notification.notifications_users = this.arrayTokensUsers;


          await this.notificationService.saveNotification(notification).then(()=>{
            //this.sendNotification(notification)
            this.showNotification(
              "top",
              "right",
              "Ok ! Notificación enviada correctamente.",
              "success"
            );
          })



          await this.users.forEach((user) => {
            this.notificationService.saveNotificationsByUsers(notification, user);
            console.log("entra en el foreac")
            notification.notifications_status = false;
          });


 
          
          

        }
      })
    

  }


  // public async selectedUser(i: number) {
  //   var exist = false;
  //   await this.arrayAddUsers.forEach(element => {
  //     if (this.arrayTokensUsers[i].id == element.id) {
  //       exist = true
  //     }
  //   });
  //   if (!exist) {
  //     this.arrayAddUsers.push(this.arrayTokensUsers[i]);
  //   }
  // }


  public viewNotification(notification: Notifications) {
    this.notification = notification;
  }

public showNotification(from, align, msg, type) {
  $.notify({
    message: "<b>" + msg + "</b> "

  }, {
    type: type,
    class: 'notify',
    timer: 6000,
    placement: {
      from: from,
      align: align
    }
  });
}


}
