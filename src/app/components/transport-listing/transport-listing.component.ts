import { Component, OnInit, ViewChild } from '@angular/core';
import {BusApiService} from './../../services/bus-api.service';
import { NGXLogger } from 'ngx-logger';
import { DatatableComponent } from "@swimlane/ngx-datatable";


@Component({
  selector: 'app-transport-listing',
  templateUrl: './transport-listing.component.html',
  styleUrls: ['./transport-listing.component.scss']
})
export class TransportListingComponent implements OnInit {

  
  @ViewChild(DatatableComponent) table: DatatableComponent;
  busData: any;
  columns = [{ name: "id" }];

  constructor(private busApiService: BusApiService,  private logger: NGXLogger) { }


  ngOnInit(): void {
    this.getBusList();

  }

  getBusList() {
    this.busApiService.getBusListing().subscribe(
      (resp) => {
        this.logger.log(resp);
        this.busData = resp;
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

  onSaveNotes(row){
    this.busApiService.updateBusItem(row).subscribe(
      (resp)=> {
        this.logger.log('after update', resp);
      },
      (error) => {
        this.logger.log(error);

      }
    );


  }


}
