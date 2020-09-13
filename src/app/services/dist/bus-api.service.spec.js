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
});
