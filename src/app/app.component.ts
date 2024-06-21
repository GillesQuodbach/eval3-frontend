import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from './services/authenticate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isAdmin: boolean = false;
  constructor(
    private router: Router,
    private authService: AuthenticateService
  ) {}

  ngOnInit(): void {
    this.authService.authStatus$.subscribe((isAuthenticated) => {
      this.isAdmin = isAuthenticated && this.authService.isAdminToken();
    });
  }

  addNewHotel() {
    this.router.navigateByUrl('new-hotel');
  }

  login() {
    this.router.navigateByUrl('login');
  }
}
