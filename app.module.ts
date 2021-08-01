import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'environments/environment';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { DataTablesModule } from 'angular-datatables';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login/login.component';
import { NgxDatePickerModule } from '@ngx-tiny/date-picker';
import { DatePipe } from '@angular/common';
import { TermsConditionsComponent } from './pages/terms-condiditions/terms-conditions/terms-conditions.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    DataTablesModule,
    NgxDatePickerModule
    
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    TermsConditionsComponent,
    


  ],
  providers: [DatePipe,],
  bootstrap: [AppComponent]
})
export class AppModule { }
