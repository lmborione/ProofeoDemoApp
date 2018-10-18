import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';

const httpOptionsText = {
  headers: new HttpHeaders({
    'Content-Type': 'text/plain',
  })
};

const httpOptions = {
  headers: new HttpHeaders({
    'Content':"application/json",
    'Content-Type':"application/JSON",
    'Observe': 'response'
    //'Access-Control-Request-Headers' : 'Authorization, Origin, X-Requested-With, Content-Type, Accept',
    // 'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
    // 'Access-Control-Allow-Headers' : 'Authorization, Origin, X-Requested-With, Content-Type, Accept'
  })
};

@Injectable()
export class ProofeoApiProvider {
  apiUrl: string = '/proofeoGoogleAPI';
  constructor(private http: HttpClient) {

  }

  public getMsg(): any {
    console.log('getmsg to ' + this.apiUrl);
    return this.http.get(this.apiUrl, {responseType: 'text'})
    .pipe(catchError(this.handleError));
  }

  public getBackendServerVersion(): any {
    console.log('getmsg to ' + this.apiUrl);
    return this.http.get(this.apiUrl + '/version', {responseType: 'text'})
    .pipe(catchError(this.handleError));
  }

  public login(data) : any {
    console.log('Entered DataService login: ' + JSON.stringify(data));
    return this.http.post(this.apiUrl + '/login',data, httpOptions)
    .pipe(catchError(this.handleError));
    //return this.http.post<HttpResponse<Credentials>>(this.apiUrl + '/login', data, httpOptions);
  }

  public signup (data): any {
    console.log('Entered DataService signup: ' + JSON.stringify(data));
    return this.http.post(this.apiUrl + '/login/signup',data, httpOptions)
    .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else if (error.error.message){
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${JSON.stringify(error.error.message)}`);
    }
    return of(error);
    // return an observable with a user-facing error message
    // return throwError('Something bad happened; please try again later.');
  }
}
