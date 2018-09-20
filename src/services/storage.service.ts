import { LocalUser } from './../model/local_user';
import { Injectable } from '@angular/core';
import  { STORAGE_KEYS } from '../config/storage_keys.config';
import { Cart } from '../model/cart';

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

    getCart(): Cart {
        let str = localStorage.getItem(STORAGE_KEYS.cart)
        if(str != null) {
            return JSON.parse(str)
        } else {
            return null
        }
    }

    setCart(obj: Cart) {
        if(obj != null) {
            localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj))
        } else {
            localStorage.removeItem(STORAGE_KEYS.cart)
        }
    }
}