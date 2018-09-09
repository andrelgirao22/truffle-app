import { PostalCodeService } from './../../services/postal_code.service';
import { CidadeDto } from './../../model/cidade.dto';
import { EstadoDto } from './../../model/estado.dto';
import { ClientService } from './../../services/client.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StateService } from '../../services/state.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup

  estados: EstadoDto[] = []
  cidades: CidadeDto[] = []
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public clientService: ClientService,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public stateService: StateService,
    public postalCodeService: PostalCodeService) {

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
        state:['', Validators.required],
        city:['', Validators.required],
      })
    }

  ionViewDidLoad() {
    this.stateService.getStates().subscribe(res => {
      this.estados = res
      this.formGroup.controls.state.setValue(this.estados[0].ibgeCode)
      this.updateCidades()
    }, error => {})
  }

  updateCidades() {
    let estado = this.formGroup.value.state
    this.stateService.getCitiesFromState(estado).subscribe(res => {
      this.cidades = res
    }, errro => {})
  }

  updateAddress() {
    let postalCode = this.formGroup.value.postalCode
    this.postalCodeService.getAddressFromPostalCode(postalCode).subscribe(res => {
      if(res) {
        this.setAddress(res)
      }
      
    }, error => {})
  }

  signupUser() {
    this.clientService.insert(this.formGroup.value).subscribe(res => {
      this.showOk()
    }, error => {
      console.log(error)
    })
  }

  setAddress(address) {
    this.formGroup.controls.addressName.setValue(address.logradouro)
    this.formGroup.controls.neignborhood.setValue(address.bairro)
    this.formGroup.controls.state.setValue(address.localidade)
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
