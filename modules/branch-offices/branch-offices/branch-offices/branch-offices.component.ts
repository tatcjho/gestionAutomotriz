import { Component, OnInit, ViewChild } from '@angular/core';
import { BranchOffices } from 'app/interfaces/branch-offices';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BranchOfficesService } from 'app/services/branch-offices/branch-offices.service';
import { StorageService } from 'app/services/storage/storage.service';
import { DateService } from 'app/services/date/date.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

declare var $ : any
@Component({
  selector: 'app-branch-offices',
  templateUrl: './branch-offices.component.html',
  styleUrls: ['./branch-offices.component.css']
})
export class BranchOfficesComponent implements OnInit {
  public branchOffice: BranchOffices;
  public arrayBranchOffice: Array<BranchOffices> ;
  public isEdit = false;
  public imageSrc: any;
  public imageFile: any;
  public dataSource: MatTableDataSource<BranchOffices>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("TableProduct") paginator: MatPaginator;
  public displayedColumns: string[] = [
    "Id",
    "Sucursal",
    "Dirección",
    "Link Ubicación",
    "Teléfono",
    "Latitud",
    "Longitud",
    "Horario de atención",
    "Editar",
    "Eliminar",
  ];

  constructor(
    private branchService: BranchOfficesService,
    private storageService: StorageService,
    private dateService: DateService
  ) { }

  ngOnInit(): void {
    this.branchOffice = {}
    this.getBranchOffices();
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

  public getBranchOffices() {
    this.branchService.getBranchOffices().subscribe(branch => {
      this.arrayBranchOffice = branch;
      this.dataSource = new MatTableDataSource<BranchOffices>(branch);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  public addBranchOffice(branch: BranchOffices, isValid: boolean, form: NgForm) {
    if (!this.isEdit) {
      // branch.product_date = this.dateService.getDateCurrent();
      // product.product_time = this.dateService.getTimeCurrent();
      branch.branch_offices_status = true;
      this.branchService.saveBranchOffice(branch).then(() => {
        $("#modalBranchOffices").modal("hide");
        this.showNotification('top', 'right', 'Ok ! Sucursal creada con exito. ', 'success')
        this.isEdit = false;
        form.resetForm();
      })
    } else {
      this.branchService.updateBranchOffice(branch).then(() => {
        $("#modalBranchOffices").modal("hide");
        this.showNotification('top', 'right', 'Ok ! Sucursal editada con exito. ', 'success')
        this.isEdit = false;
      })
    }
  }

  public newBranchOffice() {
    this.isEdit = false;
    // const file = document.querySelector('.file');
    // file.value = '';
     var id = new Date().getTime();
    this.branchOffice = {
      branch_offices_id: id.toString(),
      branch_offices_name: "",
      branch_offices_phone: "",
      branch_offices_img: "",
      branch_offices_status: false,
      branch_offices_lat: "",
      branch_offices_lng: ""
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
    this.branchOffice.branch_offices_img = await this.storageService.uploadFile(`branchOffice/branchOffice${this.branchOffice.branch_offices_id}.png`, this.imageFile)
    if ( this.branchOffice.branch_offices_img) {
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

public editBranchOffice(branch: BranchOffices) {
  this.isEdit = true;
  this.branchOffice = branch;
}

public deleteBranchOffice(branch: BranchOffices) {
  Swal.fire({
    text: "¿Desea eliminar la sucursal?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar!',
    cancelButtonText: 'Cancelar!'
  }).then((result) => {
    if (result.isConfirmed) {
     this.branchService.deleteBranchOffice(branch).then(() => {
       this.showNotification('top', 'right', 'Ok ! Sucursal eliminada correctamente.', 'success')
     })
    }
  })
}


}
