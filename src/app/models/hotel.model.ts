import { City } from './city.model';

export class Hotel {
  id: number;
  name: string;
  phone: string;
  stars: number;
  disponibility: number;
  price: number;
  img: string;
  city: City;

  constructor(
    id: number,
    name: string,
    phone: string,
    stars: number,
    disponibility: number,
    price: number,
    img: string,
    city: City
  ) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.stars = stars;
    this.disponibility = disponibility;
    this.price = price;
    this.img = img;
    this.city = city;
  }
}
