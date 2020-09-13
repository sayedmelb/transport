import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportListingComponent } from './transport-listing.component';
import { BusApiService } from './../../services/bus-api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
// import * as stubObj from './stub-data.json';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { componentFactoryName } from '@angular/compiler';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';

let busApiService: BusApiService;

describe('TransportListingComponent', () => {
  let component: TransportListingComponent;
  let fixture: ComponentFixture<TransportListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, LoggerTestingModule],
      declarations: [TransportListingComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportListingComponent);
    component = fixture.componentInstance;
    busApiService = TestBed.inject(BusApiService);
    fixture.detectChanges();
  });

  it('should create Bus Listing Component', () => {
    // expect(component).toBeTruthy();
    const app = fixture.debugElement.componentInstance;
    app.ngOnInit();

    expect(app).toBeTruthy();
  });

  it('should have expected title', () => {
    const app = fixture.debugElement.componentInstance;
    expect(component.title).toBe('Bus Reports');
  });

  it('the data array returned from JSON server should return value', (done: DoneFn) => {
    busApiService.getBusListing().subscribe((data) => {
      expect(data.length).toBeGreaterThan(0);
      done();
    });
  });

  it('the busData object should have value', (done: DoneFn) => {
    busApiService.getBusListing().subscribe((data) => {
      expect(component.busData.length).toBeGreaterThan(0);
      done();
    });
  });

  it('isLoading should be false after data gets loaded', (done: DoneFn) => {
    busApiService.getBusListing().subscribe((data) => {
      expect(component.isLoading).toEqual(false);
      done();
    });
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

});
