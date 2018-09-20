import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { Cart } from '../model/cart';
import { ItemDTO } from '../model/item.dto';

@Injectable()
export class CartService {

    constructor(public storage: StorageService) {}

    createOrClearCart(): Cart {
        let cart = {itens: []}
        this.storage.setCart(cart)
        return cart
    }

    getCart(): Cart {
        let cart = this.storage.getCart()
        if(cart == null) {
            cart  = this.createOrClearCart()
        }
        return cart
    }

    addItem(item: ItemDTO) {
        let cart = this.getCart()
        let position = cart.itens.findIndex(i => i.item.id === item.id)
        if(position == -1) {
            cart.itens.push({quantity: 1, item: item})
        }

        this.storage.setCart(cart)
    }
    
}