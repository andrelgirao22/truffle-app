import { ItemService } from './../../services/domain/item.service';
import { ItemDTO } from './../../model/item.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage {

  items: ItemDTO[] = []

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public itemSevice: ItemService) {
  }

  ionViewDidLoad() {
    this.loadData()
  }

  loadData() {
    let categoriaId = this.navParams.get('categoryId')
    this.itemSevice.getItems(categoriaId).subscribe(res => {
      this.items = res
    }, error => {})
  }

  showDetail(itemId: string) {
    this.navCtrl.push("ItemDetailPage", {itemId: itemId})
  }

}
