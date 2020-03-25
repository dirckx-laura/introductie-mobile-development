
import { FavoriteService } from '../service/favorite.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, Directive, Injectable } from '@angular/core';
import { Map, latLng, tileLayer, Layer } from 'leaflet';
import { Router } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { HttpClient } from '@angular/common/http'
import { Subscription, Observable, from } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { map } from "rxjs/operators";
import { HttpClientModule } from '@angular/common/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  qrData = "Test";
  scannedCode = null;


  constructor(private barcodeScanner: BarcodeScanner, private http: HttpClient, public favoriteService: FavoriteService, public fb: FormBuilder, private sanitizer: DomSanitizer, private router: Router, private geolocation: Geolocation) {
  }

  scanCode() {
    this.barcodeScanner.scan().then(
      barcodeData => {
        this.scannedCode = barcodeData.text;

      }
    );

  }

  //variabele voor QR-scanner
  buttonDisabled: boolean;
  //variabelen voor locatie
  lon: any;
  lat: any;


  // reference naar de goReverseService API van openstreetmap
  geoReverseService = 'nominatim.openstreetmap.org/reverse?format=json&lat='
  pointedAddressOrg: string
  pointedAddress: string
  //variabelen voor handtekeningen
    naam: String;
    naamForm = this.fb.group({
    voornaam: ['', Validators.required],
    achternaam: ['', Validators.required],
    studentenNr: ['', Validators.required],

  })
  points = [];
  signatureImage = null;
  imgurl;
  locatieObject: any;



  // slaat de huidige handtekening op in een tijdelijke variabele
  saveImage(data) {
    if (data != "data:,") {
      this.signatureImage = data;
    }
    
  }
  // set alle gegevens
  setNaam() {

    // this.favoriteService.storage.clear();
    if (this.signatureImage != null) {
      var gegevens = this.naamForm.value.studentenNr+" "+this.naamForm.value.voornaam+" "+this.naamForm.value.achternaam;
      this.favoriteService.setStudentInfo(gegevens);
      this.favoriteService.setHandtekening(this.signatureImage);
      
    }
    

    this.favoriteService.setDatum(new Date().toLocaleDateString() + "\t" + new Date().toLocaleTimeString());
    if (this.favoriteService.ShowCode) {
      
      this.favoriteService.setLocatieOfBarcode(this.naamForm.value.studentenNr+" code: "+this.scannedCode)
    }
    else {

      this.locatePosition().then(res => {
        res.coords.latitude;
        res.coords.longitude;
        this.http.get('http://nominatim.openstreetmap.org/reverse?format=json&lat=' + res.coords.latitude + '&lon=' + res.coords.longitude).subscribe(data => {
          this.favoriteService.setLocatieOfBarcode(data);
       
        });
      }).catch((error) => {
        console.log('Error getting location', error);
      });     
    }
    this.naamForm.value.voornaam = "";
    this.naamForm.value.achternaam = "";
    this.naamForm.value.studentenNr = "";
    this.naamForm.reset("");    
  }

  //positie bepalen
  locatePosition() {
    return this.geolocation.getCurrentPosition();
  }

  
}
