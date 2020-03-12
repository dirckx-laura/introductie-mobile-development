
import { FavoriteService } from '../service/favorite.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, Directive, Injectable } from '@angular/core';
import { Map, latLng, tileLayer, Layer } from 'leaflet';
import {Router} from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { HttpClient } from '@angular/common/http'
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { map } from "rxjs/operators";
import { HttpClientModule } from '@angular/common/http';


import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import {Base64ToGallery} from '@ionic-native/base64-to-gallery/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  qrData = "Test";
  scannedCode = null;


  constructor(private barcodeScanner: BarcodeScanner,private http:HttpClient ,public favoriteService: FavoriteService,public fb: FormBuilder, private sanitizer: DomSanitizer, private router:Router, private geolocation: Geolocation) {
  }

  scanCode(){
    this.barcodeScanner.scan().then(
     barcodeData => {
        this.scannedCode = barcodeData;
      }
    );
    
    }
 
  //variabele voor QR-scanner
  buttonDisabled:boolean;
  //variabelen voor locatie
 
  lon:any;
  lat:any;

 
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
  signatureImage=null;
  imgurl;

  
  
  saveImage(data) {
    if(data!="data:,"){
      this.signatureImage = data;
      console.log(data);
    }
    // this.favoriteService.setHandtekening(this.signatureImage);
    
    // var tussenimgurl=URL.createObjectURL(new Blob([data],{ type: "image/jpeg" })); 

  }


  setNaam() {
    // this.naam=document.getElementById('voornaam').innerText;
    // this.naam+=document.getElementById('naam').innerText;
    // document.getElementById('voornaam').innerText="";
    // document.getElementById('naam').innerText=""
    // this.favoriteService.storage.clear();
    if(this.signatureImage!=null){
      this.favoriteService.setNaam(this.naamForm.value.achternaam);
      this.favoriteService.setVoorNaam(this.naamForm.value.voornaam);
    this.favoriteService.setHandtekening(this.signatureImage);
    this.favoriteService.setStudentNr(this.naamForm.value.studentenNr);
    console.log(this.naamForm.value.studentenNr);
    }
    this.naamForm.value.voornaam = "";
    this.naamForm.value.achternaam = "";
    this.naamForm.value.studentenNr = "";
    this.naamForm.reset("");
    
  }

  //positie bepalen
  locatePosition(){
    this.geolocation.getCurrentPosition().then((resp) => {
      resp.coords.latitude
      resp.coords.longitude;
      
     
      //get json      
     this.http.get('http://nominatim.openstreetmap.org/reverse?format=json&lat=' + resp.coords.latitude + '&lon=' + resp.coords.longitude).subscribe(data => {
      console.log(data);
      this.favoriteService.setLocatie(data);
 });   
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      data.coords.latitude
       data.coords.longitude
       
     });
  }


  
/*
getAddress: function(lat, lng) {
			var q = $q.defer();
			$http.get('http://nominatim.openstreetmap.org/reverse?format=json&lat=' + lat + '&lon=' + lng + '&zoom=18&addressdetails=1').
			success(function(data, status, headers, config) {
					q.resolve(data);
				});
			return q.promise;
		}
*/
 
  
  /*
  .setView([51.2194,4.4025], 13);
  tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    { attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'})
    .addTo(this.map); // This line is added to add the Tile Layer to our map*/
   
  //}


  // laat alle namen en handtekeningen in een tabel zien
  getAllNamen() {
    this.favoriteService.getLocatie().then(locaties=>{
      locaties.forEach(locatie=>console.log(locatie));
    })
    document.getElementById("tableTest").innerHTML="<tr>"+
    "<th>StudentenNr</th>"+
    "<th>Voornaam</th>"+
    "<th>Naam</th>"+
    "<th>Handtekening</th>"+
  "</tr>";
    this.favoriteService.getNamen().then(result => {
      result.forEach(test=>{
        this.favoriteService.getHandtekeningen().then(res=>{
          res.forEach(link=>{
            this.favoriteService.getSnummers().then(res2=>{
              res2.forEach(sNr=>{
                this.favoriteService.getVoorNamen().then(res3=>{
                  res3.forEach(voorNaam=>{
                    if(res.indexOf(link)==result.indexOf(test) && res2.indexOf(sNr)==res.indexOf(link) && res3.indexOf(voorNaam)==res.indexOf(link)  ){
                      var img = document.createElement("img");
                      img.src = res[result.indexOf(test)];
                      console.log(result);
                      console.log(res);
                      console.log(res2);
                      console.log(res3);
                      var tussenstap=document.getElementById("tableTest");
                      tussenstap.innerHTML+=`<td>${sNr}</td><td>${voorNaam}</td><td>${test}</td><td><img src="${img.src}" width="250px" height="75px"/></td>`;
                      // tussenstap.appendChild(img);
                      // document.getElementById("naamKolom").appendChild(test);
                      console.log(img);
                    }
                  })
                })
                
              })
              
            })
            
          })
          
        })
      })
      // document.getElementById("demo").innerHTML = result;
    });
    
    // this.favoriteService.getHandtekeningen().then(result => {
    //   console.log("zrgzuorggz");
    //   if (result) {
    //     result.forEach(link => {
    //       // var objurl=URL.createObjectURL(new Blob([link],{ type: "image/jpeg" }));
    //       // var img=new Image();
    //       // img.src=objurl;
    //       // img.setAttribute("width","40px");
    //       // img.setAttribute("height","40px");
           
    //       var img = document.createElement("img");
    //       // img = document.querySelector("#ht");
    //       img.src = link;

    //       var tussenstap=document.getElementById("demo2");
    //       tussenstap.appendChild(img);
    //       console.log(img);
    //     });


    //   }

    // })
  


  }}
