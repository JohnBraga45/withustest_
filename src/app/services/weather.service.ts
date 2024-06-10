// weather.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { weatherTranslations } from '../components/weather-details/weather-translation';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = environment.weatherApiKey;
  private apiUrl = 'https://api.weatherapi.com/v1';

  constructor(private http: HttpClient) {}

  getForecastByCity(cityName: string, days: number, unit: string): Observable<any> {
    const url = `${this.apiUrl}/forecast.json?key=${this.apiKey}&q=${cityName}&days=${days}&aqi=no&alerts=no`;
    return this.http.get(url).pipe(
      map((data: any) => {
        data.current.condition.text = this.translateCondition(data.current.condition.text);
        data.forecast.forecastday.forEach((day: any) => {
          day.day.condition.text = this.translateCondition(day.day.condition.text);
          day.hour.forEach((hour: any) => {
            hour.condition.text = this.translateCondition(hour.condition.text);
          });
        });
        return data;
      })
    );
  }

  private translateCondition(condition: string): string {
    return weatherTranslations[condition] || condition;
  }
}
