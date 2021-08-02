import { Component, OnInit, ViewChild } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ControlMantenimiento } from 'app/interfaces/control_mantenimiento';
import { CmrService } from 'app/services/cmr/cmr.service';
import { DateService } from 'app/services/date/date.service';
import Swal from 'sweetalert2';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


pdfMake.vfs = pdfFonts.pdfMake.vfs;

declare var $: any
@Component({
  selector: 'app-cmr',
  templateUrl: './cmr.component.html',
  styleUrls: ['./cmr.component.css']
})


export class CmrComponent implements OnInit {

    

  header = [['ID', 'Name', 'Email', 'Profile', 'Profilex']]

  public control: ControlMantenimiento;
  public arrayControl: Array<ControlMantenimiento>;
  public isEdit = false;
  public dataSource: MatTableDataSource<ControlMantenimiento>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("TableProduct") paginator: MatPaginator;
  public displayedColumns: string[] = [
    "Id",
    "Procedimiento",
    "Ok",
    "Mantenimiento",
    "Datos",
    "Editar",
    "Eliminar",

  ];


  constructor(
    private cmrService: CmrService,

   ) { }


  ngOnInit(): void {
    this.control = {
      control_man_datos:''
    }
    this.getControl();
  }

  head = [['ID', 'Country', 'Rank', 'Capital']]

  data = [
    [1, 'Finland', 7.632, 'Helsinki'],
    [2, 'Norway', 7.594, 'Oslo'],
    [3, 'Denmark', 7.555, 'Copenhagen'],
    [4, 'Iceland', 7.495, 'Reykjavík'],
    [5, 'Switzerland', 7.487, 'Bern'],
    [9, 'Sweden', 7.314, 'Stockholm'],
    [73, 'Belarus', 5.483, 'Minsk'],
  ]


  VIDEOGAMES = [
    {
      id: 1,
      name: 'Animal Crossing',
      platform: 'Nintendo Switch',
      reference: '1-770-736-8031',
    },
    {
      id: 2,
      name: 'The Legend of Zelda: Ocarina of Time CV',
      platform: 'Wii U',
      reference: '1-770-736-2323',
    },
    {
      id: 3,
      name: 'Metal Gear Solid',
      platform: 'Playstation (PSX)',
      reference: '1-4564-736-334',
    },
    {
      id: 4,
      name: 'ShenMue',
      platform: 'Sega Dreamcast',
      reference: '3-770-736-4532',
    },
    {
      id: 5,
      name: 'Rise of the Tomb Raider',
      platform: 'Playstation 4',
      reference: '1-324-736-3245',
    },
    {
      id: 6,
      name: 'Resident Evil 2',
      platform: 'Playstation',
      reference: '1-123-3336-4321',
    },
  ];
  // tslint:disable-next-line:typedef
  downloadPDF() {
    // Extraemos el
    const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });
  }



  public addControl(control: ControlMantenimiento, isValid: boolean, form: NgForm) {
    //console.log("hasta aqui en el add")

    if (!this.isEdit) {
      this.cmrService.saveControl(control).then(() => {
        //$("#modalActivo").modal("hide");
        this.showNotification('top', 'right', 'Ok ! Mantenimiento agregado ', 'success')
        this.isEdit = false;
        form.resetForm();
      })
    }else {
      this.cmrService.updateControl(control).then(()=>{
        this.showNotification('top', 'right', 'Ok ! Mantenimiento editado con exito. ', 'success')
        this.isEdit = false;
      })
    }
  }

  
  public getControl() {
    this.cmrService.getControl().subscribe(control => {
      this.arrayControl = control;
      this.dataSource = new MatTableDataSource<ControlMantenimiento>(control);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  public editActivo(control: ControlMantenimiento) {
    this.isEdit = true;
    this.control = control;
    console.log(control)
  }





  public deleteActivo(control: ControlMantenimiento) {
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
        this.cmrService.deleteControl(control).then(() => {
          this.showNotification('top', 'right', 'Ok ! Mantenimiento eliminado', 'success')
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

  createPdf() {
    var doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('My PDF Table', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);


    (doc as any).autoTable({
      head: this.head,
      body: this.data,
      theme: 'plain',
      didDrawCell: data => {
        console.log(data.column.index)
      }
    })

    // Open PDF document in new tab
    doc.output('dataurlnewwindow')

    // Download PDF document  
    doc.save('table.pdf');
  }


}
