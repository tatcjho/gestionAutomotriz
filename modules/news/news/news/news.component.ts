import { Component, OnInit, ViewChild } from "@angular/core";
import { News } from "app/interfaces/news";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { NewsService } from "app/services/news/news.service";
import { StorageService } from "app/services/storage/storage.service";
import { DateService } from "app/services/date/date.service";
import { NgForm } from "@angular/forms";
import Swal from "sweetalert2";
import { UserService } from "app/services/user/user.service";
import { take } from "rxjs/operators";
import { Users } from "app/interfaces/user";

declare var $: any;
@Component({
  selector: "app-news",
  templateUrl: "./news.component.html",
  styleUrls: ["./news.component.css"],
})
export class NewsComponent implements OnInit {
  public news: News;
  public arrayNews: Array<News>;
  public isEdit = false;
  public users: Array<Users>;
  public arrayTokensUsers: Array<string> = [];
  public imageSrc: any;
  public imageFile: any;
  public dataSource: MatTableDataSource<News>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("TableNews") paginator: MatPaginator;
  public displayedColumns: string[] = [
    "Id",
    "Producto",
    "Descripción",
    "Editar",
    "Eliminar",
  ];
  constructor(
    private ns: NewsService,
    private storageService: StorageService,
    private dateService: DateService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.news = {};
    this.getNews();
    this.getUsers();
  }

  public getUsers() {
    this.userService
      .getUsers()
      .pipe(take(1))
      .subscribe((user) => {
        console.log(user);
        this.users = user;
        if (this.users) {
          this.getTokensUser();
        }
      });
  }

  public getTokensUser() {
    this.users.forEach((user) => {
      this.arrayTokensUsers.push(user.user_token);
    });
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

  public getNews() {
    this.ns.getNews().subscribe((news) => {
      this.arrayNews = news;
      this.dataSource = new MatTableDataSource<News>(news);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public addNews(news: News, isValid: boolean, form: NgForm) {
    if (!this.isEdit) {
      news.news_date = this.dateService.getDateCurrent();
      news.news_time = this.dateService.getTimeCurrent();
      news.news_status = true;
      this.ns.saveNews(news).then(() => {
        $("#modalNews").modal("hide");
        this.showNotification(
          "top",
          "right",
          "Ok ! Noticia creada con exito. ",
          "success"
        );
        this.isEdit = false;
        form.resetForm();
      });
    } else {
      this.ns.updateNews(news).then(() => {
        $("#modalProduct").modal("hide");
        this.showNotification(
          "top",
          "right",
          "Ok ! Noticia editada con exito. ",
          "success"
        );
        this.isEdit = false;
      });
    }
  }

  public newNews() {
    this.isEdit = false;
    // const file = document.querySelector('.file');
    // file.value = '';
    var id = new Date().getTime();
    this.news = {
      news_id: id.toString(),
      news_name: "",
      news_description: "",
      news_img: "",
      news_status: false,
    };
  }

  /**
   * *** Carga de imagen ***
   * @param event.
   */
  public onChangeImage(event) {
    Swal.fire({
      title: "Cargando imágen...",
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        Swal.showLoading();
      },
    });
    const files = event.srcElement.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result;
      };
      reader.readAsDataURL(files[0]);
    }
    this.upload(event);
  }

  public async upload(event) {
    const file = event.target.files[0];
    this.imageFile = file;
    if (this.imageFile) {
      this.news.news_img = await this.storageService.uploadFile(
        `news/news${this.news.news_img}.png`,
        this.imageFile
      );
      if (this.news.news_img) {
        Swal.fire("OK", "Imagen cargada correctamente!", "success");
      }
    }
    //  this.uploadDocumentToStorage();
  }

  public showNotification(from, align, msg, type) {
    $.notify(
      {
        message: "<b>" + msg + "</b> ",
      },
      {
        type: type,
        class: "notify",
        timer: 6000,
        placement: {
          from: from,
          align: align,
        },
      }
    );
  }

  public editNews(n: News) {
    this.isEdit = true;
    this.news = n;
  }

  public deleteNews(n: News) {
    Swal.fire({
      text: "¿Desea eliminar esta noticia?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.ns.deleteNews(n).then(() => {
          this.showNotification(
            "top",
            "right",
            "Ok ! Noticia eliminada correctamente.",
            "success"
          );
        });
      }
    });
  }
}
