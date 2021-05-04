import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/core/model/city';
import { Temperature } from 'src/app/core/model/temperature';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  cities:City[];
  selectedCity:City;
  showResults=false;

  constructor(private dataSrv:DataService) { }

  ngOnInit(): void {
  }

  search(txt:string): void {
    this.dataSrv.GetAutoCompleteCities(txt).subscribe(res => {
      this.showResults=true;
      this.cities=res;
    });
  }

  getTemp(city:City): void {
    this.selectedCity=city;
  }

}
