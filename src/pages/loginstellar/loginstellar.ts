import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api'
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
    public apiProvider : ApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginStellarPage');
  }

onCreateAccountClick(event : any){
  this.apiProvider.getMsg().subscribe((res) => {
    console.log(res);

});

this.apiProvider.postUser().subscribe((res) => {
  console.log(res);

});

}
}
