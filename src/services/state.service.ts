import { EstadoDto } from './../model/estado.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StateService {

    constructor(private http: HttpClient) {}

    getStates(): Observable<any> {
        let url = `http://localhost:8080/state`
        return this.http.get(url)
    }

    getCitiesFromState(estado: number): Observable<any> {
        console.log('estado', estado)
        let url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`
        return this.http.get(url)
    }
}

