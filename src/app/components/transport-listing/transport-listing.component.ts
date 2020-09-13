import { Component, OnInit, ViewChild } from "@angular/core";
import { BusApiService } from "./../../services/bus-api.service";
import { NGXLogger } from "ngx-logger";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import * as _ from "lodash";
import forEach from "lodash/forEach";

@Component({
  selector: "app-transport-listing",
  templateUrl: "./transport-listing.component.html",
  styleUrls: ["./transport-listing.component.scss"],
})
export class TransportListingComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  busData: any;
  columns = [{ name: "id" }];
  upSrc='';
  downSrc='';

  constructor(
    private busApiService: BusApiService,
    private logger: NGXLogger
  ) {}

  ngOnInit(): void {
    this.upSrc= './../../../assets/images/up.png';
    this.downSrc='./../../../assets/images/down.png';
    this.getBusList();
  }

  getBusList() {
    this.busApiService.getBusListing().subscribe(
      (resp) => {
        this.logger.log(resp);
        this.busData = resp;
        this.normalizeList(this.busData);
      },
      (error) => {
        // this.errorStatus = true;
        // this.errorMessage = error.statusText;
        // if (error === 'Timeout Exception') {
        //   this.logger.log('Timed out');
        // }
      }
    );
  }

  onSaveNotes(row) {
    this.busApiService.updateBusItem(row).subscribe(
      (resp) => {
        this.logger.log("after update", resp);
      },
      (error) => {
        this.logger.log(error);
      }
    );
  }

  getStatusValue(elem) {
    if (!elem) {
      return "Unknown";
    } else {
      let status = "";
      if (elem >= -200 && elem <= 200) {
        return "On Time";
      } else if (elem < -200) {
        return "Early";
      } else if (elem > 200) {
        return "Late";
      }

      
    }
  }

  onArrowClick(rowindex,type,row){

    

    let styleClass1;
    let styleClass2;
    let rowHeader='row-header-' + parseInt(rowindex);
    let colHeader='column-' + parseInt(rowindex);
    let imgNor1, imgNor2, rowNor, colNor;
    if(type==='up'){
      row.status='down';

      styleClass1='arrow-up-' + parseInt(rowindex);
      styleClass2='arrow-down-' + parseInt(rowindex);
      imgNor1 = document.getElementsByClassName(
        styleClass1
      ) as HTMLCollectionOf<HTMLElement>;
       imgNor2 = document.getElementsByClassName(
        styleClass2
      ) as HTMLCollectionOf<HTMLElement>;

      rowNor = document.getElementsByClassName(
        rowHeader
      ) as HTMLCollectionOf<HTMLElement>;

      colNor = document.getElementsByClassName(
        colHeader
      ) as HTMLCollectionOf<HTMLElement>;

      imgNor1[0].classList.add('hide');
      imgNor2[0].classList.remove('hide');
      rowNor[0].classList.add('hide');
      colNor[0].classList.add('hide');


    }else {
      row.status='up';
      styleClass1='arrow-down-'+ parseInt(rowindex);
      styleClass2='arrow-up-'+ parseInt(rowindex);

      imgNor1 = document.getElementsByClassName(
        styleClass1
      ) as HTMLCollectionOf<HTMLElement>;
       imgNor2 = document.getElementsByClassName(
        styleClass2
      ) as HTMLCollectionOf<HTMLElement>;

      rowNor = document.getElementsByClassName(
        rowHeader
      ) as HTMLCollectionOf<HTMLElement>;

      colNor = document.getElementsByClassName(
        colHeader
      ) as HTMLCollectionOf<HTMLElement>;

      imgNor1[0].classList.add('hide');
      imgNor2[0].classList.remove('hide');
      rowNor[0].classList.remove('hide');
      colNor[0].classList.remove('hide');

    }

  
  }

  normalizeList(dataList){
    forEach(dataList, (row) => {
      row.status='down';
      // if (row.dueDate === null) {
      //   row.dueDate = "";
      // }
    });
    this.logger.log('new list', this.busData);
  }

}
