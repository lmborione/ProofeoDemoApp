import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PresentationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-presentation',
  templateUrl: 'presentation.html',
})
export class PresentationPage {

  isLogin: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad PresentationPage');
    //this.isLogin = localStorage.getItem('login');
    console.log(this.isLogin);
  }

  openTab2() {
    console.log('openTab2');
    console.log(this.navCtrl.parent.parent);
    this.navCtrl.parent.slideTo(1);
  }

}
