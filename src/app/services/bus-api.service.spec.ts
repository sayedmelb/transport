import { TestBed } from '@angular/core/testing';

import { BusApiService } from './bus-api.service';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpTestingController } from '@angular/common/http/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { BusOperator } from '../model/bus-operator';

describe('BusApiService', () => {
  let service: BusApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, LoggerTestingModule],
      providers: [
        BusApiService,
        HttpClientTestingModule,
        HttpTestingController,
      ],
    });
    service = TestBed.inject(BusApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('the data array returned from JSON server is exppected to have elements', (done: DoneFn) => {
    service.getBusListing().subscribe((data) => {
      expect(data.length).toBeGreaterThan(0);
      done();
    });
  });

  it('the update service should return updated JSON object from JSON server ', (done: DoneFn) => {
    const busOwner: any = {
      id: '27c72c67-960d-476d-b39f-b44e5d9244f6',
      organisation: 'Sydney Buses',
      date: '25/09/2015',
      notes: '',
      busData: [
        {
          busId: '42612',
          routeVariant: '891 2 1',
          deviationFromTimetable: 77,
        },
        {
          busId: '29016',
          routeVariant: '400 1 1',
          deviationFromTimetable: 340,
        },
        {
          busId: '90467',
          routeVariant: '393 1 1',
          deviationFromTimetable: 220,
        },
        {
          busId: '88836',
          routeVariant: 'M20 1 0',
          deviationFromTimetable: -287,
        },
        {
          busId: '79367',
          routeVariant: 'L21 2 1',
          deviationFromTimetable: 347,
        },
      ],
      status: 'down',
    };
    service.updateBusItem(busOwner).subscribe((data) => {
      expect(data).toBeTruthy();
      done();
    });
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
