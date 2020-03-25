import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

const STORAGE_KEY = 'naam';
const STORAGE_KEY2 = 'handtekening';
const STORAGE_KEY3='locatie';
const STORAGE_KEY4='studentNr';
const STORAGE_KEY5='voornaam';
const STORAGE_KEY6='datum';
const STORAGE_KEY7='barcode';
const STORAGE_KEY8='studentInfo';


@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(public storage: Storage) { }

  ShowCode: boolean;
 
  


  
  setStudentInfo(sInfo) {
    return this.getStudenten().then(result => {
      if (result) {
        result.push(sInfo);
        return this.storage.set(STORAGE_KEY8, result);
      }
      else {
        return this.storage.set(STORAGE_KEY8, [sInfo])
      }
    })
  }
  setDatum(datum) {
    return this.getDatums().then(result => {
      if (result) {
        result.push(datum);
        return this.storage.set(STORAGE_KEY6, result);
      }
      else {
        return this.storage.set(STORAGE_KEY6, [datum])
      }
    })
  }
 
  setHandtekening(handtekening) {
    return this.getHandtekeningen().then(res => {
      if (res) {
        res.push(handtekening);
        return this.storage.set(STORAGE_KEY2, res);
      }
      else {
        return this.storage.set(STORAGE_KEY2,[handtekening])
      }

    })
  }
  setLocatieOfBarcode(locatieOfBarcode){
    return this.getLocatieOfBarcode().then(res => {
      if (res) {
        res.push(locatieOfBarcode);
        return this.storage.set(STORAGE_KEY3, res);
      }
      else {
        return this.storage.set(STORAGE_KEY3,[locatieOfBarcode])
      }

    })
  }
  
  getLocatieOfBarcode(){
    return this.storage.get(STORAGE_KEY3);
  }
  
  getStudenten(){
    return this.storage.get(STORAGE_KEY8);
  }
  getDatums() {
    return this.storage.get(STORAGE_KEY6);
  }
  getHandtekeningen() {
    return this.storage.get(STORAGE_KEY2);
  }
  
}
