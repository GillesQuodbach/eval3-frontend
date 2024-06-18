import { Component, Input, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/hotel.model';
import { environment } from 'src/environments/environment';
import { faStar, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() hotel: Hotel | undefined;
  faStar = faStar;
  faLocationArrow = faLocationArrow;

  imgUrl: string = '';

  constructor() {}

  ngOnInit(): void {
    if (this.hotel) {
      this.imgUrl = environment.host + '/images/' + this.hotel.id;
    }
  }
}
