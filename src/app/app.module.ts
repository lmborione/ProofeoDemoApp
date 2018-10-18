import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { IonicStorageModule, Storage } from '@ionic/storage';

import { SuperTabsModule } from 'ionic2-super-tabs';

import { Credentials } from '../models/credentials';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProofeoApiProvider } from '../providers';
import { UserInfoProvider } from '../providers';

export function provideUserInfo(storage: Storage) {
  return new UserInfoProvider(storage, {
    email: 'lmborione@gmail.com',
    passHash: ''
  });
}

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    SuperTabsModule.forRoot(),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ProofeoApiProvider,

    { provide: UserInfoProvider, useFactory: provideUserInfo, deps: [Storage] },
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
