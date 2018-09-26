import { ImageUtilService } from './../image-util.service';
import { AccountDTO } from './../../model/account.dto';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from './../../config/api.config';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class AccountService {

    url: string = `${API_CONFIG.baseUrl}/account`
    constructor(
        private httpClient: HttpClient,
        private imageUtilService: ImageUtilService) {}

    insert(account: AccountDTO) {
        return this.httpClient.post(this.url, account, {
            observe: 'response',
            responseType: 'text'
        })
    }

    getImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/acc${id}.jpg`
        return this.httpClient.get(url, {
            responseType: 'blob'
        })
    }

    blobToDataURL(data): any {
        return this.imageUtilService.blobToDataURL(data)
    }

    uploadPitcure(id: string, file: any) {
        let pictureBlob = this.imageUtilService.dataUriToBlob(file)
        let formData = new FormData()
        formData.append('file', pictureBlob, 'file.png')
        
        return this.httpClient.post(
            `${this.url}/picture/${id}`, 
            formData,
            {
                observe: 'response',
                responseType: 'text'
            })
    }

    findByEmail(email: string)  {
        return this.httpClient.get(`${this.url}/${email}`)
    }

}