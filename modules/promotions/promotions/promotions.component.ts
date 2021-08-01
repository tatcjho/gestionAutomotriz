import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Promotions } from 'app/interfaces/promotions';
import { DateService } from 'app/services/date/date.service';
import { PromotionsService } from 'app/services/promotions/promotions.service';
import { StorageService } from 'app/services/storage/storage.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {

  public promotion: Promotions;

  displayedColumns: string[] = ['id', 'name', 'description', 'date', 'time', 'edit', 'delete'];
  dataSource: MatTableDataSource<Promotions>;
  @ViewChild('promotions') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public isEdit = false;
  public imageSrc: any = '';
  public imageFile: any;
  constructor(private promotionService: PromotionsService,
    private dateService: DateService,
    private storageService: StorageService) { }

  ngOnInit(): void {
    this.promotion = {};
    this.getPromotions()
  }

  public getPromotions() {
    this.promotionService.getPromotions().subscribe(promotions => {
      this.dataSource = new MatTableDataSource<Promotions>(promotions);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  public newPromotion() {
    this.isEdit = false;
    this.promotion = {};
    this.promotion.promotion_id = new Date().getTime().toString()
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public async addPromotion(promotion: Promotions, isValid: boolean, form: NgForm) {
    if (isValid) {
      this.promotion.promotion_date = this.dateService.getDateCurrent();
      this.promotion.promotion_time = this.dateService.getTimeCurrent();
      if (!this.isEdit) {
        this.promotionService.savePromotions(this.promotion).then(() => {
          this.showNotification('top', 'center', 'ok! Promoción agregada correctamente.', 'success')
          $("#modalPromotion").modal("hide");
          form.reset()
        })
      } else {
        this.promotionService.updatePromotions(this.promotion).then(() => {
          this.showNotification('top', 'center', 'ok! Promoción actualizada correctamente.', 'success')
          $("#modalPromotion").modal("hide");
          form.reset()
        })
      }

    }
  }

  public showNotification(from, align, msg, type) {
    $.notify({
      message: "<b>" + msg + "</b> ",
    }, {
      type: type,
      class: 'notify',
      timer: 6000,
      placement: {
        from: from,
        align: align,
        
      }
    });
  }

  /**
* *** Carga de imagen ***
* @param event.
*/
  public onChangeImage(event) {
    Swal.fire({
      title: "Cargando imágen...",
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        Swal.showLoading();
      },
    });
    const files = event.srcElement.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result;
      };
      reader.readAsDataURL(files[0]);
    }
    this.upload(event);
  }

  public async upload(event) {
    const file = event.target.files[0];
    this.imageFile = file;
    if (this.imageFile) {
      this.promotion.promotion_img = await this.storageService.uploadFile(`promotions/promotion${this.promotion.promotion_id}.png`, this.imageFile)
      if(this.promotion.promotion_img) {
        this.imageSrc = '';
        Swal.fire("OK", "Imagen cargada correctamente!", "success");
      }
    }
    

  }

  public editPromotion(promotion: Promotions) {
    this.isEdit = true;
    this.promotion = promotion;
    console.log(this.promotion);
    
  }

  public deletePromotion(promotion: Promotions) {
    Swal.fire({
      text: "¿Confirma que desea eliminar la promoción?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
       this.promotionService.deletePromotion(promotion).then(() => {
         this.showNotification('top', 'center', 'Ok ! Promoción eliminada correctamente.', 'success')
       })
      }
    })
  }
}
