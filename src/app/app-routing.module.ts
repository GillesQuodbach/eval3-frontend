import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelsComponent } from './components/hotels/hotels.component';
import { HotelDetailsComponent } from './components/hotel-details/hotel-details.component';
import { NewHotelComponent } from './components/new-hotel/new-hotel.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SupervisorGuard } from './guards/supervisor.guard';

const routes: Routes = [
  { path: 'hotels', component: HotelsComponent },
  { path: 'hotel-details/:id', component: HotelDetailsComponent },
  {
    path: 'new-hotel',
    component: NewHotelComponent,
    canActivate: [SupervisorGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'hotels', pathMatch: 'full' },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
