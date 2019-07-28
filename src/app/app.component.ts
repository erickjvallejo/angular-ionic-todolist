import { Component , OnInit, OnDestroy, AfterViewInit} from '@angular/core';

import { Platform , AlertController  } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  backButtonSubscription;
  // for storing the returned subscription

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public alertController: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      
      this.statusBar.styleDefault();
      
      // let status bar overlay webview
      this.statusBar.overlaysWebView(true);

      // set status bar to white
      this.statusBar.backgroundColorByHexString('#ffffff');
      
      this.splashScreen.hide();
    });
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.platform.backButton.subscribe();
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
     this.presentAlertConfirm();
    });
   }
  ngOnDestroy() { 
    this.backButtonSubscription.unsubscribe();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Exit?',
      message: 'Hi, do you want to <strong>exit</strong>?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancel');
          }
        }, {
          text: 'Okay',
          handler: () => {
            navigator['app'].exitApp();
          }
        }
      ]
    });

    await alert.present();
  }


}
