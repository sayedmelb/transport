"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var bus_api_service_1 = require("./bus-api.service");
var http_1 = require("@angular/common/http");
var testing_2 = require("@angular/common/http/testing");
var testing_3 = require("@angular/common/http/testing");
var testing_4 = require("ngx-logger/testing");
describe('BusApiService', function () {
    var service;
    var httpMock;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpClientModule, testing_4.LoggerTestingModule],
            providers: [
                bus_api_service_1.BusApiService,
                testing_3.HttpClientTestingModule,
                testing_2.HttpTestingController,
            ]
        });
        service = testing_1.TestBed.inject(bus_api_service_1.BusApiService);
        httpMock = testing_1.TestBed.inject(testing_2.HttpTestingController);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
    it('the data array returned from JSON server is exppected to have elements', function (done) {
        service.getBusListing().subscribe(function (data) {
            expect(data.length).toBeGreaterThan(0);
            done();
        });
    });
    it('the update service should return updated JSON object from JSON server ', function (done) {
        var busOwner = {
            id: '27c72c67-960d-476d-b39f-b44e5d9244f6',
            organisation: 'Sydney Buses',
            date: '25/09/2015',
            notes: '',
            busData: [
                {
                    busId: '42612',
                    routeVariant: '891 2 1',
                    deviationFromTimetable: 77
                },
                {
                    busId: '29016',
                    routeVariant: '400 1 1',
                    deviationFromTimetable: 340
                },
                {
                    busId: '90467',
                    routeVariant: '393 1 1',
                    deviationFromTimetable: 220
                },
                {
                    busId: '88836',
                    routeVariant: 'M20 1 0',
                    deviationFromTimetable: -287
                },
                {
                    busId: '79367',
                    routeVariant: 'L21 2 1',
                    deviationFromTimetable: 347
                },
            ],
            status: 'down'
        };
        service.updateBusItem(busOwner).subscribe(function (data) {
            expect(data).toBeTruthy();
            done();
        });
    });
    afterEach(function () {
        testing_1.TestBed.resetTestingModule();
    });
});
