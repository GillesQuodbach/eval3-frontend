import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelsComponent } from './components/hotels/hotels.component';
import { HotelDetailsComponent } from './components/hotel-details/hotel-details.component';
import { NewHotelComponent } from './components/new-hotel/new-hotel.component';

const routes: Routes = [
  { path: 'hotels', component: HotelsComponent },
  { path: 'hotel-details/:id', component: HotelDetailsComponent },
  { path: 'new-hotel', component: NewHotelComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
