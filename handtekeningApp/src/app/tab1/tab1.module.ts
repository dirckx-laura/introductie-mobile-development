import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import {IonicStorageModule} from '@ionic/storage';
import { SignaturePadModule } from '@ng-plus/signature-pad';


import {NgxQRCodeModule} from 'ngx-qrcode2'; 
@NgModule({
  imports: [
   
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    IonicStorageModule.forRoot(),
    SignaturePadModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }]),  NgxQRCodeModule ,
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
