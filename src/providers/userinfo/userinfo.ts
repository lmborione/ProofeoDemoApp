import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import  { Credentials } from '../../models/credentials'
/**
 * A simple settings/config class for storing key/value pairs with persistence.
 */
@Injectable()
export class UserInfoProvider {
  private SETTINGS_KEY: string = 'token';

  token: any;

  constructor(public storage: Storage) {

  }

  getToken() {
    return this.storage.get(this.SETTINGS_KEY).then((value) => {
      if (value) {
        this.token = value;
        return this.token;
      }
    });
  }


  setToken(value: any) {
    return this.storage.set(this.SETTINGS_KEY, value).then((value) => {
      this.token = value;
    });
  }

  clear() {
    return this.setToken({
      'token':'',
      'user':{
        'email': 'defaultUser',
        'publicKey': ''
      }
    }).then((val) => {
      console.log(val);
    });
  }
}
