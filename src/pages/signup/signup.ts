import { CidadeDto } from './../../model/cidade.dto';
import { EstadoDto } from './../../model/estado.dto';
import { ClientService } from './../../services/client.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup

  estados: EstadoDto[]
  cidades: CidadeDto[]
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public clientService: ClientService,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController) {

      this.formGroup = this.formBuilder.group({
        name: ['Andre Girao', [Validators.required, Validators.minLength(5)]],
        email: ['andrelgirao29@gmail.com', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        passwordConfirmation: ['', Validators.required],
        postalCode: ['60730285', Validators.required],
        addressName: ['Rua Eca de Queiroz', Validators.required],
        addressNumber:['2265', Validators.required],
        neignborhood:['Parque Sao Jose', Validators.required],
        complement:['Ap 201 Bl F'],
        state:[''],
        city:[''],
      })

    }


  signupUser() {
    this.clientService.insert(this.formGroup.value).subscribe(res => {
      this.showOk()
    }, error => {})
  }

  showOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.navCtrl.pop()
        }
      }]
    });

    alert.present()
  }

}
