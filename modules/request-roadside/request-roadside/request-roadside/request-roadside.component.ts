import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestRoadSideAssistence } from 'app/interfaces/requestRoadSideAssistence';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { RequeastRoadsideAssistenceService } from 'app/services/request-roadside-assistence/requeast-roadside-assistence.service';
import { DateService } from 'app/services/date/date.service';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DateFilterService } from 'app/services/date-filter/date-filter.service';

declare const google: any;
declare var $: any;

var lat = -2.91133
var long = -78.997085;
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable?: boolean;
}


@Component({
  selector: 'app-request-roadside',
  templateUrl: './request-roadside.component.html',
  styleUrls: ['./request-roadside.component.css']
})
export class RequestRoadsideComponent implements OnInit {

  
  public latitude:any;
  public longitude:any;
  private mapOptions: any;
  public map: any;
  public infowindow: any;
  public request: RequestRoadSideAssistence;
  public arrayRequest: Array<RequestRoadSideAssistence>;
  public arrayRequestDays: Array<RequestRoadSideAssistence> = []; 
  public isEdit = false;
  public imageSrc: any;
  public imageFile: any;
  public latLongStandar: any;
  public latlngClient: any;
  public start: any;
  public end: any; 
  public dataSource: MatTableDataSource<RequestRoadSideAssistence>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("TableNotification") paginator: MatPaginator;
  public displayedColumns: string[] = [
    "Id",
    "Nombre",
    "Apellido",
    "Hora",
    "Fecha",
    "Telefono",
    "Tipo de Asistencia",
    "Crear Solicitud"
  ];

  constructor(
    private requestService: RequeastRoadsideAssistenceService,
    private datefilterService: DateFilterService,
    private dateService: DateService,
    public datepipe: DatePipe
   ) { }

  ngOnInit(): void {
    this.request = {};
    this.getRequests();
    console.log(this.start)
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


applyFiltertoRange() {

  var date_init:string;
  var date_end: string
  let start_date =this.datepipe.transform(this.start, 'yyyy-MM-dd');
  let end_date =this.datepipe.transform(this.end, 'yyyy-MM-dd');
  
  date_init = start_date;
  date_end = end_date;
  console.log(date_init)
  console.log(date_end)
 
  this.datefilterService.getFilterByDate(date_init,date_end).subscribe(date => {
    this.arrayRequestDays = date;
    this.dataSource = new MatTableDataSource<RequestRoadSideAssistence>(date);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    console.log(this.arrayRequest)
  
  }





  public getRequests() {
    this.requestService.getRequests().subscribe(req => {
      this.arrayRequest = req;
      this.dataSource = new MatTableDataSource<RequestRoadSideAssistence>(req);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  public viewRequest(req: RequestRoadSideAssistence) {
    
    console.log(req)
    this.request = req;
    this.initMap();
    this.createMarker(req.request_roadside_assistence_location);
  }

  public acceptRequest(req: RequestRoadSideAssistence) {
    req.request_roadside_assistence_state = true;
    this.requestService.updateStatusInRequest(req).then(() => {
      //this.emailsService.saveRegister('order_accept', req);
      this.showNotification('top', 'right', 'Ok! Se actualizo el estatus correctamente.', 'success');
    })
  }

  
  public initMap() {
    console.log(this.request);
    let myLatlng = new google.maps.LatLng(this.request.request_roadside_assistence_location.lat, this.request.request_roadside_assistence_location.lng);
    this.mapOptions = {
      zoom: 18,
      center: myLatlng,
      gestureHandling: "greedy",
      styles: [
        {
          featureType: "water",
          stylers: [
            {
              hue: "#e83f3f",
            },
          ],
        },
        {
          featureType: "road",
          elementType: "geometry.fill",
          stylers: [
            {
              hue: "#e83f3f",
            },
          ],
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#808080",
            },
            {
              lightness: 54,
            },
          ],
        },
        {
          featureType: "landscape.man_made",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#ece2d9",
            },
          ],
        },
        {
          featureType: "poi.park",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#ccdca1",
            },
          ],
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#767676",
            },
          ],
        },
        {
          featureType: "road",
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#ffffff",
            },
          ],
        },
        {
          featureType: "poi",
          stylers: [
            {
              visibility: "on",
            },
          ],
        },
        {
          featureType: "landscape.natural",
          elementType: "geometry.fill",
          stylers: [
            {
              visibility: "on",
            },
            {
              color: "#b8cb93",
            },
          ],
        },
        {
          featureType: "poi.park",
          stylers: [
            {
              visibility: "on",
            },
          ],
        },
        {
          featureType: "poi.sports_complex",
          stylers: [
            {
              visibility: "on",
            },
          ],
        },
        {
          featureType: "poi.medical",
          stylers: [
            {
              visibility: "on",
            },
          ],
        },
        {
          featureType: "poi.business",
          stylers: [
            {
              visibility: "simplified",
            },
          ],
        },
      ],
    };
    this.map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      this.mapOptions
    );
  }

  

  /**
   * *** Creamos y agregamos la instancia del marcador al mapa  ***
   * *** Se le asigna la propiedad draggable: true para poder   ***
   * *** moverlo a la direccion deceada o obtener nuevamente la ***
   * *** localizacion de entrega actualizada                    ***
   * @param place
   */
  public createMarker(place: any) {
    console.log(place)
    const marker = new google.maps.Marker({
      map: this.map,
      position: place,
      draggable: true,
      gestureHandling: "greedy",
    });
     this.request.request_roadside_assistence_location.lat = place.lat;
     this.request.request_roadside_assistence_location.lng  = place.lng;
     //this.infowindow.open(this.map);
    // google.maps.event.addListener(marker, "click", () => {
    //   this.infowindow.setContent(place.name);

    // });
  var map = this.map;
    marker.addListener("dragend", (event) => this.handleMarkerDrag(event));
    marker.setMap(map);
    //this.drawSpokes()
  }

   /**
   * *** Metodo que se ejecuta al finalizar el draggable del marcador ***
   * *** Se obtiene lat lng y se consume el servicio de geocoder para ***
   * *** Obtener la direccion donde se ubico el marcador ***
   * @param event
   */
  public handleMarkerDrag(event: any) {
    const geocoder = new google.maps.Geocoder();
    let latlng;
    if (event) {
      if (event.latLng !== undefined) {
        this.latlngClient = new google.maps.LatLng(
          event.latLng.lat(),
          event.latLng.lng()
        );
        latlng = {
          lat: parseFloat(event.latLng.lat()),
          lng: parseFloat(event.latLng.lng()),
        };
        this.request.request_roadside_assistence_location.lat  = latlng.lat;
        this.request.request_roadside_assistence_location.lng  = latlng.lng;
      } else {
        this.latlngClient = new google.maps.LatLng(event.lat(), event.lng());
        latlng = {
          lat: parseFloat(event.lat()),
          lng: parseFloat(event.lng()),
        };
        this.request.request_roadside_assistence_location.lat  = latlng.lat;
        this.request.request_roadside_assistence_location.lng  = latlng.lng;
      }

      
    }
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
