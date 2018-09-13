import { AccountDTO } from './../../model/account.dto';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from './../../config/api.config';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class AccountService {

    url: string = `${API_CONFIG.baseUrl}/account`
    constructor(
        private httpClient: HttpClient) {}

    insert(account: AccountDTO) {
        return this.httpClient.post(this.url, account, {
            observe: 'response',
            responseType: 'text'
        })
    }

    findByEmail(email: string) : Observable<AccountDTO> {
        return this.httpClient.get<AccountDTO>(`${this.url}/${email}`)
    }

}