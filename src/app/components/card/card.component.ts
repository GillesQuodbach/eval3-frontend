import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Hotel } from 'src/app/models/hotel.model';
import { environment } from 'src/environments/environment';
import {
  faStar,
  faLocationArrow,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() hotel: Hotel | undefined;
  @Output() hotelDeleted = new EventEmitter<void>();

  faStar = faStar;
  faLocationArrow = faLocationArrow;
  faTrash = faTrash;
  error = null;
  imgUrl: string = '';

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    if (this.hotel) {
      this.imgUrl = environment.host + '/images/' + this.hotel.id;
    }
  }

  hotelDetails(hotel: Hotel) {
    this.router.navigateByUrl('hotel-details/' + hotel.id);
    console.log('hotelDetails');
  }

  deleteHotel(hotel: Hotel, event: Event) {
    event.stopPropagation();
    this.apiService.deleteHotel(hotel).subscribe({
      next: (data) => {
        console.log(data);
        this.hotelDeleted.emit();
      },
      error: (err) => (this.error = err.message),
      complete: () => this.getAllHotels(),
    });
  }

  getAllHotels() {
    this.apiService.getHotels().subscribe({
      next: (data) => {
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
}
