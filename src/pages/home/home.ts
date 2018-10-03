import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { SuperTabsController } from 'ionic2-super-tabs';
import { PresentationPage } from '../presentation/presentation';
import { LoginStellarPage } from '../loginstellar/loginstellar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tab1Root: any = PresentationPage;
  tab2Root: any = LoginStellarPage;
  index = 0;

  constructor(public navCtrl: NavController, private superTabsCtrl: SuperTabsController) {

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

  hideToolbar() {
    this.superTabsCtrl.showToolbar(false);
  }

  showToolbar() {
    this.superTabsCtrl.showToolbar(true);
  }

  onTabSelect(ev: any) {
    this.index = ev.index;
    console.log('Tab selected', 'Index: ' + ev.index, 'Unique ID: ' + ev.id);
  }

onClick() {
  this.slideToIndex(this.index + 1);
}
}
