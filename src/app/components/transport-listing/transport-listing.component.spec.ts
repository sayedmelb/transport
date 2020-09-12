import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportListingComponent } from './transport-listing.component';

describe('TransportListingComponent', () => {
  let component: TransportListingComponent;
  let fixture: ComponentFixture<TransportListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
