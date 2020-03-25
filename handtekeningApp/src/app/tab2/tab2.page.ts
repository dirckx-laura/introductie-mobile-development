import { Component, Directive } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker, circleMarker } from 'leaflet';
import { Router } from '@angular/router';
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

  map: Map;
  newMarker: any;
  lon: any;
  lat: any;

  // reference naar de goReverseService API van openstreetmap
  geoReverseService = 'https://nominatim.openstreetmap.org/reverse?key=iTzWSiYpGxDvhATNtSrqx5gDcnMOkntL&format=json&addressdetails=1&lat={lat}&lon={lon}'


  constructor(private router: Router, public favoriteService: FavoriteService) { }

  // Toont map
  ionViewDidEnter() {
    this.loadMap();

  }

  // laad map
  loadMap() {
    this.map = new Map("mapId").setView([51.2194, 4.4025], 13);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>' })
      .addTo(this.map); // This line is added to add the Tile Layer to our map

      
    //hier word geïtereerd door de locaties en studenten, om deze dan elke een marker te geven met hun studentennummer, voornaam en achternaam bij
    this.favoriteService.getLocatieOfBarcode().then(res => {
      res.forEach(element => {
        this.favoriteService.getStudenten().then(studenten => {
          studenten.forEach(student => {
            //checken of dat de gevonden student dezelfde index heeft als de gevonden locatie, anders word elke mogelijke combinatie getoont
            if (studenten.indexOf(student) == res.indexOf(element)) {
              marker([element.lat, element.lon]).addTo(this.map)
                .bindPopup(student).openPopup()

            }

          })
        })

      });
    })

  }



}
