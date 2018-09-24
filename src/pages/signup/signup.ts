import { AccountDTO } from './../../model/account.dto';
import { PostalCodeService } from './../../services/postal_code.service';
import { CidadeDto } from './../../model/cidade.dto';
import { EstadoDto } from './../../model/estado.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { StateService } from '../../services/state.service';
import { AccountService } from '../../services/domain/account.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup
  formGroupAddress: FormGroup

  estados: EstadoDto[] = []
  cidades: CidadeDto[] = []
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public accountService: AccountService,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public stateService: StateService,
    public postalCodeService: PostalCodeService) {

      this.formGroupAddress = this.formBuilder.group({
          postalCode: ['60730285', Validators.required],
          addressName: ['Rua Eca de Queiroz', Validators.required],
          addressNumber:['2265', Validators.required],
          neighborhood:['Parque Sao Jose', Validators.required],
          complement:['Ap 201 Bl F'],
          state:['', Validators.required],
          city:['', Validators.required]
      }) 

      this.formGroup = this.formBuilder.group({
        name: ['Andre Girao', [Validators.required, Validators.minLength(5)]],
        email: ['andrelgirao29@gmail.com', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        passwordConfirmation: ['', Validators.required],
        address: this.formGroupAddress
      }, {validator: SignupPage.equalsTo})
  }

  static equalsTo(group: AbstractControl): {[key:string]:boolean} {
    const password = group.get('password')
    const passwordConfirmation = group.get('passwordConfirmation')
    if(!password || !passwordConfirmation) {
      return undefined
    }

    if(password.value !== passwordConfirmation.value) {
      return {passwordNotMatch: true}
    } 

    return undefined
  }

  ionViewDidLoad() {
    this.stateService.getStates().subscribe(res => {
      this.estados = res
      this.formGroupAddress.controls.state.setValue(this.estados[0].ibgeCode)
      this.updateCidades()
    }, error => {})
  }

  updateCidades() {
    let estado = this.formGroupAddress.value.state
    this.stateService.getCitiesFromState(estado).subscribe(res => {
      this.cidades = res
    }, errro => {})
  }

  updateAddress() {
    let postalCode = this.formGroupAddress.value.postalCode
    this.postalCodeService.getAddressFromPostalCode(postalCode).subscribe(res => {
      if(res) {
        this.setAddress(res)
      }
      
    }, error => {})
  }

  signupUser() {

    let address = this.formGroupAddress.value
    let account = this.formGroup.value
    console.log('account', account)
    account.address = address

    this.accountService.insert(account).subscribe(res => {
      this.showOk()
    }, error => {
      console.log(error)
    })
  }

  setAddress(address) {
    console.log('adress', address)
    this.formGroupAddress.controls.addressName.setValue(address.logradouro)
    this.formGroupAddress.controls.neighborhood.setValue(address.bairro)
    this.formGroupAddress.controls.state.setValue(address.uf)
    this.formGroupAddress.controls.city.setValue(address.localidade)
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
