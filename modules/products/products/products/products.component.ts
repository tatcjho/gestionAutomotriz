import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'app/interfaces/product';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ProductsService } from 'app/services/products/products.service';
import { StorageService } from 'app/services/storage/storage.service';
import { DateService } from 'app/services/date/date.service';
import { take } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';


declare var $ : any
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  public product: Product;
  public arrayProduct: Array<Product> ;
  public isEdit = false;
  public imageSrc: any;
  public imageFile: any;
  public dataSource: MatTableDataSource<Product>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("TableProduct") paginator: MatPaginator;
  public displayedColumns: string[] = [
    "Id",
    "Producto",
    "Descripción",
    "Editar",
    "Eliminar",
  ];

  constructor(
    private productService: ProductsService,
    private storageService: StorageService,
    private dateService: DateService) { }

  ngOnInit(): void {
    this.product = {}
    this.getProducts();
  }

      /**
   * *** Function para filtar en data table ***
   * @param event
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public getProducts() {
    this.productService.getProducts().subscribe(products => {
      this.arrayProduct = products;
      this.dataSource = new MatTableDataSource<Product>(products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  public addProduct(product: Product, isValid: boolean, form: NgForm) {
    if (!this.isEdit) {
      product.product_date = this.dateService.getDateCurrent();
      product.product_time = this.dateService.getTimeCurrent();
      product.product_status = true;
      this.productService.saveProduct(product).then(() => {
        $("#modalProduct").modal("hide");
        this.showNotification('top', 'right', 'Ok ! Producto creado con exito. ', 'success')
        this.isEdit = false;
        form.resetForm();
      })
    } else {
      this.productService.updateProduct(product).then(() => {
        $("#modalProduct").modal("hide");
        this.showNotification('top', 'right', 'Ok ! Producto editado con exito. ', 'success')
        this.isEdit = false;
      })
    }
  }

  public newProduct() {
    this.isEdit = false;
    // const file = document.querySelector('.file');
    // file.value = '';
     var id = new Date().getTime();
    this.product = {
      product_id: id.toString(),
      product_name: "",
      product_description: "",
      product_img: "",
      product_status: false,

    };
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
    this.product.product_img = await this.storageService.uploadFile(`prooduct/product${this.product.product_id}.png`, this.imageFile)
    if ( this.product.product_img) {
      Swal.fire("OK", "Imagen cargada correctamente!", "success");
    }

  }
  //  this.uploadDocumentToStorage();
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

public editProduct(product: Product) {
  this.isEdit = true;
  this.product = product;
}

public deleteProduct( product: Product) {
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
     this.productService.deleteProduct(product).then(() => {
       this.showNotification('top', 'right', 'Ok ! Producto eliminado correctamente.', 'success')
     })
    }
  })
}

}
