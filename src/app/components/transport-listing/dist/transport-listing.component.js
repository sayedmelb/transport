"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TransportListingComponent = void 0;
var core_1 = require("@angular/core");
var ngx_datatable_1 = require("@swimlane/ngx-datatable");
var TransportListingComponent = /** @class */ (function () {
    function TransportListingComponent(busApiService, logger) {
        this.busApiService = busApiService;
        this.logger = logger;
        this.columns = [{ name: "id" }];
    }
    TransportListingComponent.prototype.ngOnInit = function () {
        this.getBusList();
    };
    TransportListingComponent.prototype.getBusList = function () {
        var _this = this;
        this.busApiService.getBusListing().subscribe(function (resp) {
            _this.logger.log(resp);
            _this.busData = resp;
        }, function (error) {
            // this.errorStatus = true;
            // this.errorMessage = error.statusText;
            // if (error === 'Timeout Exception') {
            //   this.logger.log('Timed out');
            // }
        });
    };
    TransportListingComponent.prototype.onSaveNotes = function (row) {
        var _this = this;
        this.busApiService.updateBusItem(row).subscribe(function (resp) {
            _this.logger.log("after update", resp);
        }, function (error) {
            _this.logger.log(error);
        });
    };
    TransportListingComponent.prototype.getStatusValue = function (elem) {
        if (!elem) {
            return "Unknown";
        }
        else {
            var status = "";
            if (elem >= -200 && elem <= 200) {
                return "On Time";
            }
            else if (elem < -200) {
                return "Early";
            }
            else if (elem > 200) {
                return "Late";
            }
            //  switch(elem){
            //    case (elem>=-200 && elem<=200 ):
            //     status = 'On Time';
            //     break;
            //    case (elem<-200):
            //      status = 'Early';
            //       break;
            //    case (elem>200):
            //    status = 'Late';
            //    break;
            //  }
            //  return status;
        }
    };
    __decorate([
        core_1.ViewChild(ngx_datatable_1.DatatableComponent)
    ], TransportListingComponent.prototype, "table");
    TransportListingComponent = __decorate([
        core_1.Component({
            selector: "app-transport-listing",
            templateUrl: "./transport-listing.component.html",
            styleUrls: ["./transport-listing.component.scss"]
        })
    ], TransportListingComponent);
    return TransportListingComponent;
}());
exports.TransportListingComponent = TransportListingComponent;
