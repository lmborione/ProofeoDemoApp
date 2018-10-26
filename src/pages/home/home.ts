import { Component } from '@angular/core';
import { NavController, IonicPage,  NavParams , ModalController} from 'ionic-angular';
import { SuperTabsController } from 'ionic2-super-tabs';
import { Tab1Root, Tab2Root, Tab3Root , Tab4Root} from '../';
import { ProofeoApiProvider } from '../../providers'
import { UserInfoProvider } from '../../providers/userinfo/userinfo'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  tab1Root: any = Tab1Root;
  tab2Root: any = Tab2Root;
  index = 0;
userInfoProviderReady:boolean = false;

  isBackendServerAvailable: boolean = false;

  constructor(public navCtrl: NavController
    , public modalCtrl: ModalController
    , private superTabsCtrl: SuperTabsController
    , public navParams: NavParams
    , public apiProvider : ProofeoApiProvider
    , public userInfoProvider : UserInfoProvider
  ) {

  }

  ionViewDidLoad() {

    this.userInfoProvider.getToken().then((val) => {
      this.userInfoProviderReady = true;
      console.log("user loaded : " + JSON.stringify(val));
    });

    this.apiProvider.getBackendServerVersion().subscribe(
      (res) => {
        console.log(res);
        if(res == 'beta 0.0.4') {
          this.isBackendServerAvailable = true;
        }
    });
  }

  login() {
    let addModal = this.modalCtrl.create('LoginPage');
    addModal.onDidDismiss(item => {
      if (item && this.userInfoProviderReady) {
        this.userInfoProvider.setToken(item);
        this.apiProvider.SetHeaderTokenAuth(item);
      }
    })
    addModal.present();
  }

  signUp() {
    let addModal = this.modalCtrl.create('SignupPage');
    addModal.onDidDismiss(item => {
      if (item) {
        console.log(item);
      }
    })
    addModal.present();
  }


  ngAfterViewInit() {
    // must wait for AfterViewInit if you want to modify the tabs instantly
    //this.superTabsCtrl.setBadge('homeTab', 5);
    // this.hideToolbar();

    this.superTabsCtrl.enableTabsSwipe(true);
  }

  slideToIndex(index: number) {
    this.superTabsCtrl.slideTo(index);
  }

  // hideToolbar() {
  //   this.superTabsCtrl.showToolbar(false);
  // }
  //
  // showToolbar() {
  //   this.superTabsCtrl.showToolbar(true);
  // }

  onTabSelect(ev: any) {
    this.index = ev.index;
    console.log('Tab selected', 'Index: ' + ev.index, 'Unique ID: ' + ev.id);
  }

  onClick() {
    // this.slideToIndex(this.index + 1);
  }
}
