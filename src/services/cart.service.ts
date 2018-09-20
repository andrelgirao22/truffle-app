import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { Cart } from '../model/cart';
import { ItemDTO } from '../model/item.dto';

@Injectable()
export class CartService {

    constructor(public storage: StorageService) {}

    createOrClearCart(): Cart {
        let cart = {items: []}
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
        let position = cart.items.findIndex(i => i.item.id === item.id)
        if(position == -1) {
            cart.items.push({quantity: 1, item: item})
        }

        this.storage.setCart(cart)
        return cart
    }

    removeItem(item: ItemDTO): Cart {
        let cart = this.getCart()
        let position = cart.items.findIndex(i => i.item.id === item.id)
        if(position != -1) {
            cart.items.splice(position, 1)
        }

        this.storage.setCart(cart)
        return cart
    }

    
    increaseQuantity(item: ItemDTO): Cart {
        let cart = this.getCart()
        let position = cart.items.findIndex(i => i.item.id === item.id)
        if(position != -1) {
            cart.items[position].quantity++
        }

        this.storage.setCart(cart)
        return cart
    }

    decreaseQuantity(item: ItemDTO): Cart {
        let cart = this.getCart()
        let position = cart.items.findIndex(i => i.item.id === item.id)
        if(position != -1) {
            cart.items[position].quantity--
            if(cart.items[position].quantity < 1) {
                cart = this.removeItem(item)
            }
        }

        this.storage.setCart(cart)
        return cart
    }

    getTotal(): number {
        let cart = this.getCart()
        let sum = 0
        for(let i =0; i < cart.items.length ; i++) {
            sum += cart.items[i].item.price * cart.items[i].quantity
        }

        return sum
    }

    
}