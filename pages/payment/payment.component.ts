import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
// import { DatafastService } from "app/services/datafast/datafast.service";
import { HttpParams } from "@angular/common/http";
import { Meta, SafeScript } from "@angular/platform-browser";
import { ElementRef } from "@angular/core";
import { Renderer2 } from "@angular/core";
import { Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import Swal from "sweetalert2";
import * as archivo from "../../../assets/js/functions.js";

declare var $: any;

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.css"],
})
export class PaymentComponent implements OnInit {
  // @Input() order: PurchaseOrder;

  urlTree: any;
  public id;
  public ipPublic;
  public resourcePath;
  public checkoutId = "";
  public sendForm = false;
  public paying: boolean = false;
  // public arrayProductCart: Product[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    // public datafastService: DatafastService,
    private meta: Meta,
    private elementRef: ElementRef,
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document
  ) {}

  ngOnInit(): void {
    // this.order = JSON.parse(localStorage.getItem("order"));
    // if (JSON.parse(localStorage.getItem("order"))) {
    //   var order = JSON.parse(localStorage.getItem("order"));
    //   this.arrayProductCart = order.arrayProductCart;
    // } else {
    //   this.arrayProductCart = [];
    // }
    // console.log(this.arrayProductCart);

    // if (!this.order) {
    //   this.router.navigate(["/"]);
    // } else {
    //   this.urlTree = this.router.parseUrl(this.router.url);
    //   this.id = this.urlTree.queryParams["id"];
    //   this.resourcePath = this.urlTree.queryParams["resourcePath"];
    //   this.checkEventsInUrl();
    //   this.getIpCliente();
      this.InitPago("***");
    // }
  }

  public async InitPago(id: string) {
    console.log('*** Iniciando pago ***');
    
    var idd = new Date().getTime();
    // console.log(this.order.total_to_pay);

    var response = await archivo.InitPago(
      100,  123, 345
      // this.order.total_to_pay * 100,
      // idd,
      // this.order.order_transaccion_id
    );
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
  //   //Add '${implements OnChanges}' to the class.

  // }

  getIpCliente() {
    // var res = this.datafastService.getIpCliente();
    // res.subscribe((r) => {
    //   this.ipPublic = r.ip;
    // });
  }

  /**
   * *** Funcion activada cuando se obtiene el la respuesta de data fast por url ***
   */

  /**
   * *** 4048370000240948 ***
   * *** 10/22 ***
   * *** 662 ***
   */
  // public setUrlByDataFast(url: string) {
  //   /// *** Seperamos la url en el '&' ***

  //   var arrayUrl = url.split("&");
  //   /// *** Seperamos la arrayUrl en el '=' ***
  //   var resourcePath = arrayUrl[1].split("=");
  //   /// *** Obtenemos el resourcePath para enviar a DataFast ***
  //   var newresourcepath = resourcePath[1].replace(/%2F/g, "/");
  //   var newresourcepath2 = newresourcepath.split("/");
  //   var newresourcepath3 = newresourcepath2[3] + "/" + newresourcepath2[4];

  //   if (!this.paying) {
  //     this.paying = true;

  //     console.log(newresourcepath3);
  //     // this.url = "https://cors-anywhere.herokuapp.com/https://oppwa.com/v1/checkouts";
  //     var url = "https://oppwa.com/v1/checkouts";
  //     // this.url = "/v1/checkouts";
  //     url =
  //       url + "/" + newresourcepath3 + "?entityId=" + this.datafastService.entityId;
  //     console.log(url);



  //     fetch(url, {
  //       method: "GET",
  //       mode: "no-cors",
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //     .then(function(res) {
  //       console.log('request succeeded with JSON response', res);
  //     }).catch(function(error) {
  //       console.log('request failed', error);
  //     });

  //       // .then((res) => res.json())
  //       // .then((res) => console.log(res))
  //       // .catch((err) => console.log("err", err));

  //     // var res = this.datafastService.getDataFast(newresourcepath3);
  //     // res.subscribe((response) => {
  //     //   console.log(JSON.stringify(response, null, 3));
  //     //   console.log(JSON.stringify(response.result, null, 3));
  //     //   var r = response.result;
  //     //   console.log(r);
  //     //   console.log(r.code);

  //     //   if (r.code=='000.000.000') {

  //     //   this.datafastService.saveResponseDataFast(response, this.order);
  //     //   $('#modal-purchase-form').modal('hide');

  //     //   this.showSwal("success", "Su orden se ha generado correctamente!");
  //     //     this.router.navigate(['/']);
  //     //   } else {
  //     //     this.showSwal("error", "Error " + r.description + "!");
  //     //     // this.router.navigate(['/']);

  //     //   }
  //     // });
  //   }
  // }

  /**
   * *** Detectamos cambios en la URL para ***
   * *** determinar cuando hay respuesta   ***
   * *** de DataFast                       ***
   */
  // checkEventsInUrl() {
  //   var send = false;
  //   this.router.events.subscribe((event) => {
  //     if (event["url"]) {
  //       /// *** Solo activamos la funcion cuando la url este completa ***
        
  //       if (event["url"].substring(0, 8) == "/payment") {
  //         if (!send) {
  //           send = true
  //           this.setUrlByDataFast(event["url"]);
  //         }
          
  //       }
  //     }
  //   });
  // }

  // ngAfterViewInit(): void {
  //   console.log('*** Cambiando ***');
  //         var datafast = '<br/><br/><img src=' + '"https://www.datafast.com.ec/images/verified.png" style=' + '"display:block;margin:0 auto; width:100%;">';
  //         $('form.wpwl-form-card').find('.wpwl-button').before(datafast);

  //     // style: "card",
  //     // locale: "es",
  //     // labels: { cvv: "CVV", cardHolder: "Nombre(Igual que en la tarjeta)" }
  // // }

  // }

  // ngOnChanges(changes: SimpleChanges): void {

  //   this.urlTree = this.router.parseUrl(this.router.url);
  //   this.id = this.urlTree.queryParams["id"];
  //   this.resourcePath = this.urlTree.queryParams["resourcePath"];

  // }

  // addTest() {
  //   this.sendForm = true;
  // }

  /**
   * *** 4048370000240948 ***
   * *** 10/22 ***
   * *** 662 ***
   */

  // async paymentInit() {
  //   this.datafastService.entityId;
  //   const payload = {
  //     entityId: this.datafastService.entityId,
  //     "authentication.password": "sy6KJsT8",
  //     "authentication.userId": this.datafastService.entityId,
  //     amount: this.order.total_to_pay.toFixed(2),
  //     currency: "USD",
  //     paymentType: "DB",
  //     "customer.givenName": this.order.order_user_name,
  //     "customer.middleName": this.order.order_user_second_name,
  //     "customer.surname": this.order.order_user_lastname,
  //     "customer.ip": this.ipPublic,
  //     "customer.merchantCustomerId": this.order.order_user_uid,
  //     merchantTransactionId: this.order.order_transaccion_id,
  //     "customer.email": this.order.order_user_email,
  //     "customer.identificationDocType": "IDCARD",
  //     "customer.identificationDocId": this.order.order_user_doc_id.toString(),
  //     "customer.phone": this.order.order_user_phone,
  //     "shipping.street1": this.order.order_direction,
  //     "billing.street1": this.order.order_direction,
  //     "shipping.country": "EC",
  //     "billing.country": "EC",
  //     "customParameters[SHOPPER_VAL_BASE0]": "0",
  //     "customParameters[SHOPPER_VAL_BASEIMP]": this.calculatePriceSinIva().toString(),
  //     "customParameters[SHOPPER_VAL_IVA]": this.calculateIva().toString(),
  //     "customParameters[SHOPPER_MID]": "4300000462",
  //     "customParameters[SHOPPER_TID]": "BP360899",
  //     "customParameters[SHOPPER_ECI]": "0103910",
  //     "customParameters[SHOPPER_PSERV]": "17913101",
  //     "customParameters[SHOPPER_VERSIONDF]": "2",
  //     "risk.parameters[USER_DATA2]": "4 woman",
  //   };

  //   console.log(payload);

  //   fetch("https://oppwa.com/v1/checkouts", {
  //     method: "POST",
  //     mode: "cors",
  //     redirect: "follow",
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  //       // "Authorization": "OGFjOWE0Y2U3NzY3NmM4ZTAxNzc2OGU3OGFmYTIyMjB8TWRiZjNSOE02SA==",
  //     },
  //     body: this.buildEncodedFormData(payload),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log("res", res);
  //       console.log(JSON.stringify(res, null, 3));
      
  //       console.log(res.id);
  //       const s = this.renderer2.createElement("script");
  //       s.type = "text/javascript";
  //       s.src =
  //         "https://oppwa.com/v1/paymentWidgets.js?checkoutId=" + res.id + "";
  //       s.text = ``;
  //       this.renderer2.appendChild(this._document.body, s);

  //       setTimeout(() => {
  //         console.log("*** Cargando form ***");
  //         this.checkoutId = res.id;
  //       }, 1000);

  //       setTimeout(() => {
  //         console.log("*** Agregar IMG ***");
  //         var datafast =
  //           "<br/><br/><img src=" +
  //           '"https://www.datafast.com.ec/images/verified.png" style=' +
  //           '"display:block;margin:0 auto; width:100%;">';
  //         $("form.wpwl-form-card").find(".wpwl-button").before(datafast);
  //       }, 2000);
  //     })
  //     .catch((err) => console.log("err", err));
  // }

  // buildEncodedFormData(json) {
  //   var fd = [];
  //   Object.keys(json).forEach(function (key) {
  //     fd.push(key + "=" + encodeURIComponent(json[key]));
  //   });
  //   return fd.join("&");
  // }

  // async paymentInitT() {
  //   this.datafastService.entityId;
  //   const payload = new HttpParams()
  //     .set("entityId", this.datafastService.entityId)
  //     .set("authentication.password", "sy6KJsT8")
  //     .set("authentication.userId", this.datafastService.entityId)
  //     .set("amount", this.order.total_to_pay.toFixed(2))
  //     .set("currency", "USD")
  //     .set("paymentType", "DB")
  //     .set("customer.givenName", this.order.order_user_name) /// *** Primer nombre ***/
  //     .set("customer.middleName", this.order.order_user_second_name) /// *** 2do nombre ***/
  //     .set("customer.surname", this.order.order_user_lastname) /// *** Apellido ***/
  //     .set("customer.ip", this.ipPublic) /// *** dirección ip del equipo desde donde el usuario ***
  //     .set("customer.merchantCustomerId", this.order.order_user_uid) /// *** la identificación (id único) del usuario registrado en el sistema ***
  //     .set("merchantTransactionId", this.order.order_transaccion_id) /// *** (id único) de la transacción (trx) registrada en el sistema ***
  //     .set("customer.email", this.order.order_user_email) /// *** correo electrónico asociada a un usuario del sistema ***
  //     .set("customer.identificationDocType", "IDCARD") /// *** pruebas:IDCARD = tipo de documento de identidad del usuario en sistema (DNI, Cédula, pasaporte, etc.), ***
  //     .set(
  //       "customer.identificationDocId",
  //       this.order.order_user_doc_id.toString()
  //     ) /// *** documento de identidad del usuario en sistema (DNI, Cédula, pasaporte, etc.) ***
  //     .set("customer.phone", this.order.order_user_phone) /// *** Número de teléfono, de formato alfanumérico y longitud máxima de 25 caracteres ***
  //     .set("shipping.street1", this.order.order_direction) /// *** Dirección de entrega de la compra del cliente ***
  //     .set("billing.street1", this.order.order_direction) /// *** Dirección del cliente que realice la compra (generalmente el de la factura) ***
  //     .set("shipping.country", "EC") /// *** País de entrega de compra que realiza el cliente, de formato alfabético y longitud de 2 caracteres en mayúscula. Ejm (EC, CL, US, etc. Formato ISO 3166-1) ***
  //     .set("billing.country", "EC") /// *** País de entrega de compra que realiza el cliente, de formato alfabético y longitud de 2 caracteres en mayúscula. Ejm (EC, CL, US, etc. Formato ISO 3166-1) ***
  //     // .set("testMode", "EXTERNAL") /// *** Le indica a la plataforma en qué modo se están haciendo las transacciones ***
  //     .set("customParameters[SHOPPER_VAL_BASE0]", "0") /// *** Le indica a la plataforma en qué modo se están haciendo las transacciones ***
  //     .set(
  //       "customParameters[SHOPPER_VAL_BASEIMP]",
  //       this.calculatePriceSinIva().toString()
  //     ) /// *** Le indica a la plataforma en qué modo se están haciendo las transacciones ***
  //     .set("customParameters[SHOPPER_VAL_IVA]", this.calculateIva().toString()) /// *** Le indica a la plataforma en qué modo se están haciendo las transacciones ***
  //     .set("customParameters[SHOPPER_MID]", "4300000462") /// ***  identificador del comercio (MID) Para produccion: 1000000505 ***
  //     .set("customParameters[SHOPPER_TID]", "BP360899") /// *** identificador del terminal, Para produccion: PD100406 ***
  //     .set("customParameters[SHOPPER_ECI]", "0103910") /// *** Identificador de seguridad ***
  //     .set("customParameters[SHOPPER_PSERV]", "17913101") /// *** Identificador de seguridad ***
  //     .set("customParameters[SHOPPER_VERSIONDF]", "2") /// *** versión ***
  //     .set("risk.parameters[USER_DATA2]", "4 woman"); /// *** Nombre del comercio ***

  //   var i = 0;
  //   this.order.arrayProductCart.forEach((element) => {
  //     payload
  //       .set("cart.items[" + i + "].name", element.product_name)
  //       .set("cart.items[" + i + "].description", element.product_description)
  //       .set("cart.items[" + i + "].price", element.product_price.toString())
  //       .set(
  //         "cart.items[" + i + "].quantity",
  //         element.product_quanty_to_buy.toString()
  //       );
  //     i++;
  //   });

  //   const payloadExample = new HttpParams()
  //     // .set("entityId", this.datafastService.entityIdTest)
  //     .set("amount", "0.10")
  //     .set("currency", "USD")
  //     .set("customer.givenName", "USD") /// *** Primer nombre ***/
  //     .set("customer.middleName", "USD") /// *** 2do nombre ***/
  //     .set("customer.surname", "USD") /// *** Apellido ***/
  //     .set("customer.ip", "USD") /// *** dirección ip del equipo desde donde el usuario ***
  //     .set("customer.merchantCustomerId", "USD") /// *** la identificación (id único) del usuario registrado en el sistema ***
  //     .set("merchantTransactionId ", "USD") /// *** (id único) de la transacción (trx) registrada en el sistema ***
  //     .set("customer.email ", "USD") /// *** correo electrónico asociada a un usuario del sistema ***
  //     .set("customer.identificationDocType", "IDCARD") /// *** tipo de documento de identidad del usuario en sistema (DNI, Cédula, pasaporte, etc.), ***
  //     .set("customer.identificationDocId", "DB") /// *** documento de identidad del usuario en sistema (DNI, Cédula, pasaporte, etc.) ***
  //     .set("customer.phone", "DB") /// *** Número de teléfono, de formato alfanumérico y longitud máxima de 25 caracteres ***
  //     .set("shipping.street1", "DB") /// *** Dirección de entrega de la compra del cliente ***
  //     .set("billing.street1", "DB") /// *** Dirección del cliente que realice la compra (generalmente el de la factura) ***
  //     .set("shipping.country", "DB") /// *** País de entrega de compra que realiza el cliente, de formato alfabético y longitud de 2 caracteres en mayúscula. Ejm (EC, CL, US, etc. Formato ISO 3166-1) ***
  //     .set("customParameters[SHOPPER_MID]", "1000000406") /// ***  identificador del comercio (MID) Para produccion: 1000000505 ***
  //     .set("customParameters[SHOPPER_TID]", "PD100406") /// *** identificador del terminal, Para produccion: PD100406 ***
  //     .set("customParameters[SHOPPER_ECI]", "0103910") /// *** Identificador de seguridad ***
  //     .set("customParameters[SHOPPER_PSERV]", "17913101") /// *** Identificador de seguridad ***
  //     .set("customParameters[SHOPPER_VERSIONDF]", "2") /// *** versión ***
  //     .set("risk.parameters[USER_DATA2]", "4 woman"); /// *** Nombre del comercio ***

  //   // const payloadFaseUno = new HttpParams()
  //   //   .set("entityId", this.datafastService.entityIdTest)
  //   //   .set("amount", "1.00")
  //   //   .set("currency", "USD")
  //   //   .set("paymentType", "DB");

  //   var res = this.datafastService.sendRequestfast(payload);
  //   console.log("*** 0.1 ***");
  //   console.log(res);
  //   res.subscribe((r) => {
  //     var rr = JSON.stringify(r);
  //     // console.log(r);

  //     // if (r.id) {
  //     const s = this.renderer2.createElement("script");
  //     s.type = "text/javascript";
  //     s.src = "https://oppwa.com/v1/paymentWidgets.js?checkoutId=" + r.id + "";
  //     s.text = ``;
  //     this.renderer2.appendChild(this._document.body, s);

  //     setTimeout(() => {
  //       console.log("*** Cargando form ***");
  //       this.checkoutId = r.id;
  //     }, 1000);

  //     setTimeout(() => {
  //       console.log("*** Agregar IMG ***");
  //       var datafast =
  //         "<br/><br/><img src=" +
  //         '"https://www.datafast.com.ec/images/verified.png" style=' +
  //         '"display:block;margin:0 auto; width:100%;">';
  //       $("form.wpwl-form-card").find(".wpwl-button").before(datafast);
  //     }, 2000);
  //     // }
  //   });
  // }

  calculatePriceSinIva() {
    // var tasaIva = 1.12;
    // var pvpSinIva = this.order.total_to_pay / tasaIva;
    // return pvpSinIva.toFixed(2);
  }

  calculateIva() {
    // var tasaIva = 1.12;
    // var pvpSinIva = this.order.total_to_pay / tasaIva;
    // var iva = this.order.total_to_pay - pvpSinIva;
    // return iva.toFixed(2);
  }

  /**
   * *** Para mostar alertas ***
   * @param icon
   * @param title
   */
  showSwal(icon: any, title: string) {
    Swal.fire({
      position: "center",
      icon: icon,
      title: title,
      showConfirmButton: false,
      width: 800,
      timer: 5000,
      background: "#f6f6f6",
      backdrop: `
      transparent`,
    });
  }
}
