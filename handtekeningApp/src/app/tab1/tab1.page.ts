
import { FavoriteService } from '../service/favorite.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, Directive } from '@angular/core';
import { Map, latLng, tileLayer, Layer } from 'leaflet';
import {Router} from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { HttpClient } from '@angular/common/http'
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { Geolocation } from '@ionic-native/geolocation/ngx';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(public favoriteService: FavoriteService,public fb: FormBuilder, private sanitizer: DomSanitizer, private router:Router) {
  }


  //variabele voor QR-scanner
  buttonDisabled:boolean;
  //variabelen voor locatie
  map:Map;
  newMarker:any;
  lon:any;
  lat:any;
 
    // reference naar de goReverseService API van openstreetmap
    geoReverseService = 'https://nominatim.openstreetmap.org/reverse?key=iTzWSiYpGxDvhATNtSrqx5gDcnMOkntL&format=json&addressdetails=1&lat={lat}&lon={lon}'
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

  

  ionViewDidEnter(){
    this.loadMap();
  }
  
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
    this.map.locate({setView:true}).on("locationfound", (e: any)=> {
      this.lon = e.longitude;
      this.lat = e.latitude;

     
    });
  }

  //map laden
  loadMap(){this.map = new Map("mapId",{
    zoomControl: false,
    attributionControl:false    
  })
  
  /*
  .setView([51.2194,4.4025], 13);
  tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    { attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'})
    .addTo(this.map); // This line is added to add the Tile Layer to our map*/
   
  }

   //deze methode word opgeroepen wanneer iemand op 'confirm location' drukt
   confirmLocation(data){
    const service = (this.geoReverseService || '')
      .replace(new RegExp('{lon}', 'ig'), `${this.lon}`)
      .replace(new RegExp('{lat}', 'ig'), `${this.lat}`)
      
      //hier toon ik de link die word opgeslagen in de console
      console.log(service)
    //hier sla ik de link als JSON in onze databank als locatie
      this.favoriteService.setLocatie(service);

    //hier toon ik de array van locaties in de console. Als we op deze link drukken opent de JSON
        this.favoriteService.getLocatie().then(result=>{
            console.log(result)
            
        });
        

  }
  // laat alle namen en handtekeningen in een tabel zien
  getAllNamen() {
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
