import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SearchComponent } from './search.component';
import { GeolocationService } from '../../services/geolocation.service';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockGeolocationService: jasmine.SpyObj<GeolocationService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockGeolocationService = jasmine.createSpyObj('GeolocationService', ['searchCities']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [SearchComponent, FormsModule, CommonModule],
      providers: [
        { provide: GeolocationService, useValue: mockGeolocationService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty cityName and searchResults', () => {
    expect(component.cityName).toBeUndefined();
    expect(component.searchResults).toEqual([]);
  });

  describe('searchCities', () => {
    it('should call searchCities on GeolocationService if cityName is set', () => {
      component.cityName = 'New York';
      const mockData = { data: [{ id: '1', name: 'New York' }] };
      mockGeolocationService.searchCities.and.returnValue(of(mockData));

      component.searchCities();

      expect(mockGeolocationService.searchCities).toHaveBeenCalledWith('New York');
      expect(component.searchResults).toEqual(mockData.data);
    });

    it('should not call searchCities on GeolocationService if cityName is not set', () => {
      component.cityName = undefined;
      component.searchCities();

      expect(mockGeolocationService.searchCities).not.toHaveBeenCalled();
    });

    it('should handle error from searchCities', () => {
      component.cityName = 'New York';
      mockGeolocationService.searchCities.and.returnValue(throwError(() => new Error('Error')));

      spyOn(console, 'error');
      component.searchCities();

      expect(console.error).toHaveBeenCalledWith('Error searching cities:', jasmine.any(Error));
    });
  });

  describe('viewCityDetails', () => {
    it('should navigate to city details page', () => {
      const cityId = '1';
      component.viewCityDetails(cityId);

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/city-details', cityId]);
    });
  });

  describe('viewWeatherDetails', () => {
    it('should navigate to weather details page', () => {
      const cityId = '1';
      component.viewWeatherDetails(cityId);

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/weather-details', cityId]);
    });
  });
});
