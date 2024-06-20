import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  faArrowLeft,
  faStar,
  faLocationArrow,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Hotel } from 'src/app/models/hotel.model';
import { City } from 'src/app/models/city.model';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-hotel',
  templateUrl: './new-hotel.component.html',
  styleUrls: ['./new-hotel.component.css'],
})
export class NewHotelComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faStar = faStar;
  faLocationArrow = faLocationArrow;
  faPhone = faPhone;
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
    this.isAdmin = true;

    this.myForm = this.formBuilder.group({
      name: [this.hotel.name],
      city: [this.hotel.city],
      disponibility: [this.hotel.disponibility],
      stars: [this.hotel.stars],
      price: [this.hotel.price],
      phone: [this.hotel.phone],
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

    this.myForm.setValue({
      name: '',
      city: '',
      disponibility: '',
      stars: 0,
      price: 0,
      phone: '',
    });
    this.imgUrl = 'assets/default.jpg';
  }

  onAddHotel(form: FormGroup) {
    let hotelId = 0;

    if (form.valid) {
      let selectedCityId = +form.value.city;
      console.log(selectedCityId);
      const selectedCity = this.cities.find(
        (city) => city.id === selectedCityId
      );

      if (this.selectedFile == null) {
        this.apiService
          .postHotel({
            id: hotelId,
            name: form.value.name,
            city: selectedCity,
            disponibility: form.value.disponibility,
            stars: form.value.stars,
            price: form.value.price,
            phone: form.value.phone,
            img: 'default.jpg',
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
        console.log(form);
        const formData = new FormData();
        formData.append(
          'file',
          this.selectedFile as File,
          this.selectedFile?.name
        );
        this.apiService
          .postHotel({
            id: hotelId,
            name: form.value.name,
            city: selectedCity,
            disponibility: form.value.disponibility,
            stars: form.value.stars,
            price: form.value.price,
            phone: form.value.phone,
            img: this.selectedFileName,
          })
          .subscribe({
            next: (data) => {
              console.log('formData', data);
              // this.refreshImageUrl();
            },
            error: (err) => (this.error = err.message),
            complete: () => this.router.navigateByUrl('hotels'),
          });
      }
    } else {
      this.error = 'Veuillez saisir tous les champs';
    }
  }

  goHome() {
    this.router.navigateByUrl('hotels');
  }

  onSubmit(form: FormGroup) {
    this.onAddHotel(form);
    console.log('sended form', form);
  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files ? input.files[0] : null;
    this.selectedFileName = this.selectedFile ? this.selectedFile.name : '';
  }
}
