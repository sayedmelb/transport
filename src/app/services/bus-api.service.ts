import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BusOperator } from '../model/bus-operator';
import { timeout, catchError } from 'rxjs/operators';
import { throwError, TimeoutError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';


@Injectable({
  providedIn: 'root'
})
export class BusApiService {
  private httpHeaders = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      Accept: 'application/json',
      Authorisation: 'No Auth',
    }),
  };
  private apiUrl = `${environment.BUS_API_URL}`;

  public getBusListing(): Observable<BusOperator[]> {
    const url = this.apiUrl;
    // return this.http.get<any>(url,this.httpHeaders);
    return this.http.get<any>(url)
    .pipe(
    timeout(parseInt(`${environment.RESPONSE_TIMEOUT_API}`, 10)),
      catchError((error) => {
        if (error instanceof TimeoutError) {
          this.logger.log('timeout service.');
          return throwError('Timeout Exception');
        }

        return throwError(error);
      })
    );
  }


  updateBusItem(busOperator: BusOperator) {
    const id = busOperator.id;
    const url = this.apiUrl
    console.log('id', id);
    return this.http.put(`${url}/${id}`, busOperator);
      
  }

  constructor(private http: HttpClient, private logger: NGXLogger) {}
}
