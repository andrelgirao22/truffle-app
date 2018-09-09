import { AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import {catchError} from "rxjs/operators";
import { StorageService } from '../services/storage.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        public storare:StorageService,
        public alert: AlertController){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('passou')
        return next.handle(req) 
        .pipe(catchError((error, caught) => {

            let errorObj = error;
            if(errorObj) {
                errorObj = error.error;
            }
            if(!errorObj.status) {
                errorObj = JSON.parse(errorObj)
            }

            this.handleError(errorObj);

            console.log('error', errorObj)

            return Observable.throw(errorObj)
        }) as any);

    }

    handleError(errorObj) {
        switch(errorObj.status) {
            case 401:
            this.handle401();
            break;

            case 403: 
            this.handle403();
            break;

            default:
            this.handleDefautlError(errorObj);
        }
    }

    handleDefautlError(errorObj) {
        let alert = this.alert.create({
            title: 'Erro ' + errorObj.status + ':' + errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons: [
                {text: 'Ok'},
            ]
        })

        alert.present()
    }

    handle401() {
        let alert = this.alert.create({
            title: 'Erro 401: falha de autenticação',
            message: 'Email ou senha incorretos',
            enableBackdropDismiss: false,
            buttons: [
                {text: 'Ok'},
            ]
        })

        alert.present()
    }

    handle403() {
        this.storare.setLocalUser(null)

    }
}