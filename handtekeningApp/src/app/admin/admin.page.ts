import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(public router : Router) { }

  

  ngOnInit() {
  }

  goBack(){
    this.router.navigateByUrl('/tabs/tab3');
  }

}
