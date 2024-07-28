import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GeolocationService } from './geolocation.service';
import { environment } from '../../environments/environment';

describe('GeolocationService', () => {
  let service: GeolocationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GeolocationService]
    });
    service = TestBed.inject(GeolocationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch cities based on name prefix', () => {
    const mockResponse = { data: [{ id: '1', name: 'City1' }] };
    const namePrefix = 'City';

    service.searchCities(namePrefix).subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}cities?namePrefix=${namePrefix}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('X-RapidAPI-Key')).toBe(environment.geoDbApiKey);
    expect(req.request.headers.get('X-RapidAPI-Host')).toBe('wft-geo-db.p.rapidapi.com');
    req.flush(mockResponse);
  });

  it('should fetch city details by city ID', () => {
    const mockResponse = { id: '1', name: 'City1', country: 'Country1' };
    const cityId = '1';

    service.getCityDetails(cityId).subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}cities/${cityId}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('X-RapidAPI-Key')).toBe(environment.geoDbApiKey);
    expect(req.request.headers.get('X-RapidAPI-Host')).toBe('wft-geo-db.p.rapidapi.com');
    req.flush(mockResponse);
  });
});
