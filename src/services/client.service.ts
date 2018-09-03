import { API_CONFIG } from './../config/api.config';

import { AccountDTO } from './../model/account.dto';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ClientService {

    constructor(
        private httpClient: HttpClient) {}

    insert(account: AccountDTO) {
        return this.httpClient.post(`${API_CONFIG.baseUrl}/account`, account, {
            observe: 'response',
            responseType: 'text'
        })
    }

}