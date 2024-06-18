import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/models/city.model';
import { Hotel } from 'src/app/models/hotel.model';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css'],
})
export class HotelsComponent implements OnInit {
  hotelsList: Hotel[] | undefined;
  citiesList: City[] | undefined;
  error = null;
  imgUrl: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getAllHotels();
    this.getAllCities();
  }

  getAllHotels() {
    this.apiService.getHotels().subscribe({
      next: (data) => {
        this.hotelsList = data;
        console.log(data);
      },
      error: (err) => {
        this.error = err.message;
      },
      complete: () => {
        this.error = null;
      },
    });
  }

  getAllCities() {
    this.apiService.getCities().subscribe({
      next: (data) => {
        this.citiesList = data;
        console.log(data);
      },
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
  }
}
