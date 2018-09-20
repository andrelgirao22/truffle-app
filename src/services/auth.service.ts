import { CartService } from './cart.service';
import { LocalUser } from './../model/local_user';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs/Observable';
import { CredentiaisDTO } from './../model/credentiais.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import {JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {

    jwtHelper: JwtHelper = new JwtHelper();


    constructor(
        private http: HttpClient,
        private storageService: StorageService,
        private cartService: CartService
        ) {}

    authenticate(credential: CredentiaisDTO): Observable<any> {
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/login`, 
            credential,
            {
                observe: 'response',
                responseType: 'json'
            })
    }

    refreshToken() : Observable<any> {
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/refresh`, 
            {},
            {
                observe: 'response',
                responseType: 'json'
            })
    }

    successfullLogin(responseBody) {
        let localUser: LocalUser = {
            token: responseBody.access_token,
            email: this.jwtHelper.decodeToken(responseBody.access_token).sub,
            account: responseBody.account
        }
        this.storageService.setLocalUser(localUser);
        this.cartService.createOrClearCart()
    }

    logout() {
        this.storageService.setLocalUser(null);
    }
}