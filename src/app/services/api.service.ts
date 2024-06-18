import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { City } from '../models/city.model';
import { Hotel } from '../models/hotel.model';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public getHotels() {
    return this.http.get<Hotel[]>(environment.host + '/hotels');
  }

  public getCities() {
    return this.http.get<City[]>(environment.host + '/cities');
  }

  public getHotelsByCity(id: number) {
    return this.http.get<Hotel[]>(environment.host + '/hotels/city/' + id);
  }
}
