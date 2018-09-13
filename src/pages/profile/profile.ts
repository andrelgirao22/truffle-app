import { AccountService } from './../../services/domain/account.service';
import { AccountDTO } from './../../model/account.dto';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  account: AccountDTO

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storageService: StorageService,
    public accountService: AccountService) {
  }

  ionViewDidLoad() {
    let localUser = this.storageService.getLocalUser()
    if(localUser && localUser.email) {
      this.accountService.findByEmail(localUser.email).subscribe(res => {
        this.account = res
        //buscar imagem
      }, error => {})
    }
  }

}
