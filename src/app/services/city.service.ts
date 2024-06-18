import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private selectedCityId: number;
  private selectedCityName: string;

  constructor() {
    this.selectedCityId = 0;
    this.selectedCityName = 'Toutes';
  }

  getSelectedCityId(): number {
    return this.selectedCityId;
  }

  getSelectedCityName(): string {
    return this.selectedCityName;
  }

  setSelectedCityId(id: number) {
    this.selectedCityId = id;
  }

  setSelectedCityName(name: string) {
    this.selectedCityName = name;
  }

  clearSelectCityId() {
    this.selectedCityId = 0;
  }

  clearSelectedCityName() {
    this.selectedCityName = 'Toutes';
  }
}
