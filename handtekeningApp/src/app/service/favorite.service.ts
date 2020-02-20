import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

const STORAGE_KEY = 'naam';
const STORAGE_KEY2 = 'handtekening';

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
  getNaam() {
    this.storage.get(STORAGE_KEY);
  }
  getNamen() {
    return this.storage.get(STORAGE_KEY);
  }
  getHandtekeningen() {
    return this.storage.get(STORAGE_KEY2)
  }
}
