import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { IonicPage, NavController, ViewController } from 'ionic-angular';

import { ProofeoApiProvider } from '../../providers'

import { SHA256 } from "crypto-js"; // SHA3 one-way encryption
import { Credentials } from "../../models/credentials";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  //loginCredentials: Credentials = { email :'', password: ''};
  credentials: Credentials = { email :'', passHash: ''};
  form: FormGroup;
  //printedCredentials = { mail: 'lmborione@gmail.com', password: 'test' };

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public formBuilder: FormBuilder,
    public apiProvider : ProofeoApiProvider) {

      // this.controlFormMail = new FormControl('value', *validation function goes here*, *asynchronous validation function goes here*);
      //
      // this.form = new FormGroup({
      //     firstName: new FormControl('Josh'),
      //     lastName: new FormControl('Morony')
      // });
      //

      this.form = this.formBuilder.group({
        email: [''],
        password: ['']
      });
    }



    // Attempt to login in through our User service
    doLogin() {
      let hash = SHA256(this.form.value.password).toString();

      this.credentials.email = this.form.value.email;
      this.credentials.passHash = hash;

      this.apiProvider.login(this.credentials)
      .subscribe((resp) => {
        console.log(resp);
        this.viewCtrl.dismiss(resp);

        //this.navCtrl.push('HomePage');
      }, (err)=>{
      console.log(err);
    });
  }


}
