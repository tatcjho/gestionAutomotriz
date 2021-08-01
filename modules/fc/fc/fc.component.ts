import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FichaControl } from 'app/interfaces/ficha_control';
import { FcService } from 'app/services/fc/fc.service';
import Swal from 'sweetalert2';

declare var $: any
@Component({
  selector: 'app-fc',
  templateUrl: './fc.component.html',
  styleUrls: ['./fc.component.css']
})
export class FcComponent implements OnInit {
  public ficha: FichaControl;
  public arrayFicha: Array<FichaControl>;
  public isEdit = false;
  public dataSource: MatTableDataSource<FichaControl>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("TableProduct") paginator: MatPaginator;
  public displayedColumns: string[] = [
    "Id",
    "Descripcion",
    "Bueno",
    "Ajustado",
    "Reparacion",
    "Editar",
    "Eliminar",
  ];
  constructor(private fichaService: FcService) { }

  ngOnInit(): void {
    this.ficha = {}
    this.getFicha()
  }

  public addFicha(f: FichaControl, isValid: boolean, form: NgForm) {
    //console.log("hasta aqui en el add")

    if (!this.isEdit) {
      this.fichaService.saveficha(f).then(() => {
        //$("#modalActivo").modal("hide");
        this.showNotification('top', 'right', 'Ok ! Ficha agregado ', 'success')
        this.isEdit = false;
        form.resetForm();
      })
    } else {
      this.fichaService.updateficha(f).then(() => {
        this.showNotification('top', 'right', 'Ok ! Ficha editado con exito. ', 'success')
        this.isEdit = false;
      })
    }
  }


  public getFicha() {
    this.fichaService.getficha().subscribe(r => {
      this.arrayFicha = r;
      this.dataSource = new MatTableDataSource<FichaControl>(r);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  public editActivo(f: FichaControl) {
    this.isEdit = true;
    this.ficha = f;
    console.log(f)
  }

  public deleteActivo(f: FichaControl) {
    Swal.fire({
      text: "¿Desea eliminar esta ficha?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.fichaService.deleteficha(f).then(() => {
          this.showNotification('top', 'right', 'Ok ! Ficha eliminado', 'success')
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
