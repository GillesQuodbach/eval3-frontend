import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { City } from '../models/city.model';
import { Hotel } from '../models/hotel.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public getHotels() {
    return this.http.get<Hotel[]>(`${environment.host}/hotels`);
  }

  public getHotel(id: number) {
    return this.http.get<Hotel>(`${environment.host}/hotel/${id}`);
  }

  public postHotel(hotel: any) {
    return this.http.post<Hotel>(`${environment.host}/hotels`, hotel);
  }

  public deleteHotel(hotel: Hotel) {
    return this.http.delete(`${environment.host}/hotels/${hotel.id}`);
  }

  public getCities() {
    return this.http.get<City[]>(`${environment.host}/cities`);
  }

  public getHotelsByCity(id: number) {
    return this.http.get<Hotel[]>(`${environment.host}/hotels/city/${id}`);
  }

  public postHotelImage(formData: FormData) {
    return this.http.post<any>(`${environment.host}/images`, formData);
  }

  public updateHotelImage(formData: FormData, hotelId: number) {
    return this.http.post<any>(
      `${environment.host}/images/${hotelId}`,
      formData
    );
  }
}
