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
var forEach_1 = require("lodash/forEach");
var TransportListingComponent = /** @class */ (function () {
    function TransportListingComponent(busApiService, logger) {
        this.busApiService = busApiService;
        this.logger = logger;
        this.columns = [{ name: "id" }];
        this.upSrc = '';
        this.downSrc = '';
    }
    TransportListingComponent.prototype.ngOnInit = function () {
        this.upSrc = './../../../assets/images/up.png';
        this.downSrc = './../../../assets/images/down.png';
        this.getBusList();
    };
    TransportListingComponent.prototype.getBusList = function () {
        var _this = this;
        this.busApiService.getBusListing().subscribe(function (resp) {
            _this.logger.log(resp);
            _this.busData = resp;
            _this.normalizeList(_this.busData);
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
        }
    };
    TransportListingComponent.prototype.onArrowClick = function (rowindex, type, row) {
        var styleClass1;
        var styleClass2;
        var rowHeader = 'row-header-' + parseInt(rowindex);
        var colHeader = 'column-' + parseInt(rowindex);
        var imgNor1, imgNor2, rowNor, colNor;
        if (type === 'up') {
            row.status = 'down';
            styleClass1 = 'arrow-up-' + parseInt(rowindex);
            styleClass2 = 'arrow-down-' + parseInt(rowindex);
            imgNor1 = document.getElementsByClassName(styleClass1);
            imgNor2 = document.getElementsByClassName(styleClass2);
            rowNor = document.getElementsByClassName(rowHeader);
            colNor = document.getElementsByClassName(colHeader);
            imgNor1[0].classList.add('hide');
            imgNor2[0].classList.remove('hide');
            rowNor[0].classList.add('hide');
            colNor[0].classList.add('hide');
        }
        else {
            row.status = 'up';
            styleClass1 = 'arrow-down-' + parseInt(rowindex);
            styleClass2 = 'arrow-up-' + parseInt(rowindex);
            imgNor1 = document.getElementsByClassName(styleClass1);
            imgNor2 = document.getElementsByClassName(styleClass2);
            rowNor = document.getElementsByClassName(rowHeader);
            colNor = document.getElementsByClassName(colHeader);
            imgNor1[0].classList.add('hide');
            imgNor2[0].classList.remove('hide');
            rowNor[0].classList.remove('hide');
            colNor[0].classList.remove('hide');
        }
    };
    TransportListingComponent.prototype.normalizeList = function (dataList) {
        forEach_1["default"](dataList, function (row) {
            row.status = 'down';
            // if (row.dueDate === null) {
            //   row.dueDate = "";
            // }
        });
        this.logger.log('new list', this.busData);
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
