"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var common_1 = require("./common");
var http_1 = require("@angular/common/http");
var testing_2 = require("@angular/common/http/testing");
describe('Common funcions', function () {
    var httpMock;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpClientModule],
            providers: [testing_2.HttpTestingController]
        });
        httpMock = testing_1.TestBed.inject(testing_2.HttpTestingController);
    });
    it('expect getStatus to return value On Time', function () {
        var elem = 100;
        var returnItem = common_1.getStatus(elem);
        expect(common_1.getStatus(elem)).toEqual('On Time');
    });
    it('expect getStatus to return value Late', function () {
        var elem = 400;
        var returnItem = common_1.getStatus(elem);
        expect(common_1.getStatus(elem)).toEqual('Late');
    });
    it('expect getStatus to return value Early', function () {
        var elem = -300;
        var returnItem = common_1.getStatus(elem);
        expect(common_1.getStatus(elem)).toEqual('Early');
    });
    it('expect getStatus to return value Unknown', function () {
        var elem = null;
        var returnItem = common_1.getStatus(elem);
        expect(common_1.getStatus(elem)).toEqual('Unknown');
    });
});
