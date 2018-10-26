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

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content':"application/json",
//     'Content-Type':"application/JSON",
//     'Observe': 'response'
//     //'Access-Control-Request-Headers' : 'Authorization, Origin, X-Requested-With, Content-Type, Accept',
//     // 'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
//     // 'Access-Control-Allow-Headers' : 'Authorization, Origin, X-Requested-With, Content-Type, Accept'
//   })
// };

@Injectable()
export class ProofeoApiProvider {
  baseUrl: string = '/proofeoGoogleAPI';
  apiUrl: string = '/proofeoGoogleAPI/api/v1';


  httpOptions: any;
  tokenhttpOptions: any;
  constructor(private http: HttpClient) {
    this.httpOptions = {
      'headers' : {
        'Content':"application/json",
        'Content-Type':"application/json",
        'Observe': 'response'
      }
    };
  }

  public SetHeaderTokenAuth(info) {
    console.log('info: ' + info.token);
    this.tokenhttpOptions = {
      'headers' : {
        'Content':"application/json",
        'Content-Type':"application/json",
        'Observe': 'response',
        'x-access-token': info.token
      }
    };
        console.log('tokenhttpOptions: ' + JSON.stringify(this.tokenhttpOptions));
  }

  public getMsg(): any {
    console.log('getmsg to ' + this.baseUrl);
    return this.http.get(this.baseUrl, {responseType: 'text'})
    .pipe(catchError(this.handleError));
  }

  public getBackendServerVersion(): any {
    console.log('getmsg to ' + this.baseUrl);
    return this.http.get(this.baseUrl + '/version', {responseType: 'text'})
    .pipe(catchError(this.handleError));
  }

  public login(data) : any {
    console.log('Entered DataService login: ' + JSON.stringify(data));
    return this.http.post(this.baseUrl + '/login',data, this.httpOptions)
    .pipe(catchError(this.handleError));
    //return this.http.post<HttpResponse<Credentials>>(this.apiUrl + '/login', data, httpOptions);
  }

  public signup (data): any {
    console.log('Entered DataService signup: ' + JSON.stringify(data));
    return this.http.post(this.baseUrl + '/signup',data, this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  public checkStellarAccount (): any {
    console.log('Entered DataService checkStellarAccount');
    console.log('tokenhttpOptions checkStellarAccount: ' + JSON.stringify(this.tokenhttpOptions));
    return this.http.post(this.apiUrl + '/checkAccount',{}, this.tokenhttpOptions)
    .pipe(catchError(this.handleError));
  }

  public createStellarAccount (): any {
    console.log('Entered DataService createStellarAccount');
    return this.http.post(this.apiUrl + '/createAccount', {}, this.tokenhttpOptions)
    .pipe(catchError(this.handleError));
  }

  public trustStellarOnAccount (data): any {
    console.log('Entered DataService trustStellarOnAccount');
    return this.http.post(this.apiUrl + '/trustAccount', data, this.tokenhttpOptions)
    .pipe(catchError(this.handleError));
  }

  public transferAsset (data): any {
    console.log('Entered DataService transferAsset: ' + JSON.stringify(data));
    return this.http.post(this.apiUrl + '/transferAsset',data, this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  public transferAssetOnMyAccount (data): any {
    console.log('Entered DataService transferAssetOnMyAccount: ' + JSON.stringify(data));
    return this.http.post(this.apiUrl + '/transferAssetOnMyAccount',data, this.httpOptions)
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
    return of(error.error);
    // return an observable with a user-facing error message
    // return throwError('Something bad happened; please try again later.');
  }
}
