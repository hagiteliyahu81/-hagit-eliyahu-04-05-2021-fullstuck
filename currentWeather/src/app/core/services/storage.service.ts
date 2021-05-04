import { Injectable } from '@angular/core';
import { StorageModel } from '../model/storage';




export enum StorageType { sessionStorage, localStorage }

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getStorage(key: string, storageType: StorageType) {
    
    let storageString: string;
    switch (storageType) {
      case StorageType.localStorage:
        storageString = localStorage.getItem(key);
        break;
      case StorageType.sessionStorage:
        storageString = sessionStorage.getItem(key);
        break;
    }

    const currDate = new Date();
    if (storageString) {
      const storageModel: StorageModel = JSON.parse(storageString);
      const expDate = new Date(storageModel.expTime);
      if (!storageModel.expTime || expDate > currDate) {
        return storageModel.data;
      } else {

        this.deleteStorage(key, storageType);
      }
    }
    return null;
  }

  setStorage(key: string, obj: any, storageType: StorageType, expTime: number = 120, noExp: boolean = false) {
   
    if (key && obj) {
      let expDateTmp: Date;
      if (noExp) {
        expDateTmp = null;
      } else {
        if (!expTime) {
          expTime = 120;
        }
        expDateTmp = new Date(new Date().getTime() + expTime * 60000);
      }
      const storageModel: StorageModel = { data: obj, expTime: expDateTmp };

      switch (storageType) {
        case StorageType.localStorage:
          localStorage.setItem(key, JSON.stringify(storageModel));
          break;
        case StorageType.sessionStorage:
          sessionStorage.setItem(key, JSON.stringify(storageModel));
          break;
      }
    }
  }

  deleteStorage(key: string, storageType: StorageType) {
   
    switch (storageType) {
      case StorageType.localStorage:
        localStorage.removeItem(key);
        break;
      case StorageType.sessionStorage:
        sessionStorage.removeItem(key);
        break;
    }
  }
}
