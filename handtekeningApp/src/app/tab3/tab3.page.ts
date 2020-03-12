import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  password:string = "Admin0000";
  pass:string = "";
  passwordShown:boolean = false;
  passwordType:string = "password";
  newPassword: string;
  key:string = 'password';
  
  

  constructor(public router: Router, public alertCtrl: AlertController, private storage: Storage) {}


  async shortPassAlert() {
    const alert = await this.alertCtrl.create({
    subHeader: 'ERR_S_PASS',
    message: 'Een wachtwoord moet uit minstens 5 characters bestaan',
    buttons: ['OK']
   });
   await alert.present(); 
  }

  async ChangedPassAlert() {
    const alert = await this.alertCtrl.create({
    subHeader: 'Succes',
    message: 'Het wachtwoord is gewijzigd!',
    buttons: ['OK']
   });
   await alert.present(); 
  }

  async failNoPassAlert() {
    const alert = await this.alertCtrl.create({
    subHeader: 'ERR_N_PASS',
    message: 'Het heeft echt een wachtwoord hoor...',
    buttons: ['OK']
   });
   await alert.present(); 
  }


  async failPassAlert() {
    const alert = await this.alertCtrl.create({
    subHeader: 'ERR_F_PASS',
    message: 'U bent niet ingelogd, fout wachtwoord.',
    buttons: ['OK']
   });
   await alert.present(); 
  }
  
  async presentAlert() {
    const alert = await this.alertCtrl.create({
    subHeader: 'Succes',
    message: 'U bent ingelogd!',
    buttons: ['OK']
   });
   await alert.present(); 
  }
    public togglePass(){
      if (this.passwordShown) {
        this.passwordShown = false;
        this.passwordType = "password"; 
      } else {
        this.passwordShown = true;
        this.passwordType = "text"; 
      }
    }
  
    public logIn() {
      console.log(this.pass);
      if (this.pass === this.password) {
        this.presentAlert();
        console.log("ingelogd");
        this.router.navigateByUrl('/admin');
      }
        else if(this.pass.length == 0){
          this.failNoPassAlert();
          console.log("Het heeft echt een wachtwoord hoor...");
        }
      else {
        this.failPassAlert();
          console.log("Fout wachtwoord!");
          
      }
     
    }
    
    saveData(){
      this.storage.set(this.key, this.password);
      this.loadData();
    }

    loadData(){
      this.storage.get(this.key).then((val) => {
        console.log('Your password is ', val);
      });
    }
    
    public changePass(){
      if (this.pass.length < 5) {
        this.shortPassAlert();
      } else {
        this.newPassword = this.password;
        this.newPassword = this.pass;
        this.password = this.newPassword;
        this.ChangedPassAlert();
      }
     
    }

}
