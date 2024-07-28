import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { weatherTranslations } from '../components/weather-details/weather-translation';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch weather forecast by city', () => {
    const mockResponse = {
      current: { condition: { text: 'Sunny' } },
      forecast: {
        forecastday: [
          {
            day: { condition: { text: 'Rain' } },
            hour: [
              { condition: { text: 'Cloudy' } },
              { condition: { text: 'Clear' } }
            ]
          }
        ]
      }
    };

    const cityName = 'New York';
    const days = 3;
    const unit = 'metric';

    service.getForecastByCity(cityName, days, unit).subscribe((data) => {
      expect(data.current.condition.text).toEqual(weatherTranslations['Sunny'] || 'Sunny');
      expect(data.forecast.forecastday[0].day.condition.text).toEqual(weatherTranslations['Rain'] || 'Rain');
      expect(data.forecast.forecastday[0].hour[0].condition.text).toEqual(weatherTranslations['Cloudy'] || 'Cloudy');
      expect(data.forecast.forecastday[0].hour[1].condition.text).toEqual(weatherTranslations['Clear'] || 'Clear');
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/forecast.json?key=${service['apiKey']}&q=${cityName}&days=${days}&aqi=no&alerts=no`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should translate weather conditions correctly', () => {
    const condition = 'Sunny';
    const translatedCondition = service['translateCondition'](condition);
    expect(translatedCondition).toEqual(weatherTranslations[condition] || condition);
  });
});
