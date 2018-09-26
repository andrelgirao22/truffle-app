import { LocalUser } from './../../model/local_user';
import { AccountService } from './../../services/domain/account.service';
import { StorageService } from './../../services/storage.service';
import { AddressDTO } from './../../model/address.dto';
import { AccountDTO } from './../../model/account.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: AddressDTO[]

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public accountSevice: AccountService) {
  }

  ionViewDidLoad() {
    let localUser =  this.storage.getLocalUser()
    if(localUser && localUser.email) {
      let email = localUser.email
      this.accountSevice.findByEmail(email).subscribe(res => {
        this.items = res['addresses']
      }, error => {})
    }

  }

}
