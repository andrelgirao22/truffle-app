import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './../interceptors/error-interceptor';
import { PostalCodeService } from './../services/postal_code.service';
import { StorageService } from './../services/storage.service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http'

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ClientService } from '../services/client.service';
import { StateService } from '../services/state.service';
import { AuthService } from '../services/auth.service';
import { CategotyService } from '../services/domain/category.service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    StorageService,
    PostalCodeService,
    ClientService,
    CategotyService,
    StateService,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
