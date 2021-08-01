import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'app/interfaces/product';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from 'app/services/user/user.service';
import { StorageService } from 'app/services/storage/storage.service';
import { DateService } from 'app/services/date/date.service';
import { Users } from 'app/interfaces/user';

declare var $ : any
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  public user: Users;
  public arrayUsers: Array<Users> ;
  public isEdit = false;
  public imageSrc: any;
  public imageFile: any;
  public dataSource: MatTableDataSource<Users>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("TableUsers") paginator: MatPaginator;
  public displayedColumns: string[] = [
    "Id",
    "Nombre",
    "Apellido",
    "Correo",
    "Teléfono",
  ];

  constructor(
    private userService : UserService,
    private storageService: StorageService,
    private dateService: DateService
  ) { }

  ngOnInit(): void {
    this.user = {}
    this.getUsers();
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

  public getUsers() {
    this.userService.getUsers().subscribe(users => {
      this.arrayUsers = users;
      this.dataSource = new MatTableDataSource<Users>(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }


}
