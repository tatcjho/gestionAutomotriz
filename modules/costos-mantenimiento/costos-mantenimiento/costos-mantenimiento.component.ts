import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CostosMantenimiento } from 'app/interfaces/costos_mantenimiento';
import { CostosMantenimientoService } from 'app/services/costos_mantenimiento/costos-mantenimiento.service';
import Swal from 'sweetalert2';

declare var $: any
@Component({
  selector: 'app-costos-mantenimiento',
  templateUrl: './costos-mantenimiento.component.html',
  styleUrls: ['./costos-mantenimiento.component.css']
})
export class CostosMantenimientoComponent implements OnInit {
  public costo: CostosMantenimiento;
  public arrayCosto: Array<CostosMantenimiento>;
  public isEdit = false;
  public dataSource: MatTableDataSource<CostosMantenimiento>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("TableProduct") paginator: MatPaginator;
  public displayedColumns: string[] = [
    "Id",
    "Items",
    "Cantidad",
    "Precio unitario",
    "Precio total",
    "Editar",
    "Eliminar",
  ];
  constructor(private costosService: CostosMantenimientoService) { }

  ngOnInit(): void {
    this.costo = {
      costos_precio_total:0
    }

    this.getCostos()
  }

  public addCostos(control: CostosMantenimiento, isValid: boolean, form: NgForm) {
    this.costo.costos_precio_total = control.costos_cantidad*control.costos_precio_unitario

    if (!this.isEdit) {
      this.costosService.savecostosMan(this.costo).then(() => {
        //$("#modalActivo").modal("hide");
        this.showNotification('top', 'right', 'Ok ! Costo agregado ', 'success')
        this.isEdit = false;

      })
    }else {
      this.costosService.updatecostosMan(this.costo).then(()=>{
    
        this.showNotification('top', 'right', 'Ok ! Costo editado con exito. ', 'success')
        this.isEdit = false;
      })
    }
  }

  
  public getCostos() {
    this.costosService.getcostosMans().subscribe(control => {
      this.arrayCosto = control;
      this.dataSource = new MatTableDataSource<CostosMantenimiento>(control);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  public editActivo(control: CostosMantenimiento) {
    this.isEdit = true;
    this.costo = control;
    console.log(control)
  }

  public deleteActivo(control: CostosMantenimiento) {
    Swal.fire({
      text: "¿Desea eliminar este costo?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.costosService.deletecostosMan(control).then(() => {
          this.showNotification('top', 'right', 'Ok ! Costo eliminado', 'success')
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
