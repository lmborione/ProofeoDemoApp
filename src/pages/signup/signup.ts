import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, ToastController, AlertController } from 'ionic-angular';

import { ApiProvider } from'../../providers/api/api'
import { SHA256 } from "crypto-js"; // SHA3 one-way encryption
 import { SHA3 } from "crypto-js"; // SHA3 one-way encryption
 import { AES } from 'crypto-js'; // For AES encryption/decryption
 import { enc } from 'crypto-js'; // For characters encodages types (Utf-8, latin1...)

/**
* Generated class for the SignupPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  isReadyToSave: boolean

  form: FormGroup;
  createSuccess = false;
  // registerCredentials = { name: '', email: '', password: '', confirmation_password: '' };

  constructor(
    private nav: NavController,
    private api: ApiProvider,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController
  ) {

    this.form = this.formBuilder.group({
      email: [''],
      name: [''],
      password: [''],
      confirmation_password: ['']

    });
  }

  public register() {
    if (this.form.value.password != this.form.value.confirmation_password) {
      this.showPopup("Error", 'The password confirmation does not match.');
    } else {

      let hash = SHA256(this.form.value.password).toString()
      var data = {
        'name': this.form.value.name,
        'email': this.form.value.email,
        'passHash': hash
      };
      this.api.signup(data).subscribe(success => {
        console.log(success);
        if (success) {
          this.createSuccess = true;
          this.showPopup("Success", "Account created.");
        } else {
          this.showPopup("Error", "Problem creating account.");
        }
      },
      (error) => {
        console.log(JSON.stringify(error));
        this.showPopup("Error","Problem creating account.");
      });
    }
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

}
