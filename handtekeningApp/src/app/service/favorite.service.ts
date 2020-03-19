import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

const STORAGE_KEY = 'naam';
const STORAGE_KEY2 = 'handtekening';
const STORAGE_KEY3='locatie';
const STORAGE_KEY4='studentNr';
const STORAGE_KEY5='voornaam';



@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(public storage: Storage) { }

  ShowCode: boolean;
 
  


  setNaam(naam) {
    return this.getNamen().then(result => {
      if (result) {
        result.push(naam);
        return this.storage.set(STORAGE_KEY, result);
      }
      else {
        return this.storage.set(STORAGE_KEY, [naam])
      }
    })
  }
  setVoorNaam(voorNaam) {
    return this.getVoorNamen().then(result => {
      if (result) {
        result.push(voorNaam);
        return this.storage.set(STORAGE_KEY5, result);
      }
      else {
        return this.storage.set(STORAGE_KEY5, [voorNaam])
      }
    })
  }
  setStudentNr(sNr) {
    return this.getSnummers().then(result => {
      if (result) {
        result.push(sNr);
        return this.storage.set(STORAGE_KEY4, result);
      }
      else {
        return this.storage.set(STORAGE_KEY4, [sNr])
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
  setLocatie(locatie){
    return this.getLocatie().then(res => {
      if (res) {
        res.push(locatie);
        return this.storage.set(STORAGE_KEY3, res);
      }
      else {
        return this.storage.set(STORAGE_KEY3,[locatie])
      }

    })
  }
  getLocatie(){
    return this.storage.get(STORAGE_KEY3);
  }
  getNamen() {
    return this.storage.get(STORAGE_KEY);
  }
  getVoorNamen() {
    return this.storage.get(STORAGE_KEY5);
  }
  getSnummers() {
    return this.storage.get(STORAGE_KEY4);
  }
  getHandtekening(id){
    return this.storage.get(STORAGE_KEY2).then(result=>{
      if(result){
        result.forEach(handtekening => {
          if(handtekening.index){

          }
        });
      }
    })
  }
  getHandtekeningen() {
    return this.storage.get(STORAGE_KEY2);
  }
}
