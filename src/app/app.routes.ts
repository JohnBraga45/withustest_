import { Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { CityDetailsComponent } from './components/city-details/city-details.component';
import { WeatherDetailsComponent } from './components/weather-details/weather-details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: 'search', component: SearchComponent },
  { path: 'city-details/:cityId', component: CityDetailsComponent },
  { path: 'weather-details/:cityId', component: WeatherDetailsComponent }
];
