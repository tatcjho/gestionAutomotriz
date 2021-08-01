import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Activos } from 'app/interfaces/activos';
import { ActivoService } from 'app/services/activo/activo.service';

declare var $ : any
@Component({
  selector: 'app-activos',
  templateUrl: './activos.component.html',
  styleUrls: ['./activos.component.css']
})
export class ActivosComponent implements OnInit {


  public activo: Activos;
  public arrayActivos: Array<Activos> ;
  public isEdit = false;

  constructor(
    private activoService: ActivoService
  ) { }

  ngOnInit(): void {
    this.activo = {}
    //this.getProducts();
  }

  public addActivo(activo: Activos, isValid: boolean, form: NgForm) {
      console.log("hasta aqui en el add")
      this.activoService.saveActivo(activo).then(() => {
        $("#modalActivo").modal("hide");
        this.showNotification('top', 'right', 'Ok ! Activo agregado ', 'success')
        this.isEdit = false;
        form.resetForm();
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

  


