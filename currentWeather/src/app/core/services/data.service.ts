import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { City } from '../model/city';
import { HttpClient } from '@angular/common/http';
import { Temperature } from '../model/temperature';
import { StorageService, StorageType } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  CitiesList = new BehaviorSubject({
    cities: []
  });

  constructor(private http : HttpClient,
    private storagesrv : StorageService) {
    let cTmp = storagesrv.getStorage('Favorites',StorageType.localStorage);
    if (cTmp==null) cTmp=[];
    this.CitiesList.next({cities: cTmp});
   }

  
  
  GetAutoCompleteCities(search_txt: string): Observable<City[]>{
    const srvurl = environment.srvUrl + 'GetAutoCompleteCities' ;
    return this.http.post<City[]>(srvurl, {'search_txt':search_txt});
  }

  GetTemperatureByCity(city_id: number): Observable<Temperature>{
    const srvurl = environment.srvUrl + 'GetTemperatureByCity' ;
    return this.http.post<Temperature>(srvurl, {'city_id':city_id});
  }

  addToFavorite(city:City){
    if (this.CitiesList.value.cities.indexOf(city)===-1){
      let cTmp =this.CitiesList.value.cities;
      cTmp.push(city);
      this.storagesrv.setStorage('Favorites',cTmp,StorageType.localStorage,0,true);
      this.CitiesList.next({cities: cTmp});
    }
  }

  removeFromFavorites(city:City){
    if (this.CitiesList.value.cities.indexOf(city)>-1){
      let cTmp =this.CitiesList.value.cities;
      cTmp.splice(cTmp.findIndex(x => x.id === city.Id),1);
      this.storagesrv.setStorage('Favorites',cTmp,StorageType.localStorage,0,true);
      this.CitiesList.next({cities: cTmp});
    }
  }
}