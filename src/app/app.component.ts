import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BluetoothLE } from '@ionic-native/bluetooth-le/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private bluetoothle: BluetoothLE
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      const params = {
        request: true,
        statusReceiver: true,
        restoreKey : 'bluetoothleplugin'
      };

      this.bluetoothle.initialize(params).subscribe(ble => {
        console.log('ble', ble.status); // logs 'enabled'
      });

      const scanParams = {
        services: [
          '180D',
          '180F'
        ],
        allowDuplicates: true,
        scanMode: this.bluetoothle.SCAN_MODE_LOW_LATENCY,
        matchMode: this.bluetoothle.MATCH_MODE_AGGRESSIVE,
        matchNum: this.bluetoothle.MATCH_NUM_MAX_ADVERTISEMENT,
        callbackType: this.bluetoothle.CALLBACK_TYPE_ALL_MATCHES,
      };

      this.bluetoothle.startScan(scanParams).subscribe((status) => {
        alert(status);
      }, () => {

      });

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
