import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherService } from '../../services/weather.service';
import { GeolocationService } from '../../services/geolocation.service';
import { fas } from '@fortawesome/free-solid-svg-icons';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-weather-details',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css'],
})
export class WeatherDetailsComponent implements OnInit {
  cityId: string | null = null;
  cityName: string | null = null;
  weatherDetails: any;
  selectedUnit: string = 'C';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private geoService: GeolocationService,
    private weatherService: WeatherService,
    private cdr: ChangeDetectorRef,
    library: FaIconLibrary
  ) {
    library.addIconPacks(fas);
  }

  ngOnInit() {
    this.cityId = this.route.snapshot.paramMap.get('cityId');
    if (this.cityId) {
      this.getCityDetails();
    }
  }

  getCityDetails() {
    this.geoService.getCityDetails(this.cityId!).subscribe(
      (data) => {
         if (data) {
          const cityData = data.data;
          if (cityData) {
            this.cityName = cityData.city || cityData.name || cityData.cityName;

            this.getWeatherDetails();
          } else {
            console.error('City data is not in the expected format.');
          }
        } else {
          console.error('City details are not in the expected format.');
        }
      },
      (error) => {
        console.error('Error fetching city details:', error);
      }
    );
  }

  getWeatherDetails() {
    if (this.cityName) {
      this.weatherService
        .getForecastByCity(this.cityName, 3, this.selectedUnit)
        .subscribe(
          (data) => {
            this.weatherDetails = data;
            this.cdr.detectChanges();
          },
          (error) => {
            console.error('Error fetching weather details:', error);
          }
        );
    }
  }

  navigateToCityDetails() {
    if (this.cityId) {
      this.router.navigate(['/city-details', this.cityId]);
    }
  }
  navigateToHome() {
    this.router.navigate(['/search']);
  }
}
