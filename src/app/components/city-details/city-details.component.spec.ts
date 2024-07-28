import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { CityDetailsComponent } from './city-details.component';
import { GeolocationService } from '../../services/geolocation.service';
import { fas } from '@fortawesome/free-solid-svg-icons';

describe('CityDetailsComponent', () => {
  let component: CityDetailsComponent;
  let fixture: ComponentFixture<CityDetailsComponent>;
  let mockGeolocationService: jasmine.SpyObj<GeolocationService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockGeolocationService = jasmine.createSpyObj('GeolocationService', ['getCityDetails']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, CityDetailsComponent],
      providers: [
        { provide: GeolocationService, useValue: mockGeolocationService },
        { provide: Router, useValue: mockRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '123',
              },
            },
          },
        },
        FaIconLibrary,
      ]
    }).compileComponents();

    const library = TestBed.inject(FaIconLibrary);
    library.addIconPacks(fas);

    fixture = TestBed.createComponent(CityDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
      expect(component).toBeTruthy();
  });

  it('should initialize with cityId and fetch city details', () => {
    const mockCityDetails = { name: 'Test City', id: '123' };
    mockGeolocationService.getCityDetails.and.returnValue(of(mockCityDetails));

    component.ngOnInit();

    expect(component.cityId).toBe('123');
    expect(mockGeolocationService.getCityDetails).toHaveBeenCalledWith('123');
    expect(component.cityDetails).toEqual(mockCityDetails);
  });

  it('should handle error when fetching city details', () => {
    mockGeolocationService.getCityDetails.and.returnValue(throwError(() => new Error('Error')));

    spyOn(console, 'error');
    component.ngOnInit();

    expect(console.error).toHaveBeenCalledWith('Error fetching city details:', jasmine.any(Error));
  });

  it('should navigate to weather details', () => {
    component.cityId = '123';
    component.navigateToWeatherDetails();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/weather-details', '123']);
  });

  it('should navigate to home', () => {
    component.navigateToHome();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/search']);
  });
});
