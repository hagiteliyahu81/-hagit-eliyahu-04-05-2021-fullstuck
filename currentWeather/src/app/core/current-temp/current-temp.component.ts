import { Component, OnInit,Input } from '@angular/core';
import { City } from '../model/city';
import { Temperature } from '../model/temperature';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-current-temp',
  templateUrl: './current-temp.component.html',
  styleUrls: ['./current-temp.component.scss']
})
export class CurrentTempComponent implements OnInit {

  city : City;
  iconUrl:string;
  @Input() set selectedCity(c: City) {
    this.city = c;
    this.getTemp();
    this.dataSrv.CitiesList.subscribe(result => {
        this.isFavorite = result.cities.indexOf(this.city)>-1;
    });
  }
  temprature: Temperature;
  isFavorite=false;

  
  constructor(private dataSrv:DataService) { 
    
  }

  ngOnInit(): void {
   
  }
  
  getTemp()
  {
    this.dataSrv.GetTemperatureByCity(this.city.Id).subscribe(res=>{
      this.temprature= res;
    this.iconUrl='https://developer.accuweather.com/sites/default/files/'+this.pad(res.WeatherIcon.toString(),2)+'-s.png';
    })
  }

  addToFavorite(){
    this.dataSrv.addToFavorite(this.city);
    this.isFavorite = true;
  }

  removeFromFavorite(){
    this.dataSrv.removeFromFavorites(this.city);
    this.isFavorite = false;
  }

  private pad(num:string, size:number) {
    while (num.length < size) num = "0" + num;
    return num;
}
}
