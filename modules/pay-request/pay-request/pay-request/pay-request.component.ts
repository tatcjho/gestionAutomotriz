import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { UserService } from "app/services/user/user.service";
import { StorageService } from "app/services/storage/storage.service";
import { DateService } from "app/services/date/date.service";
import { Users } from "app/interfaces/user";
import { Payment } from "app/interfaces/payment_request";
import Swal from "sweetalert2";
import { PaymentRequeestService } from "app/services/payment-request/payment-requeest.service";

declare var $: any;
@Component({
  selector: "app-pay-request",
  templateUrl: "./pay-request.component.html",
  styleUrls: ["./pay-request.component.css"],
})
export class PayRequestComponent implements OnInit {
  public user: Users;
  public arrayTokensUsers: Array<any> = [];
  public users: Array<Users>;
  public paymentRequest: Payment;
  public arrayPaymentRequest: Array<Payment>;
  public services: Array<Users>;
  public arrayUsers: Array<Users>;
  public isEdit = false;
  public isSelected = false;
  public imageSrc: any;
  public imageFile: any;
  public dataSource: MatTableDataSource<Users>;
  public dataSourcePayment: MatTableDataSource<Payment>;
  public show: number = 1;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("TableUsersPay") paginator: MatPaginator;
  @ViewChild(MatSort) sortPaymentRequests: MatSort;
  @ViewChild("TableUsersPay2") paginatorPaymentRequests: MatPaginator;
  public displayedColumns: string[] = [
    "Cedula",
    "Nombre",
    "Apellido",
    "Correo",
    "Teléfono",
    "Crear Solicitud",
  ];
  public displayedColumnsPayment: string[] = [
    "Nombre",
    "Apellido",
    "Correo",
    "Teléfono",
    "Estatus",
    "Ver",
  ];

  constructor(
    private userService: UserService,
    private paymentService: PaymentRequeestService,
    private dateService: DateService
  ) {}

  ngOnInit(): void {
    this.paymentRequest = {};
    this.user = {};
    this.getUsers();
    this.getPaymentRequests();
  }

  /**
   * *** Seteamos la variable show para mostrar wislist o pedidos ***
   * show = 1 = ver wishlist / show = 2 = ver ordenes
   * @param opt
   */
  showSection(opt) {
    this.show = opt;
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

  public async addPaymentRequest(payment: Payment) {
    Swal.fire({
      text: "¿Confirma que desea enviar esta solicitud?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, confirmo!",
      cancelButtonText: "Cancelar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        var id = new Date().getTime();
        (payment.payment_request_uid = id.toString()),
          (payment.payment_request_date = this.dateService.getDateCurrent());
        payment.payment_request_time = this.dateService.getTimeCurrent();
        payment.payment_request_state = false;
        payment.payment_request_user_name = this.user.user_name;
        payment.payment_request_user_last_name = this.user.user_lastname;
        payment.payment_request_user_phone = this.user.user_phone;
        payment.payment_request_user_email = this.user.user_email;

        await this.paymentService.savePaymentRequest(payment).then(() => {
          console.log(payment);
          //this.sendNotification(notification)
          this.showNotification(
            "top",
            "right",
            "Ok ! Solicitud enviada correctamente.",
            "success"
          );
          window.location.reload();

        });

        this.paymentService.savePaymentRequestsByUsers(payment, this.user);
        console.log(this.user);
      }
    });
  }

  public getTokensUser() {
    this.arrayTokensUsers = [];
    this.users.forEach((user) => {
      this.arrayTokensUsers.push(user.user_token);
    });
  }

  public getUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.arrayUsers = users;
      this.dataSource = new MatTableDataSource<Users>(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public getPaymentRequests() {
    this.paymentService.getPaymentRequests().subscribe((payments) => {
      this.arrayPaymentRequest = payments;
      this.dataSourcePayment = new MatTableDataSource<Payment>(payments);
      this.dataSourcePayment.paginator = this.paginatorPaymentRequests;
      this.dataSourcePayment.sort = this.sortPaymentRequests;
    });
  }

  public getUser(user: Users) {
    this.user = user;
  }

  public viewUser(user: Users) {
    this.isSelected = true;
    this.show = 2;
    console.log(this.show);
    this.user = user;
  }

  public viewPayment(payment: Payment) {
    this.paymentRequest = payment;
    console.log("hasta aqui payment");
  }

  public sendRequest(user: Users) {
    user.user_state = true;
    this.userService.updateStatusInRequest(user).then(() => {
      //this.emailsService.saveRegister('order_accept', req);
      this.showNotification(
        "top",
        "right",
        "Ok! Se actualizo el estatus correctamente.",
        "success"
      );
    });
  }

  public showNotification(from, align, msg, type) {
    $.notify(
      {
        message: "<b>" + msg + "</b> ",
      },
      {
        type: type,
        class: "notify",
        timer: 6000,
        placement: {
          from: from,
          align: align,
        },
      }
    );
  }
  
  /****WEB SERVICE****/
  soapCall() {
    console.log("entrando al soapCall")
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', '/ServicioWeb/wsmovil?wsdl', true);
    const id_number = '0190088669001';



    // The following variable contains the xml SOAP request.
    const sr =
    `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:miws="http://miws/">
      <soapenv:Header/>
      <soapenv:Body>
         <miws:produccion>
            <!--Optional:-->
            <identificacion>` +
    id_number +
    `</identificacion>
         </miws:produccion>
      </soapenv:Body>
   </soapenv:Envelope>`;


    xmlhttp.onreadystatechange =  () => {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                const xml = xmlhttp.responseXML;
                // Here I'm getting the value contained by the <return> node.
                const response_number = xml.getElementsByTagName('return')[0].childNodes[0].nodeValue;
                // Print result square number.

                var array = JSON.parse(response_number)
                array.forEach(element => {
                  console.log(element.ramo)
                });
                console.log(response_number);
            }
        }
    }
    // Send the POST request.
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = 'document';
    console.log
    return xmlhttp.send(sr);
  }



}
