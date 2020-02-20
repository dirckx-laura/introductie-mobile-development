import { Component, Directive } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker, circleMarker } from 'leaflet';
import {Router} from '@angular/router';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {

  map:Map;
  newMarker:any;
  
  constructor(private router:Router) { }
  
  // The below function is added
  ionViewDidEnter(){
    this.loadMap();
  }

  
 // The below function is added
  loadMap(){this.map = new Map("mapId").setView([51.2194,4.4025], 13);
  tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    { attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'})
    .addTo(this.map); // This line is added to add the Tile Layer to our map
   
  }
  locatePosition(){
    this.map.locate({setView:true}).on("locationfound", (e: any)=> {
      this.newMarker = circleMarker([e.latitude,e.longitude]).addTo(this.map);
      this.newMarker.bindPopup("You are located here!").openPopup();
     
      this.newMarker.on("dragend", ()=> {
        const position = this.newMarker.getLatLng();
       });
    });
  }

}
