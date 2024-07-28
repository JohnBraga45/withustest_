import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  private apiUrl = 'https://wft-geo-db.p.rapidapi.com/v1/geo/';
  private cityDetailsCache: { [key: string]: Observable<any> } = {}; // Estrutura de cache para city details
  private searchCitiesCache: { [key: string]: Observable<any> } = {}; // Estrutura de cache para search cities

  constructor(private http: HttpClient) { }

  searchCities(namePrefix: string): Observable<any> {
    if (this.searchCitiesCache[namePrefix]) {
      console.log(`Returning cached results for city search: ${namePrefix}`);
      return this.searchCitiesCache[namePrefix];
    }

    const url = `${this.apiUrl}cities?namePrefix=${namePrefix}`;
    const headers = {
      'X-RapidAPI-Key': environment.geoDbApiKey,
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    };

    this.searchCitiesCache[namePrefix] = this.http.get<any>(url, { headers }).pipe(
      shareReplay(1), // Compartilha a última emissão com novas assinaturas
      catchError((error) => {
        delete this.searchCitiesCache[namePrefix]; // Remove do cache em caso de erro
        return throwError(error);
      })
    );

    console.log(`Fetching results from API for city search: ${namePrefix}`);
    return this.searchCitiesCache[namePrefix];
  }

  getCityDetails(cityId: string): Observable<any> {
    if (this.cityDetailsCache[cityId]) {
      console.log(`Returning cached details for city ID: ${cityId}`);
      return this.cityDetailsCache[cityId];
    }

    const url = `${this.apiUrl}cities/${cityId}`;
    const headers = {
      'X-RapidAPI-Key': environment.geoDbApiKey,
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    };

    this.cityDetailsCache[cityId] = this.http.get<any>(url, { headers }).pipe(
      shareReplay(1), // Compartilha a última emissão com novas assinaturas
      catchError((error) => {
        delete this.cityDetailsCache[cityId]; // Remove do cache em caso de erro
        return throwError(error);
      })
    );

    console.log(`Fetching details from API for city ID: ${cityId}`);
    return this.cityDetailsCache[cityId];
  }
}
