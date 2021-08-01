import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GestionStock } from 'app/interfaces/gestion_stock';
import { StockService } from 'app/services/stock/stock.service';
import Swal from 'sweetalert2';

declare var $: any
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  public stock: GestionStock;
  public arrayStock: Array<GestionStock>;
  public isEdit = false;
  public dataSource: MatTableDataSource<GestionStock>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("TableProduct") paginator: MatPaginator;
  public displayedColumns: string[] = [
    "Id",
    "Nombre",
    "Cantidad",
    "Precio ingreso",
    "Precio Venta",
    "Editar",
    "Eliminar",
  ];
  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.stock = {}
    this.getStock()
  }
  public addStock(s: GestionStock, isValid: boolean, form: NgForm) {
    //console.log("hasta aqui en el add")

    if (!this.isEdit) {
      this.stockService.savestock(s).then(() => {
        //$("#modalActivo").modal("hide");
        this.showNotification('top', 'right', 'Ok ! Stock agregado ', 'success')
        this.isEdit = false;
        form.resetForm();
      })
    } else {
      this.stockService.updatestock(s).then(() => {
        this.showNotification('top', 'right', 'Ok ! Stock editado con exito. ', 'success')
        this.isEdit = false;
      })
    }
  }


  public getStock() {
    this.stockService.getstock().subscribe(r => {
      this.arrayStock = r;
      this.dataSource = new MatTableDataSource<GestionStock>(r);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  public editActivo(s: GestionStock) {
    this.isEdit = true;
    this.stock = s;
    console.log(s)
  }

  public deleteActivo(s: GestionStock) {
    Swal.fire({
      text: "¿Desea eliminar este Stock?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.stockService.deletestock(s).then(() => {
          this.showNotification('top', 'right', 'Ok ! Stock eliminado', 'success')
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
