import { Component, OnInit, ViewChild } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ControlMantenimiento } from 'app/interfaces/control_mantenimiento';
import { CmrService } from 'app/services/cmr/cmr.service';
import { DateService } from 'app/services/date/date.service';
import Swal from 'sweetalert2';

declare var $: any
@Component({
  selector: 'app-cmr',
  templateUrl: './cmr.component.html',
  styleUrls: ['./cmr.component.css']
})
export class CmrComponent implements OnInit {

  public control: ControlMantenimiento;
  public arrayControl: Array<ControlMantenimiento>;
  public isEdit = false;
  public dataSource: MatTableDataSource<ControlMantenimiento>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("TableProduct") paginator: MatPaginator;
  public displayedColumns: string[] = [
    "Id",
    "Procedimiento",
    "Ok",
    "Mantenimiento",
    "Datos",
    "Editar",
    "Eliminar",
  ];
  
  constructor(
    private cmrService: CmrService,
    private dateService: DateService) { }


  ngOnInit(): void {
    this.control = {}
    this.getControl();
  }

  public addControl(control: ControlMantenimiento, isValid: boolean, form: NgForm) {
    //console.log("hasta aqui en el add")

    if (!this.isEdit) {
      this.cmrService.saveControl(control).then(() => {
        //$("#modalActivo").modal("hide");
        this.showNotification('top', 'right', 'Ok ! Mantenimiento agregado ', 'success')
        this.isEdit = false;
        form.resetForm();
      })
    }else {
      this.cmrService.updateControl(control).then(()=>{
        this.showNotification('top', 'right', 'Ok ! Mantenimiento editado con exito. ', 'success')
        this.isEdit = false;
      })
    }
  }

  
  public getControl() {
    this.cmrService.getControl().subscribe(control => {
      this.arrayControl = control;
      this.dataSource = new MatTableDataSource<ControlMantenimiento>(control);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  public editActivo(control: ControlMantenimiento) {
    this.isEdit = true;
    this.control = control;
    console.log(control)
  }

  public deleteActivo(control: ControlMantenimiento) {
    Swal.fire({
      text: "¿Desea eliminar el producto?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cmrService.deleteControl(control).then(() => {
          this.showNotification('top', 'right', 'Ok ! Mantenimiento eliminado', 'success')
        })
      }
    })
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
