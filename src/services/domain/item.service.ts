import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable()
export class ItemService {

    constructor(private httpClient: HttpClient) {}

    getItems(categoryId: string): Observable<any> {
        return this.httpClient.get(`${API_CONFIG.baseUrl}/item/category/${categoryId}`)
    }
 }