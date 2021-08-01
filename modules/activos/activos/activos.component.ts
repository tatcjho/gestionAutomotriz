import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Activos } from 'app/interfaces/activos';
import { ActivoService } from 'app/services/activo/activo.service';
import { DateService } from 'app/services/date/date.service';
import Swal from 'sweetalert2';

declare var $: any
@Component({
  selector: 'app-activos',
  templateUrl: './activos.component.html',
  styleUrls: ['./activos.component.css']
})
export class ActivosComponent implements OnInit {


  public activo: Activos;
  public arrayActivos: Array<Activos>;
  public isEdit = false;
  public dataSource: MatTableDataSource<Activos>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("TableProduct") paginator: MatPaginator;
  public displayedColumns: string[] = [
    "Id Dueño",
    "Marca",
    "Modelo",
    "Año",
    "Horómetro",
    "Tipo de maquina",
    "Color",
    "Placas",
    "Motor",
    "Potencia",
    "Torque",
    "Combustible",
    "Transmicion",
    "Tipo de dirección",
    "Editar",
    "Eliminar",
  ];

  constructor(
    private activoService: ActivoService,
    private dateService: DateService) { }

  ngOnInit(): void {
    this.activo = {}
    this.getActivos();
  }

  public addActivo(activo: Activos, isValid: boolean, form: NgForm) {
    //console.log("hasta aqui en el add")

    if (!this.isEdit) {
      this.activoService.saveActivo(activo).then(() => {
        $("#modalActivo").modal("hide");
        this.showNotification('top', 'right', 'Ok ! Activo agregado ', 'success')
        this.isEdit = false;
        form.resetForm();
      })
    }else {
      this.activoService.updateActivo(activo).then(()=>{
        this.showNotification('top', 'right', 'Ok ! Producto editado con exito. ', 'success')
        this.isEdit = false;
      })
    }
  }

  public getActivos() {
    this.activoService.getActivos().subscribe(activos => {
      this.arrayActivos = activos;
      this.dataSource = new MatTableDataSource<Activos>(activos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  public editActivo(activo: Activos) {
    this.isEdit = true;
    this.activo = activo;
    console.log(activo)
  }

  public deleteActivo(activo: Activos) {
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
        this.activoService.deleteActivo(activo).then(() => {
          this.showNotification('top', 'right', 'Ok ! Activo eliminado', 'success')
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




