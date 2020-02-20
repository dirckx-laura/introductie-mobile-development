import { Component } from '@angular/core';
import { Router } from '@angular/router';


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
  


  constructor(private router: Router) {}

    

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
        alert("U bent succesvol ingelogd!");
        this.router.navigateByUrl('/admin');
      }
        else if(this.pass.length == 0){
          alert("Het heeft echt een wachtwoord hoor...");
        }
      else {
          alert("Fout wachtwoord!");
          
      }
     
    }

}
