import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { IonicPage, NavController, ViewController } from 'ionic-angular';

// import { SignupPage } from '../signup/signup'
// import { HomePage } from '../home/home'
import { ApiProvider } from '../../providers/api/api'
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
    public apiProvider : ApiProvider) {

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

    ionViewDidLoad() {
      this.apiProvider.getMsg().subscribe((res) => {
        console.log(res);});
    }

    // Attempt to login in through our User service
    doLogin() {
        let hash = SHA256(this.form.value.password).toString();

        this.credentials.email = this.form.value.email;
        this.credentials.passHash = hash;

        this.apiProvider.login(this.credentials)
        .subscribe((resp) => {
              // display its headers
              console.log(resp);
              this.viewCtrl.dismiss('connected');

              //this.navCtrl.push('HomePage');
            }, (err)=>{
                console.log(err);
            });

         // this.apiProvider.login(data).subscribe((res) => {
         //   console.log(res);
         //   //this.navCtrl.push(HomePage)
         // });


    // this.navCtrl.push(HomePage);
    // // Unable to log in
    // let toast = this.toastCtrl.create({
    //   message: this.loginErrorString,
    //   duration: 3000,
    //   position: 'top'
    // });
    // toast.present();
    // });
  }


}
