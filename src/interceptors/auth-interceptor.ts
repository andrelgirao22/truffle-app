import { API_CONFIG } from './../config/api.config';
import { HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpHandler } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { AlertController } from 'ionic-angular';
import { StorageService } from './../services/storage.service';
import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        public storare:StorageService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
        let N = API_CONFIG.baseUrl.length;
        let requestToApi = req.url.substring(0, N) == API_CONFIG.baseUrl;

        let localUser = this.storare.getLocalUser()
        if(localUser && requestToApi) {
            console.log('ola')
            const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)});
            return next.handle(authReq)
        }

        return next.handle(req)
    }

    
}