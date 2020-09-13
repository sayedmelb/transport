"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BusApiService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("../../environments/environment");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var operators_2 = require("rxjs/operators");
var BusApiService = /** @class */ (function () {
    function BusApiService(http, logger) {
        this.http = http;
        this.logger = logger;
        this.httpHeaders = {
            headers: new http_1.HttpHeaders({
                "Content-type": "application/json",
                Accept: "application/json",
                Authorisation: "No Auth"
            })
        };
        this.apiUrl = "" + environment_1.environment.BUS_API_URL;
    }
    BusApiService.prototype.getBusListing = function () {
        var _this = this;
        var url = this.apiUrl;
        // return this.http.get<any>(url,this.httpHeaders);
        return this.http.get(url).pipe(operators_2.delay(1500), operators_1.timeout(parseInt("" + environment_1.environment.RESPONSE_TIMEOUT_API, 10)), operators_1.catchError(function (error) {
            if (error instanceof rxjs_1.TimeoutError) {
                _this.logger.log("timeout service.");
                return rxjs_1.throwError("Timeout Exception");
            }
            return rxjs_1.throwError(error);
        }));
    };
    BusApiService.prototype.updateBusItem = function (busOperator) {
        var id = busOperator.id;
        var url = this.apiUrl;
        console.log("id", id);
        return this.http.put(url + "/" + id, busOperator);
    };
    BusApiService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        })
    ], BusApiService);
    return BusApiService;
}());
exports.BusApiService = BusApiService;
