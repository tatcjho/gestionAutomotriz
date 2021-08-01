import { Component, OnInit, ViewChild } from '@angular/core';
// import { RoadSideAssistence } from 'app/interfaces/roadSideAssistence';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { RoadsideAssistenceService } from 'app/services/roadside-assistence/roadside-assistence.service';
import { StorageService } from 'app/services/storage/storage.service';
import { DateService } from 'app/services/date/date.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

declare var $ : any
@Component({
  selector: 'app-roadside',
  templateUrl: './roadside.component.html',
  styleUrls: ['./roadside.component.css']
})
export class RoadsideComponent implements OnInit {
  public rsa: RoadSideAssistence;
  public arrayRSA: Array<RoadSideAssistence> ;
  public isEdit = false;
  public imageSrc: any;
  public imageFile: any;
  public dataSource: MatTableDataSource<RoadSideAssistence>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("TableRSA") paginator: MatPaginator;
  public displayedColumns: string[] = [
    "Id",
    "Asistencia Vial",
    //"Descripción",
    "Editar",
    "Eliminar",
  ];

  constructor(
    private rsaService: RoadsideAssistenceService,
    private storageService: StorageService,
    private dateService: DateService
  ) { }

  ngOnInit(): void {
    this.rsa = {}
    this.getRSA();
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

  public getRSA() {
    this.rsaService.getRSA().subscribe(road => {
      this.arrayRSA= road;
      this.dataSource = new MatTableDataSource<RoadSideAssistence>(road);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  public addRSA(road: RoadSideAssistence, isValid: boolean, form: NgForm) {
    if (!this.isEdit) {
      road.roadside_assistence_date = this.dateService.getDateCurrent();
      road.roadside_assistence_time = this.dateService.getTimeCurrent();
      road.roadside_assistence_status = true;
      this.rsaService.saveRSA(road).then(() => {
        $("#modalRSA").modal("hide");
        this.showNotification('top', 'right', 'Ok ! Asistencia Vial creado con exito. ', 'success')
        this.isEdit = false;
        form.resetForm();
      })
    } else {
      this.rsaService.updateRSA(road).then(() => {
        $("#modalRSA").modal("hide");
        this.showNotification('top', 'right', 'Ok !  Asistencia Vial editada con exito. ', 'success')
        this.isEdit = false;
      })
    }
  }

  public newRSA() {
    this.isEdit = false;
    var id = new Date().getTime();
    
    this.rsa = {
      roadside_assistence_id: id.toString(),
      roadside_assistence_name: "",
      //roadside_assistence_description: "",
      roadside_assistence_img: "",
      roadside_assistence_status: false,

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
    this.rsa.roadside_assistence_img = await this.storageService.uploadFile(`roadside_assistence/roadside_assistence${this.rsa.roadside_assistence_id}.png`, this.imageFile)
    if ( this.rsa.roadside_assistence_img ) {
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

public editRSA(road: RoadSideAssistence) {
  this.isEdit = true;
  this.rsa = road;
}

public deleteRSA(road: RoadSideAssistence) {
  Swal.fire({
    text: "¿Desea eliminar esta Asistencia Vial?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar!',
    cancelButtonText: 'Cancelar!'
  }).then((result) => {
    if (result.isConfirmed) {
     this.rsaService.deleteRSA(road).then(() => {
       this.showNotification('top', 'right', 'Ok ! Asistencia Vial eliminado correctamente.', 'success')
     })
    }
  })
}


}
