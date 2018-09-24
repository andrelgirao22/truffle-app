import { ItemDTO } from './../../model/item.dto';
import { CartItem } from './../../model/cart-item';
import { CartService } from './../../services/cart.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[]

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    let cart = this.cartService.getCart()
    this.items = cart.items
  }

  increase(item: ItemDTO) {
    this.items = this.cartService.increaseQuantity(item).items
  }

  decrease(item: ItemDTO) {
    this.items = this.cartService.decreaseQuantity(item).items
  }

  removeItem(item: ItemDTO) {
    this.items = this.cartService.removeItem(item).items
  }

  total(): number {
    return this.cartService.getTotal()
  }

  goOn() {
    this.navCtrl.setRoot("CategoryPage")
  }

  checkout() {
    this.navCtrl.push("PickAddressPage")
  } 
}
