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
      "<th>Naam</th>" +
      "<th>Handtekening</th>" +
      "</tr>";
    this.favoriteService.getNamen().then(result => {
      result.forEach(test => {
        this.favoriteService.getHandtekeningen().then(res => {
          res.forEach(link => {
            if (res.indexOf(link) == result.indexOf(test)) {
              var img = document.createElement("img");
              img.src = res[result.indexOf(test)];

              var tussenstap = document.getElementById("tableTest");
              tussenstap.innerHTML += `<td>${test}</td><td><img src="${img.src}" width="250px" height="75px"/></td>`;

              this.teller++;
              document.getElementById("count").innerHTML = this.teller.toString();
              console.log(img);

            }
          })
          this.teller = 0;
        })
      })

    });

  }

}
