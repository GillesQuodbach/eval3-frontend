import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  faArrowLeft,
  faStar,
  faLocationArrow,
  faPhone,
  faBed,
} from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticateService } from 'src/app/services/authenticate.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  user: User | undefined;
  connected: boolean = false;
  faArrowLeft = faArrowLeft;
  error: string | undefined;
  constructor(
    private router: Router,
    private apiService: ApiService,
    public authService: AuthenticateService,
    private formBuilder: FormBuilder
  ) {
    this.user = this.authService.getUser();
    this.connected = this.authService.isConnectedToken();
    this.myForm = this.formBuilder.group({
      username: [this.user.username],
      password: [this.user.password],
    });
  }

  ngOnInit(): void {
    this.user = new User('', '', []);
  }
  goHome() {
    this.router.navigateByUrl('hotels');
  }

  onLogin(myForm: FormGroup) {
    this.apiService
      .getToken(myForm.value.username, myForm.value.password)
      .subscribe({
        next: (response) => {
          const token = response.headers.get('Authorization');
          if (token) {
            this.authService.setToken(token);
            this.router.navigateByUrl('hotels');
            this.connected = true;
          } else {
            console.error('Token non trouvé dans les en-têtes de la réponse.');
          }
        },
        error: (err) => {
          this.error = 'Email ou mot de passe incorrect';
        },
      });
    console.log('onLogin', myForm);
  }

  disconnect() {
    this.authService.disconnectedToken();
    this.connected = false;
    this.router.navigateByUrl('hotels');
  }
}
