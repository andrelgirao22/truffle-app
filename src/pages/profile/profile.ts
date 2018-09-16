import { API_CONFIG } from './../../config/api.config';
import { AccountService } from './../../services/domain/account.service';
import { AccountDTO } from './../../model/account.dto';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cameraOn: boolean = false
  picture: string
  account: AccountDTO

  profileImage: any

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storageService: StorageService,
    public accountService: AccountService,
    public camera: Camera,
    public sanitizer: DomSanitizer) {
      this.profileImage = "assets/imgs/avatar-blank.png"
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let localUser = this.storageService.getLocalUser()
    if(localUser && localUser.email) {
      this.accountService.findByEmail(localUser.email).subscribe(res => {
        this.account = res
        this.getImageIfExist()
        //this.profileImage = this.account.imageUrl || 'assets/imgs/avatar-blank.png'
      }, error => {})
    }
  }

  getImageIfExist() {
    this.accountService.getImageFromBucket(this.account.id).subscribe(res => {
      this.account.imageUrl = `${API_CONFIG.bucketBaseUrl}/acc${this.account.id}.jpg`
      this.accountService.blobToDataURL(res).then(dataUrl => {
        let str: string = dataUrl as string

        this.profileImage = this.sanitizer.bypassSecurityTrustUrl(str)
      })
    }, error => {
      this.profileImage = "assets/imgs/avatar-blank.png"
    })
  }

  getCameraPicture() {

    this.cameraOn = true

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
      this.picture = 'data:image/png;base64,' + imageData;
      this.cameraOn = false
    }, (err) => {
      this.cameraOn = false
     
    });
  }

  getGalleryPicture() {
    this.cameraOn = true
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
      this.picture = 'data:image/jpg;base64,' + imageData;
      this.cameraOn = false
    }, (err) => {
      this.cameraOn = false
     
    });
  }

  sendPicture() {
    this.accountService.uploadPitcure(this.account.id,this.picture).subscribe(res => {
      this.picture = null
      this.getImageIfExist()
    }, error => {

    })
  }

  cancel() {
    this.picture = null
  }

}
