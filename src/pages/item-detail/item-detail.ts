import { CartService } from './../../services/cart.service';
import { ItemDTO } from './../../model/item.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemService } from '../../services/domain/item.service';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
})
export class ItemDetailPage {

  item: ItemDTO

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public itemService: ItemService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    this.loadData()
  }

  loadData() {
    let itemId = this.navParams.get("itemId")
    this.itemService.getItem(itemId).subscribe(res => {
      console.log(res)
      this.item = res as ItemDTO
    }, error => {})
  }

  addToCart(item: ItemDTO) {
    this.cartService.addItem(item)
    this.navCtrl.setRoot("CartPage")
  }

}
