import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProofeoApiProvider } from '../../providers';
import { UserInfoProvider } from '../../providers';
import { Credentials } from "../../models/credentials";
import { User } from "../../models/credentials";
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

  isStellarLogin: boolean = false;

  user: User = {'email':'', 'publicKey': ''};
  balances:any = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public apiProvider : ProofeoApiProvider,
    public userInfoProvider : UserInfoProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginStellarPage');
  }

  ionViewDidEnter() {
    this.userInfoProvider.getToken().then((val) => {
      this.user.email = val.user.email;
      this.checkStellarAccountAssociated();
    });
  }

  onCreateAccountClick(event : any){
    if(!this.isStellarLogin){
      this.apiProvider.createStellarAccount().subscribe((resp) => {
        console.log('resp: ' + resp);
        this.checkStellarAccountAssociated();
        var data = {
          'asset': {
            'issuerPublicKey': 'GCBDJ4MPH6LS4KPNBSAPRNBCHOOG5MSVTZUQHGYLNDG47X4ZYH5YWB5Y',
            'code': 'FID'
          }
        };

        this.apiProvider.trustStellarOnAccount(data).subscribe((trustResp) => {
          console.log('trustResp:' + JSON.stringify(trustResp));

          var transferData = {
        		'sourceAccount': 'SC7CJCAYLN5ZQEGYZ2MJ7OBBFEQY4FKA3GPV5IHXUP6PK652WU4HINR2',
        		'amount': '100',
        		'asset': {
        			'issuerPublicKey': 'GCBDJ4MPH6LS4KPNBSAPRNBCHOOG5MSVTZUQHGYLNDG47X4ZYH5YWB5Y',
        			'code': 'FID'
        		}
        	};
          this.apiProvider.transferAssetOnMyAccount(data).subscribe((transferResp) => {
            console.log('transferResp:' + JSON.stringify(transferResp));
          });
        });

      }, (err)=>{
        console.log(err);
      });
    }
  }

  checkStellarAccountAssociated() {
    return this.apiProvider.checkStellarAccount()
    .subscribe((resp) => {
      console.log(resp);

      if(resp.account_id){
        this.isStellarLogin = true;
        this.user.publicKey = resp.publicKey;
        this.balances = resp.balances;

        console.log(this.balances);
      }
      else if(resp.statusCode == 400){
        this.stellarAccount.id = 'Account not created';
      }

    }, (err)=>{

      console.log(err);
    });
  }
}
