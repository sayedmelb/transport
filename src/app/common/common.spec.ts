import { TestBed, inject } from '@angular/core/testing';

import { getStatus } from './common';
import { HttpClientModule } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';

describe('Common funcions', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpTestingController],
    });
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('expect getStatus to return value On Time', () => {
    const elem = 100;
    const returnItem = getStatus(elem);
    expect(getStatus(elem)).toEqual('On Time');
  });

  it('expect getStatus to return value Late', () => {
    const elem = 400;
    const returnItem = getStatus(elem);
    expect(getStatus(elem)).toEqual('Late');
  });

  it('expect getStatus to return value Early', () => {
    const elem = -300;
    const returnItem = getStatus(elem);
    expect(getStatus(elem)).toEqual('Early');
  });

  it('expect getStatus to return value Unknown', () => {
    const elem = null;
    const returnItem = getStatus(elem);
    expect(getStatus(elem)).toEqual('Unknown');
  });
});
