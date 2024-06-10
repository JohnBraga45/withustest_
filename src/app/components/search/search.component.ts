import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { GeolocationService } from '../../services/geolocation.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  cityName: string | undefined;
  searchResults: any[] = [];

  constructor(
    private geolocationService: GeolocationService,
    private router: Router
  ) {}

  searchCities() {
    if (this.cityName) {
      this.geolocationService.searchCities(this.cityName).subscribe(
        (data) => {
          this.searchResults = data.data;
        },
        (error) => {
          console.error('Error searching cities:', error);
        }
      );
    }
  }

  viewCityDetails(cityId: string) {
    this.router.navigate(['/city-details', cityId]);
  }

  viewWeatherDetails(cityId: string) {
    this.router.navigate(['/weather-details', cityId]);
  }
}
