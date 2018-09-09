import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class PostalCodeService {

    url: string = "https://viacep.com.br/ws"

    constructor(private http: HttpClient) {}

    getAddressFromPostalCode(postalCode: string): Observable<any> {
        return this.http.get(`${this.url}/${postalCode}/json/`)
    }

}