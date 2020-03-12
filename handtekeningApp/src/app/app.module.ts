import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FavoriteService } from './service/favorite.service';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { HttpClientModule } from '@angular/common/http';

import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {Base64ToGallery} from '@ionic-native/base64-to-gallery/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,IonicStorageModule.forRoot(), HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    FavoriteService,
    Geolocation,
    BarcodeScanner,Base64ToGallery,
    
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
     
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule {}
