"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.TransportListingComponent = void 0;
var core_1 = require("@angular/core");
var ngx_datatable_1 = require("@swimlane/ngx-datatable");
var _ = require("lodash");
var forEach_1 = require("lodash/forEach");
var common_1 = require("./../../common/common");
var TransportListingComponent = /** @class */ (function () {
    function TransportListingComponent(busApiService, logger) {
        this.busApiService = busApiService;
        this.logger = logger;
        this.columns = [{ name: 'id' }];
        this.upSrc = '';
        this.downSrc = '';
        this.isLoading = true;
        this.spinnerSrc = '';
        this.title = 'Bus Reports';
        this.search = '';
    }
    TransportListingComponent.prototype.ngOnInit = function () {
        this.upSrc = './../../../assets/images/up.png';
        this.downSrc = './../../../assets/images/down.png';
        this.spinnerSrc = './../../../assets/images/busy-spinner.gif';
        this.getBusList();
    };
    TransportListingComponent.prototype.getBusList = function () {
        var _this = this;
        this.busApiService.getBusListing().subscribe(function (resp) {
            _this.logger.log(resp);
            _this.isLoading = false;
            _this.busData = resp;
            _this.normalizeList(_this.busData);
            _this.patchNull(_this.busData);
            _this.logger.log('final busData', _this.busData);
            _this.rawData = _.clone(_this.busData, true);
        }, function (error) {
            if (error === 'Timeout Exception') {
                _this.logger.log('Timed out');
            }
            else {
                _this.logger.log(error);
            }
        });
    };
    TransportListingComponent.prototype.onSaveNotes = function (row) {
        var _this = this;
        this.busApiService.updateBusItem(row).subscribe(function (resp) {
            _this.logger.log('after update', resp);
        }, function (error) {
            _this.logger.log(error);
        });
    };
    TransportListingComponent.prototype.getStatusValue = function (elem) {
        return common_1.getStatus(elem);
    };
    TransportListingComponent.prototype.onArrowClick = function (rowindex, type, row) {
        var styleClass1;
        var styleClass2;
        /*eslint radix: ['error', 'as-needed']*/
        var rowHeader = 'row-header-' + rowindex;
        var colHeader = 'column-' + rowindex;
        var imgNor1;
        var imgNor2;
        var rowNor;
        var colNor;
        if (type === 'up') {
            row.status = 'down';
            styleClass1 = 'arrow-up-' + rowindex;
            styleClass2 = 'arrow-down-' + rowindex;
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
            styleClass1 = 'arrow-down-' + rowindex;
            styleClass2 = 'arrow-up-' + rowindex;
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
        });
        this.logger.log('new list', this.busData);
    };
    TransportListingComponent.prototype.patchNull = function (data) {
        forEach_1["default"](data, function (row) {
            forEach_1["default"](row.busData, function (item) {
                if (item.deviationFromTimetable === null) {
                    item.deviationFromTimetable = '';
                }
            });
        });
    };
    TransportListingComponent.prototype.onChange = function () {
        this.logger.log('change', this.search);
        if (this.busData) {
            var temp = void 0;
            temp = __spreadArrays(this.busData);
            // temp = temp.map(({ fines, ...item }) => item);
            var val_1 = this.search ? this.search.toLowerCase() : '';
            var that_1 = this;
            this.busData = temp.filter(function (d) {
                return (JSON.stringify(that_1.getAllValues(d)).toLowerCase().indexOf(val_1) !==
                    -1 || !val_1);
            });
        }
    };
    TransportListingComponent.prototype.onClear = function () {
        this.busData = this.rawData;
        this.search = '';
    };
    TransportListingComponent.prototype.getAllValues = function (object) {
        var values = [];
        for (var _i = 0, _a = Object.keys(object); _i < _a.length; _i++) {
            var key = _a[_i];
            if (typeof object[key] !== 'object') {
                values.push(object[key]);
            }
            else {
                values = __spreadArrays(values, this.getAllValues(object[key]));
            }
        }
        return values;
    };
    __decorate([
        core_1.ViewChild(ngx_datatable_1.DatatableComponent)
    ], TransportListingComponent.prototype, "table");
    TransportListingComponent = __decorate([
        core_1.Component({
            selector: 'app-transport-listing',
            templateUrl: './transport-listing.component.html',
            styleUrls: ['./transport-listing.component.scss']
        })
    ], TransportListingComponent);
    return TransportListingComponent;
}());
exports.TransportListingComponent = TransportListingComponent;
