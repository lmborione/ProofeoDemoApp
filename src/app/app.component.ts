import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { FirstRunPage } from '../pages';

import { HomePage } from '../pages/home/home';
// import { LoginPage } from '../pages/login/login';
// import { PresentationPage } from '../pages/presentation/presentation';
// import { LoginStellarPage } from '../pages/loginstellar/loginstellar';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {


  rootPage: any = HomePage;

@ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Home', component: HomePage },
    // { title: 'Login', component: 'LoginPage' },
    // { title: 'Presentation', component: 'PresentationPage' }
  ];

  constructor(public platform: Platform,
    public statusBar: StatusBar,
     public splashScreen: SplashScreen) {
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.show();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
