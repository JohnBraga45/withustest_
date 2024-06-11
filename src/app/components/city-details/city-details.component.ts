import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GeolocationService } from '../../services/geolocation.service';

import { fas } from '@fortawesome/free-solid-svg-icons'; // Importa todos os ícones sólidos
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-city-details',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './city-details.component.html',
  styleUrls: ['./city-details.component.css'],
})
export class CityDetailsComponent implements OnInit {
  cityId: string | null | undefined;
  cityDetails: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private geolocationService: GeolocationService,
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
    this.geolocationService.getCityDetails(this.cityId!).subscribe(
      (data) => {
        this.cityDetails = data;
      },
      (error) => {
        console.error('Error fetching city details:', error);
      }
    );
  }

  navigateToWeatherDetails() {
    if (this.cityId) {
      this.router.navigate(['/weather-details', this.cityId]);
    }
  }

  navigateToHome() {
    this.router.navigate(['/search']);
  }
}
