import { LocalUser } from './../model/local_user';
import { Injectable } from '@angular/core';
import  { STORAGE_KEYS } from '../config/storage_keys.config';

@Injectable()
export class StorageService {

    constructor() {}

    getLocalUser(): LocalUser  {
        let user = localStorage.getItem(STORAGE_KEYS.localUser)
        if(user == null) {
            return null
        } else {
            return JSON.parse(user)
        }
    }

    setLocalUser(localUser: LocalUser) {
        if(localUser == null) {
            localStorage.removeItem(STORAGE_KEYS.localUser)
        } else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(localUser))
        }
    }

}