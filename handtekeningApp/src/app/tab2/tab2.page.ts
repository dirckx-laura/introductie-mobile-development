import { Component, Directive } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker, circleMarker } from 'leaflet';
import {Router} from '@angular/router';
import { FavoriteService } from '../service/favorite.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { HttpClient } from '@angular/common/http'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {

  map:Map;
  newMarker:any;
  lon:any;
  lat:any;
   // reference naar de goReverseService API van openstreetmap
   geoReverseService = 'https://nominatim.openstreetmap.org/reverse?key=iTzWSiYpGxDvhATNtSrqx5gDcnMOkntL&format=json&addressdetails=1&lat={lat}&lon={lon}'
   pointedAddressOrg: string
   pointedAddress: string
  
  constructor(private router:Router, public favoriteService: FavoriteService) { }
  
    // Toont map
  ionViewDidEnter(){
    this.loadMap();
  }

  
  // Toont map
  loadMap(){this.map = new Map("mapId").setView([51.2194,4.4025], 13);
  tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    { attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'})
    .addTo(this.map); // This line is added to add the Tile Layer to our map
   
  }
   //deze methode word opgeroepen wanneer iemand 'locate me' knop drukt
  locatePosition(){
    this.map.locate({setView:true}).on("locationfound", (e: any)=> {
      this.newMarker = circleMarker([e.latitude,e.longitude]).addTo(this.map);
      this.newMarker.bindPopup("You are located here!").openPopup();
      this.lon = e.longitude;
      this.lat = e.latitude;

      this.newMarker.on("dragend", ()=> {
        const position = this.newMarker.getLatLng();
       });
    });
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
            
        })

      
      /*
      const val = (service || {})

      this.pointedAddressOrg = val['display_name']
      const address = []

      const building = []
      if (val['address']['building']) {
        building.push(val['address']['building'])
      }
      if (val['address']['mall']) {
        building.push(val['address']['mall'])
      }
      if (val['address']['theatre']) {
        building.push(val['address']['theatre'])
      }

      const zip_city = []
      if (val['address']['postcode']) {
        zip_city.push(val['address']['postcode'])
      }
      if (val['address']['city']) {
        zip_city.push(val['address']['city'])
      }
      const street_number = []
      if (val['address']['street']) {
        street_number.push(val['address']['street'])
      }
      if (val['address']['road']) {
        street_number.push(val['address']['road'])
      }
      if (val['address']['footway']) {
        street_number.push(val['address']['footway'])
      }
      if (val['address']['pedestrian']) {
        street_number.push(val['address']['pedestrian'])
      }
      if (val['address']['house_number']) {
        street_number.push(val['address']['house_number'])
      }

      if (building.length) {
        address.push(building.join(' '))
      }
      if (zip_city.length) {
        address.push(zip_city.join(' '))
      }
      if (street_number.length) {
        address.push(street_number.join(' '))
      }

      this.pointedAddress = address.join(', ')*/

   
      
    

  }

}
