import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HistorialMantenimiento } from 'app/interfaces/historial_mantenimiento';
import { HistorialService } from 'app/services/historial/historial.service';
import Swal from 'sweetalert2';

declare var $: any
@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  public historial: HistorialMantenimiento;
  public arrayHistorial: Array<HistorialMantenimiento>;
  public isEdit = false;
  public dataSource: MatTableDataSource<HistorialMantenimiento>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("TableProduct") paginator: MatPaginator;
  public displayedColumns: string[] = [
    "Id Dueño",
    "Fecha",
    "# Orden",
    "Horometro",
    "Problema",
    "Solucion",
    "Repuestos",
    "Observaciones",
    "Responsable",
    "Tiempo",
    "Editar",
    "Eliminar",
  ];
  constructor(private historialService: HistorialService) { }

  ngOnInit(): void {
    this.historial = {}
    this.getHistorial();
  }

  public addHistorial(control: HistorialMantenimiento, isValid: boolean, form: NgForm) {
    //console.log("hasta aqui en el add")

    if (!this.isEdit) {
      this.historialService.savehistorial(control).then(() => {
        //$("#modalActivo").modal("hide");
        this.showNotification('top', 'right', 'Ok ! Historial agregado ', 'success')
        this.isEdit = false;
        form.resetForm();
      })
    }else {
      this.historialService.updatehistorial(control).then(()=>{
        this.showNotification('top', 'right', 'Ok ! Historial editado con exito. ', 'success')
        this.isEdit = false;
      })
    }
  }

  
  public getHistorial() {
    this.historialService.gethistorials().subscribe(control => {
      this.arrayHistorial = control;
      this.dataSource = new MatTableDataSource<HistorialMantenimiento>(control);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  public editActivo(control: HistorialMantenimiento) {
    this.isEdit = true;
    this.historial = control;
    console.log(control)
  }

  public deleteActivo(control: HistorialMantenimiento) {
    Swal.fire({
      text: "¿Desea eliminar este historial?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.historialService.deletehistorial(control).then(() => {
          this.showNotification('top', 'right', 'Ok ! Historial eliminado', 'success')
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
