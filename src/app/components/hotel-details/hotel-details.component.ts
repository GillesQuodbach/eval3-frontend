import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  faArrowLeft,
  faStar,
  faLocationArrow,
  faPhone,
  faBed,
} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Hotel } from 'src/app/models/hotel.model';
import { City } from 'src/app/models/city.model';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css'],
})
export class HotelDetailsComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faStar = faStar;
  faLocationArrow = faLocationArrow;
  faPhone = faPhone;
  faBed = faBed;
  isAdmin: boolean;
  isFormValid: boolean = false;
  myForm: FormGroup;
  hotel: Hotel;
  imgUrl: string;
  imgEnv: string = '';
  cities: City[];
  selectedFile: File | null = null;
  selectedFileName: string = '';
  error: string = '';
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) {
    const defaultCity = new City(0, '');
    this.hotel = new Hotel(0, 'test', '', 0, 0, 0, '', defaultCity);
    this.cities = [];
    this.hotel.city = defaultCity;
    this.imgEnv = environment.host;
    this.isAdmin = false;

    this.myForm = this.formBuilder.group({
      name: [this.hotel.name],
      city: [this.hotel.city],
      disponibility: [this.hotel.disponibility],
      stars: [this.hotel.stars],
      price: [this.hotel.price],
      phone: [this.hotel.price],
    });
    this.imgUrl = 'assets/default.jpg';
  }

  ngOnInit(): void {
    this.apiService.getCities().subscribe({
      next: (data) => {
        this.cities = data;
      },
      error: (err) => (this.error = err),
    });

    let hotelId = this.route.snapshot.params['id'];
    if (hotelId != 0) {
      this.apiService.getHotel(hotelId).subscribe({
        next: (data) => {
          this.hotel = data;
          this.imgUrl = this.hotel.img
            ? `${this.imgEnv}/images/${this.hotel.id}`
            : 'assets/default.jpg';
          console.log(this.imgUrl);
          this.myForm.setValue({
            name: this.hotel.name,
            city: this.hotel.city,
            disponibility: this.hotel.disponibility,
            stars: this.hotel.stars,
            price: this.hotel.price,
            phone: this.hotel.phone,
          });

          console.log(this.imgUrl);
        },
      });
    } else {
      this.imgUrl = 'http://localhost:8080/images/default.jpg';
    }
  }

  updateHotel(form: FormGroup) {
    let hotelId = this.route.snapshot.params['id'];
    if (form.valid) {
      if (this.selectedFile == null) {
        this.apiService
          .postHotel({
            id: hotelId,
            name: form.value.name,
            city: form.value.city,
            disponibility: form.value.disponibility,
            stars: form.value.stars,
            price: form.value.price,
            phone: form.value.phone,
            img: this.imgUrl,
          })
          .subscribe({
            next: (data) => {
              console.log('formData', data);
              // this.refreshImageUrl();
            },
            error: (err) => (this.error = err.message),
            complete: () => this.router.navigateByUrl('hotels'),
          });
      } else {
        this.updateHotelWithImg(form);
      }
    } else {
      this.error = 'Veuillez saisir tous les champs';
    }
  }

  updateHotelWithImg(form: FormGroup) {
    const formData = new FormData();
    let hotelId = this.route.snapshot.params['id'];
    console.log('hotel id = ' + hotelId);
    formData.append('file', this.selectedFile as File, this.selectedFile?.name);
    console.log(this.selectedFile);
    this.apiService
      .updateHotelImage(formData, hotelId)
      .subscribe((response) => {
        const updatedImageUrl = this.selectedFile?.name;
        console.log('updatedImageUrl ', updatedImageUrl);
        console.log(response);
        this.apiService
          .postHotel({
            id: hotelId,
            name: form.value.name,
            city: form.value.city,
            disponibility: form.value.disponibility,
            stars: form.value.stars,
            price: form.value.price,
            phone: form.value.phone,
            img: updatedImageUrl,
          })
          .subscribe({
            next: (data) => {
              console.log(data);
            },
            error: (err) => (this.error = err.message),
            complete: () => this.router.navigateByUrl('hotels'),
          });
      });
  }

  goHome() {
    this.router.navigateByUrl('hotels');
  }

  onSubmit(form: FormGroup) {
    console.log(form.value);
    this.updateHotel(form);
  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    this.selectedFile = event.target.files[0] as File;
    if (input.files) {
      this.selectedFileName = input.files[0].name;
    }
  }
}
