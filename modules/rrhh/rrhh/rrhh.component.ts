import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RecursosHumanos } from 'app/interfaces/recursos_humanos';
import { RrhhService } from 'app/services/rrhh/rrhh.service';
import { RefCountSubscription } from 'rxjs/internal/operators/groupBy';
import Swal from 'sweetalert2';

declare var $: any
@Component({
  selector: 'app-rrhh',
  templateUrl: './rrhh.component.html',
  styleUrls: ['./rrhh.component.css']
})
export class RrhhComponent implements OnInit {

  public rrhh: RecursosHumanos;
  public arrayActivos: Array<RecursosHumanos>;
  public isEdit = false;
  public dataSource: MatTableDataSource<RecursosHumanos>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("TableProduct") paginator: MatPaginator;
  public displayedColumns: string[] = [
    "Id",
    "Nombre",
    "Apellido",
    "Profesion",
    "Edad",
    "Telefono",
    "Email",
    "Permiso de conducir",
    "Curriculum Vitae",
    "Editar",
    "Eliminar",
  ];
  constructor(private rhService: RrhhService) { }

  ngOnInit(): void {
    this.rrhh = {}
    this.getRRHH();
  }

  public addRRHH(rh: RecursosHumanos, isValid: boolean, form: NgForm) {
    //console.log("hasta aqui en el add")

    if (!this.isEdit) {
      this.rhService.saverrhh(rh).then(() => {
        $("#modalActivo").modal("hide");
        this.showNotification('top', 'right', 'Ok ! Persona agregada ', 'success')
        this.isEdit = false;
        form.resetForm();
      })
    }else {
      this.rhService.updaterrhh(rh).then(()=>{
        this.showNotification('top', 'right', 'Ok ! Persona editada con exito. ', 'success')
        this.isEdit = false;
      })
    }
  }

  public getRRHH() {
    this.rhService.getrrhh().subscribe(activos => {
      this.arrayActivos = activos;
      this.dataSource = new MatTableDataSource<RecursosHumanos>(activos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  public editActivo(activo: RecursosHumanos) {
    this.isEdit = true;
    this.rrhh = activo;
    console.log(activo)
  }

  public deleteActivo(activo: RecursosHumanos) {
    Swal.fire({
      text: "¿Desea eliminar esta persona?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.rhService.deleterrhh(activo).then(() => {
          this.showNotification('top', 'right', 'Ok ! Persona eliminada', 'success')
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
