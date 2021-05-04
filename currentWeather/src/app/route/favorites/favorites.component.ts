import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/core/model/city';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  cities:City[];
  selectedCity:City;
  
  constructor(private dataSrv:DataService) { }

  ngOnInit(): void {
    this.dataSrv.CitiesList.subscribe(result => {
      this.cities = result.cities;
    });
  }

  getTemp(city:City): void {
    this.selectedCity=city;
  }

}
