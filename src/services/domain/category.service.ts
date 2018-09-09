import { API_CONFIG } from './../../config/api.config';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class CategotyService {

    constructor(private http: HttpClient) {}

    getCategories(): Observable<any> {
        return this.http.get(`${API_CONFIG.baseUrl}/category`)
    }

}