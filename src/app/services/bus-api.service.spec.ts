import { TestBed } from '@angular/core/testing';

import { BusApiService } from './bus-api.service';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpTestingController } from '@angular/common/http/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';

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
});
