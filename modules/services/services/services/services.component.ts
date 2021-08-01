import { Component, OnInit, ViewChild } from '@angular/core';
import { Service } from 'app/interfaces/service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ServicesService } from 'app/services/services/services.service';
import { StorageService } from 'app/services/storage/storage.service';
import { DateService } from 'app/services/date/date.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

declare var $ : any
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  public service: Service;
  public arrayService: Array<Service> ;
  public isEdit = false;
  public imageSrc: any;
  public imageFile: any;
  public dataSource: MatTableDataSource<Service>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("TableProduct") paginator: MatPaginator;
  public displayedColumns: string[] = [
    "Id",
    "Servicio",
    "Descripción",
    "Editar",
    "Eliminar",
  ];
  constructor(
    private serv: ServicesService,
    private storageService: StorageService,
    private dateService: DateService) { }

  ngOnInit(): void {
    this.service = {}
    this.getServices();
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

  public getServices(){
    this.serv.getServices().subscribe(services => {
      this.arrayService = services;
      this.dataSource = new MatTableDataSource<Service>(services);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  public addService(service: Service, isValid: boolean, form: NgForm) {
    if (!this.isEdit) {
      service.service_date = this.dateService.getDateCurrent();
      service.service_time  = this.dateService.getTimeCurrent();
      service.service_status = true;
      this.serv.saveService(service).then(() => {
        $("#modalService").modal("hide");
        this.showNotification('top', 'right', 'Ok ! Servicio creado con exito. ', 'success')
        this.isEdit = false;
        form.resetForm();
      })
    } else {
      this.serv.updateService(service).then(() => {
        $("#modalService").modal("hide");
        this.showNotification('top', 'right', 'Ok ! Servicio editado con exito. ', 'success')
        this.isEdit = false;
      })
    }
  }

  public newService() {
    this.isEdit = false;
    // const file = document.querySelector('.file');
    // file.value = '';
     var id = new Date().getTime();
    this.service = {
      service_id: id.toString(),
      service_name: "",
      service_description: "",
      service_img: "",
      service_status: false,

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
    this.service.service_img = await this.storageService.uploadFile(`service/service${this.service.service_id}.png`, this.imageFile)
    if ( this.service.service_img) {
      Swal.fire("OK", "Imagen cargada correctamente!", "success");
    }

  }
  //  this.uploadDocumentToStorage();
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

public editService(servi: Service) {
  this.isEdit = true;
  this.service = servi;
}

public deleteService( servi: Service) {
  Swal.fire({
    text: "¿Desea eliminar el servicio?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar!',
    cancelButtonText: 'Cancelar!'
  }).then((result) => {
    if (result.isConfirmed) {
     this.serv.deleteService(servi).then(() => {
       this.showNotification('top', 'right', 'Ok ! Servicio eliminado correctamente.', 'success')
     })
    }
  })
}


}
