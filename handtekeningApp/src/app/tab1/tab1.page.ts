import { Component } from '@angular/core';
import { FavoriteService } from '../service/favorite.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(public favoriteService: FavoriteService, public fb: FormBuilder, private sanitizer: DomSanitizer) {
  }

  naam: String;
  naamForm = this.fb.group({
    voornaam: ['', Validators.required],
    achternaam: ['', Validators.required],
  })
  points = [];
  signatureImage;
  imgurl;
  setNaam() {
    // this.naam=document.getElementById('voornaam').innerText;
    // this.naam+=document.getElementById('naam').innerText;
    // document.getElementById('voornaam').innerText="";
    // document.getElementById('naam').innerText=""
    // this.favoriteService.storage.clear();
    this.naam = this.naamForm.value.voornaam + " " + this.naamForm.value.achternaam;
    this.naamForm.value.voornaam = "";
    this.naamForm.value.achternaam = "";
    this.naamForm.reset("");
    this.favoriteService.setNaam(this.naam);


  }

  saveImage(data) {
    this.signatureImage = data;
    // var tussenimgurl=URL.createObjectURL(new Blob([data],{ type: "image/jpeg" }));
    this.favoriteService.setHandtekening(data);

    console.log(data);
  }
  // laat alle namen en handtekeningen naast elkaar zien
  getAllNamen() {
    this.favoriteService.getNamen().then(result => {
      result.forEach(test=>{
        this.favoriteService.getHandtekeningen().then(res=>{
          res.forEach(link=>{
            if(res.indexOf(link)==result.indexOf(test)){
              var img = document.createElement("img");
              img.src = res[result.indexOf(test)];
    
              var tussenstap=document.getElementById("demo");
              tussenstap.appendChild(img);
              document.getElementById("demo").innerHTML+=test;
              console.log(img);
            }
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

  }






}
