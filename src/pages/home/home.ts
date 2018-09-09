import { AuthService } from './../../services/auth.service';
import { CredentiaisDTO } from './../../model/credentiais.dto';
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from '../../../node_modules/ionic-angular/components/app/menu-controller';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  credential: CredentiaisDTO = {
    username : "",
    password: ""
  }

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public authService: AuthService) {
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false)
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true)
  }

  ionViewDidEnter() {
    this.authService.refreshToken().subscribe(res => {
      console.log(res)
      if(res.body.access_token) {
        this.authService.successfullLogin(res.body)
        this.navCtrl.setRoot('CategoryPage')
      }
    }, error => {})
  }

  login() {
    this.authService.authenticate(this.credential).subscribe(res => {
      this.authService.successfullLogin(res.body)
      this.navCtrl.setRoot('CategoryPage')
    }, error => {})
  }

  logout() {
    
  }

  signup() {
    this.navCtrl.push('SignupPage')
  }

}
