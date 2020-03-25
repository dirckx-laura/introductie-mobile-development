import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoriteService } from '../service/favorite.service';
import { NavController } from '@ionic/angular';
import { Map, tileLayer, marker, icon } from 'leaflet';
//import {Tab1Page} from 'Tab1Page';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  

  constructor(public router: Router, public favoriteService: FavoriteService, public NavCtrl: NavController) { }
  qrData = "Test";
  scannedCode = null;
  teller: number = 0;
  myValue: boolean;
  toggleState: boolean;
  
  
 
  // Hier bekijken we of het gebruik van de QR code actief staat of niet
  QrEnable() {
    if (this.myValue) {
      console.log(this.myValue);
      this.toggleState = true;
      this.favoriteService.ShowCode = true;
    }
    else {
      console.log("false")
      this.toggleState = false;
      this.favoriteService.ShowCode = false;
    }

  }


  ngOnInit() {
  }


  goBack() {
    this.router.navigateByUrl('/tabs/tab3');
  }


  getAllNamen() {

   
    document.getElementById("tableTest").innerHTML = "<tr>" +
      "<th>Student Info</th>" +
      "<th>Handtekening</th>" +
      "<th>Datum</th>" +
      "<th>Adress</th>" +
      "</tr>";
      this.favoriteService.getStudenten().then(studenten=>{
        studenten.forEach(student=>{
          console.log("index"+ studenten.indexOf(student));
          this.favoriteService.getHandtekeningen().then(handtekeningen=>{
            handtekeningen.forEach(handtekening=>{
              this.favoriteService.getDatums().then(datums=>{
                datums.forEach(datum=>{
                  this.favoriteService.getLocatieOfBarcode().then(lOfBs=>{
                    lOfBs.forEach(lOfB=>{
                      if(studenten.indexOf(student)==handtekeningen.indexOf(handtekening)
                      && studenten.indexOf(student)==datums.indexOf(datum)
                      && studenten.indexOf(student)==lOfBs.indexOf(lOfB)){
                        var img = document.createElement("img");
                        img.src = handtekeningen[studenten.indexOf(student)];
                        console.log(student);
                        var tussenstap = document.getElementById("tableTest");
                        tussenstap.innerHTML += `<td>${student}</td><td><img src="${img.src}" width="250px" height="75px"/></td><td>${datum}</td><td>${lOfB.address.road} ${lOfB.address.hamlet}</td>`;
                      }
                    })
                  })
                })
              })
            })
          })
        })
      })
 

  }

}
