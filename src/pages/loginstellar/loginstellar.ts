import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProofeoApiProvider } from '../../providers'
import { UserInfoProvider } from '../../providers'
/**
 * Generated class for the LoginstellarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loginstellar',
  templateUrl: 'loginstellar.html',
})
export class LoginStellarPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public apiProvider : ProofeoApiProvider,
    public userInfoProvider : UserInfoProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginStellarPage');
  }

onCreateAccountClick(event : any){
  //const userInfo = localStorage.getItem('loginInfo');
console.log(this.userInfoProvider.getAll());
  // to get a key/value pair
  // this.userInfoProvider.getAll().then((val) => {
  //   console.log('Your json is', val);
  // });

  //console.log(userInfo.email);

  this.apiProvider.getMsg().subscribe((res) => {
    console.log(res);

});


}
}
