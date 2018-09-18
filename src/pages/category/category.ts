import { CategotyService } from './../../services/domain/category.service';
import { CategoryDTO } from './../../model/category.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

  categories: CategoryDTO[] = []

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoryService: CategotyService) {
  }

  ionViewDidLoad() {
    this.categoryService.getCategories().subscribe(res => {
      this.categories = res
    }, error => {}) 


  }

  gotToItem(categoryId: string) {
    console.log('category id', categoryId)
    this.navCtrl.push('ItemPage', {categoryId: categoryId})
  }

}
