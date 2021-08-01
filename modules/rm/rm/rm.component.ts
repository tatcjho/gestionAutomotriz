import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReporteMantenimiento } from 'app/interfaces/reportes_mantenimiento';
import { RmService } from 'app/services/rm/rm.service';
import Swal from 'sweetalert2';

declare var $: any
@Component({
  selector: 'app-rm',
  templateUrl: './rm.component.html',
  styleUrls: ['./rm.component.css']
})
export class RmComponent implements OnInit {
  public reporte: ReporteMantenimiento;
  public arrayReporte: Array<ReporteMantenimiento>;
  public isEdit = false;
  public dataSource: MatTableDataSource<ReporteMantenimiento>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("TableProduct") paginator: MatPaginator;
  public displayedColumns: string[] = [
    "Id",
    "Servicio",
    "Horometro",
    "Observaciones",
    "Responsable",
    "Editar",
    "Eliminar",
  ];
  constructor(private rmservice: RmService) { }

  ngOnInit(): void {
    this.reporte = {}
    this.getReporte()
  }
  
  public addReporte(rep: ReporteMantenimiento, isValid: boolean, form: NgForm) {
    //console.log("hasta aqui en el add")

    if (!this.isEdit) {
      this.rmservice.saveRM(rep).then(() => {
        //$("#modalActivo").modal("hide");
        this.showNotification('top', 'right', 'Ok ! Reporte agregado ', 'success')
        this.isEdit = false;
        form.resetForm();
      })
    }else {
      this.rmservice.updateRM(rep).then(()=>{
        this.showNotification('top', 'right', 'Ok ! Reporte editado con exito. ', 'success')
        this.isEdit = false;
      })
    }
  }

  
  public getReporte() {
    this.rmservice.getRM().subscribe(r => {
      this.arrayReporte = r;
      this.dataSource = new MatTableDataSource<ReporteMantenimiento>(r);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  public editActivo(rep: ReporteMantenimiento) {
    this.isEdit = true;
    this.reporte = rep;
    console.log(rep)
  }

  public deleteActivo(r: ReporteMantenimiento) {
    Swal.fire({
      text: "¿Desea eliminar este reporte?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.rmservice.deleteRM(r).then(() => {
          this.showNotification('top', 'right', 'Ok ! Reporte eliminado', 'success')
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
