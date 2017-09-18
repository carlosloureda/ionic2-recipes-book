import { AuthService } from './../services/auth';
import { SignupPage } from './../pages/signup/signup';
import { SigninPage } from './../pages/signin/signin';
import { TabsPage } from './../pages/tabs/tabs';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase'; 

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // VIP to hage rootPage, see firebase problems on viewchild not ready
  rootPage:any = TabsPage;
  // pages to be loaded from sidebar
  tabsPage = TabsPage;
  signinPage =  SigninPage;
  signupPage = SignupPage;
  isAuthenticated = false;
  // we accesing to @angular view for mamangeing the root
  @ViewChild('nav') nav: NavController;

  constructor(
    platform: Platform, statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    private authService: AuthService
  ) {
    // Initialize firebase
    firebase.initializeApp({
      apiKey: "<YOUR-APIKEY>",
      authDomain: "<YOUR-DOMAIN>"
    });
    // Event fired whenever the auth state changes
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.isAuthenticated = true;
        this.nav.setRoot(TabsPage);
      } else {
        this.isAuthenticated = false;
        this.nav.setRoot(SigninPage);
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoadPage(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }
  
  onCloseMenu(){
    this.menuCtrl.close();
  }

  onLogout() {
    this.authService.signout();
    this.menuCtrl.close();
  }
}

