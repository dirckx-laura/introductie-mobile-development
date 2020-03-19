import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

const STORAGE_KEY = 'naam';
const STORAGE_KEY2 = 'handtekening';
const STORAGE_KEY3='locatie';
const STORAGE_KEY4='studentNr';
const STORAGE_KEY5='voornaam';
const STORAGE_KEY6='datum';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(public storage: Storage) { }
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
  getDatums() {
    return this.storage.get(STORAGE_KEY6);
  }
  getHandtekeningen() {
    return this.storage.get(STORAGE_KEY2);
  }
}
