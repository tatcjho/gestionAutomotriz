import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManoObra } from 'app/interfaces/mano_obra';
import { ManoService } from 'app/services/mano/mano.service';
import Swal from 'sweetalert2';

declare var $: any
@Component({
  selector: 'app-mano',
  templateUrl: './mano.component.html',
  styleUrls: ['./mano.component.css']
})
export class ManoComponent implements OnInit {
  public mano: ManoObra;
  public arrayMano: Array<ManoObra>;
  public isEdit = false;
  public dataSource: MatTableDataSource<ManoObra>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("TableProduct") paginator: MatPaginator;
  public displayedColumns: string[] = [
    "Id",
    "Profesion",
    "Precio por hora",
    "Sueldo anual",
    "Editar",
    "Eliminar",
  ];
  constructor(
    private manoService: ManoService
  ) { }

  ngOnInit(): void {
    this.mano = {}
    this.getMano();
  }

  public addMano(control: ManoObra, isValid: boolean, form: NgForm) {
    //console.log("hasta aqui en el add")

    if (!this.isEdit) {
      this.manoService.savemano(control).then(() => {
        //$("#modalActivo").modal("hide");
        this.showNotification('top', 'right', 'Ok ! Mano de obra agregado ', 'success')
        this.isEdit = false;
        form.resetForm();
      })
    }else {
      this.manoService.updatemano(control).then(()=>{
        this.showNotification('top', 'right', 'Ok ! Mano de obra editado con exito. ', 'success')
        this.isEdit = false;
      })
    }
  }

  
  public getMano() {
    this.manoService.getmano().subscribe(control => {
      this.arrayMano = control;
      this.dataSource = new MatTableDataSource<ManoObra>(control);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  public editActivo(control: ManoObra) {
    this.isEdit = true;
    this.mano = control;
    console.log(control)
  }

  public deleteActivo(control: ManoObra) {
    Swal.fire({
      text: "¿Desea eliminar esta mano de obra?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.manoService.deletemano(control).then(() => {
          this.showNotification('top', 'right', 'Ok ! Mano de obra eliminado', 'success')
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
