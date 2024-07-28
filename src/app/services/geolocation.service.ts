import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  private apiUrl = 'https://wft-geo-db.p.rapidapi.com/v1/geo/';

  constructor(private http: HttpClient) { }

  searchCities(namePrefix: string): Observable<any> {
    return this.http.get(`${this.apiUrl}cities?namePrefix=${namePrefix}`, {
      headers: {
        'X-RapidAPI-Key': environment.geoDbApiKey,
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
      }
    });
  }

  getCityDetails(cityId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}cities/${cityId}`, {
      headers: {
        'X-RapidAPI-Key': environment.geoDbApiKey,
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
      }
    });
  }
}
