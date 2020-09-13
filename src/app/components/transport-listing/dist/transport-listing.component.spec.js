"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var transport_listing_component_1 = require("./transport-listing.component");
var bus_api_service_1 = require("./../../services/bus-api.service");
var testing_2 = require("@angular/router/testing");
var http_1 = require("@angular/common/http");
var testing_3 = require("ngx-logger/testing");
var busApiService;
describe('TransportListingComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [testing_2.RouterTestingModule, http_1.HttpClientModule, testing_3.LoggerTestingModule],
            declarations: [transport_listing_component_1.TransportListingComponent]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(transport_listing_component_1.TransportListingComponent);
        component = fixture.componentInstance;
        busApiService = testing_1.TestBed.inject(bus_api_service_1.BusApiService);
        fixture.detectChanges();
    });
    it('should create Bus Listing Component', function () {
        // expect(component).toBeTruthy();
        var app = fixture.debugElement.componentInstance;
        app.ngOnInit();
        expect(app).toBeTruthy();
    });
    it('should have expected title', function () {
        var app = fixture.debugElement.componentInstance;
        expect(component.title).toBe('Bus Reports');
    });
    it('the data array returned from JSON server should return value', function (done) {
        busApiService.getBusListing().subscribe(function (data) {
            expect(data.length).toBeGreaterThan(0);
            done();
        });
    });
    it('the busData object should have value', function (done) {
        busApiService.getBusListing().subscribe(function (data) {
            expect(component.busData.length).toBeGreaterThan(0);
            done();
        });
    });
    it('isLoading should be false after data gets loaded', function (done) {
        busApiService.getBusListing().subscribe(function (data) {
            expect(component.isLoading).toEqual(false);
            done();
        });
    });
    afterEach(function () {
        testing_1.TestBed.resetTestingModule();
    });
});
