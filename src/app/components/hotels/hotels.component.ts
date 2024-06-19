import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/models/city.model';
import { Hotel } from 'src/app/models/hotel.model';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css'],
})
export class HotelsComponent implements OnInit {
  hotelsList: Hotel[] | undefined;
  citiesList: City[] | undefined;
  filteredHotelsList: Hotel[] | undefined;
  selectedCityId: number | undefined;
  selectedCityName: string = '';
  error = null;
  imgUrl: string = '';

  constructor(
    private apiService: ApiService,
    private cityService: CityService
  ) {}

  ngOnInit(): void {
    this.getAllHotels();
    this.getAllCities();

    this.selectedCityId = this.cityService.getSelectedCityId();
    this.selectedCityName = this.cityService.getSelectedCityName();
    if (this.selectedCityId == 0) {
      this.getAllHotels();
    } else {
      this.displayHotelsByCity(this.selectedCityId, this.selectedCityName);
    }
  }

  getAllHotels() {
    this.apiService.getHotels().subscribe({
      next: (data) => {
        this.hotelsList = data;
        this.filteredHotelsList = data;
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

  displayHotelsByCity(id: number, name: string) {
    this.apiService.getHotelsByCity(id).subscribe({
      next: (data) => {
        this.hotelsList = data;
        this.filteredHotelsList = data;
      },
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
    this.cityService.setSelectedCityId(id);
    this.cityService.setSelectedCityName(name);
    this.selectedCityName = name;
  }

  onSearch(event: any) {
    const searchWord = event.target.value.toLowerCase();
    if (this.hotelsList) {
      this.filteredHotelsList = this.hotelsList.filter((hotel) => {
        return hotel.name.toLowerCase().includes(searchWord);
      });
    }
    console.log(searchWord);
  }

  refreshHotels() {
    this.getAllHotels();
  }
}
