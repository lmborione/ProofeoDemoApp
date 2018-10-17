import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { of } from 'rxjs/observable/of';
import { catchError, tap, map } from 'rxjs/operators';
import { Credentials } from '../../models/credentials'

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
export class ApiProvider {
  // apiUrl = 'http://localhost:4000';
  private apiUrl: string;
  private apiUrlLogin: string;

  private resolveSuffix: string = '?resolve=true';
  private headers: Headers;
  constructor(private http: HttpClient) {
    //this.apiUrl = 'https://proofeofidelity-demo.appspot.com';

    this.apiUrl = '/proofeoGoogleAPI';
    // this.headers = new Headers();
    // this.headers.append('Content-Type', 'application/json');
    // this.headers.append('Accept', 'application/json');
    // this.headers.append('Access-Control-Allow-Origin', '*');
    // this.headers.append('responseType', 'text');
  }

  public getMsg(): any {
    console.log('getmsg to ' + this.apiUrl);
    var test1 =  this.http.get(this.apiUrl, {responseType: 'text'});
    //var test = this.http.get(this.apiUrl, httpOptions);
    return test1.pipe(catchError(this.handleError));

    // console.log(test1);
    // return test.pipe(
    //   tap(data => console.log('data: ' + data)),
    //   catchError(this.handleError('getAll', []))
    // );
  }

  public login(data) : Observable<HttpResponse<Credentials>> {

    console.log('enter api login: ' + JSON.stringify(data));

    // return this.http.post(this.apiUrlLogin, data, httpOptions).pipe(
    //    tap(res => console.log('tap result: ' + JSON.stringify(res))),
    //    catchError(this.handleError('',[])));

       return this.http.post<HttpResponse<Credentials>>(this.apiUrl + '/login', data, httpOptions);


    // return new Promise((resolve, reject) => {
    //    this.http.post(this.apiUrl+'/login', JSON.stringify(data), httpOptions)
    //      .subscribe((res) => {
    //        console.log('res; ' + JSON.stringify(res));
    //        resolve(res);
    //      }, (err) => {
    //        console.log('err; ' + JSON.stringify(err));
    //        reject(err);
    //      });
    //  });


//
// console.log(JSON.stringify(data));
//    return this.http.post(this.apiUrl + '/login/signup', JSON.stringify(data), options).do( (res) => { console.log(res);});
//

    // console.log('Entered DataService login: ' + JSON.stringify(data));
    // return this.http.post(this.apiUrl + '/login', data, {
    //   headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*' }
    // }).pipe(
    //   tap(data => console.log(data)),
    //   catchError(this.handleError('',[])));
    }

    public signup (data): any {
      console.log('Entered DataService submitNewUser: ' + JSON.stringify(data));


       return this.http.post(this.apiUrl + '/login/signup',JSON.parse(JSON.stringify(data)), httpOptions).pipe(
         //map(data => console.log(data)),
         catchError(this.handleError));
      }

      public postUser (): any {
        console.log('Entered DataService postUser');

        //     return this.http.post<T>(this.actionUrl + ns, asset, httpOptions).pipe(
        //       tap((asset: T) => console.log(`added asset w/ id=${asset}`)),
        //       catchError(this.handleError<T>('addAsset'))
        //     );

        return this.http.post(this.apiUrl + '/user', httpOptions).pipe(
          tap(data => console.log(data)),
          catchError(this.handleError));
        }

        // public getAll<T>(ns: string): Observable<T[]> {
        //     console.log('GetAll ' + ns + ' to ' + this.actionUrl + ns);
        //     return this.http.get<T[]>(`${this.actionUrl}${ns}`, httpOptions).pipe(
        //       tap(data => console.log('data: ' + data)),
        //       catchError(this.handleError('getAll', []))
        //     );
        //   }

        //   public getSingle(ns: string, id: string): Observable<T> {
        //     const url = this.actionUrl + ns + '/' + id + this.resolveSuffix;
        //     return this.http.get<T>(url, httpOptions).pipe(
        //       tap(_ => console.log(`fetched single asset id=${id}`)),
        //       catchError(this.handleError<T>(`getasset id=${id}`))
        //     );
        //   }
        //
        //   public add (ns: string, asset: T): Observable<T> {
        //     console.log('Entered DataService add');
        //     console.log('Add ' + ns);
        //     console.log('asset', asset);
        //
        //     return this.http.post<T>(this.actionUrl + ns, asset, httpOptions).pipe(
        //       tap((asset: T) => console.log(`added asset w/ id=${asset}`)),
        //       catchError(this.handleError<T>('addAsset'))
        //     );
        //   }
        //
        //
        // public update(ns: string, id: string, itemToUpdate: T): Observable<T> {
        //     console.log('Update ' + ns);
        //     console.log('what is the id?', id);
        //     console.log('what is the updated item?', itemToUpdate);
        //     console.log('what is the updated item?', JSON.stringify(itemToUpdate));
        //
        //     return this.http.put(`${this.actionUrl}${ns}/${id}`, itemToUpdate, httpOptions).pipe(
        //         tap(_ => console.log(`updated asset id=${itemToUpdate}`)),
        //         catchError(this.handleError<any>('updateAsset'))
        //       );
        // }
        //
        // public delete(ns: string, id: string): Observable<T> {
        //     console.log('Delete ' + ns);
        //     console.log('id ' + id);
        //
        //     return this.http.delete<T>(this.actionUrl + ns + '/' + id, httpOptions).pipe(
        //         tap(_ => console.log(`deleted asset id=${id}`)),
        //         catchError(this.handleError<T>('deleteAsset'))
        //       );
        // }
        //
        // public query(ns: string, paramKey: string, paramValue: string): Observable<T[]> {
        //   const url = this.actionUrl + ns + '?' + paramKey + '=' + paramValue;
        //   console.log(url);
        //   return this.http.get<T[]>(url, httpOptions).pipe(
        //     tap(data => console.log('data: ' + data)),
        //     catchError(this.handleError('getAll', []))
        //   );
        // }

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
        };

        private oldhandleError (operation = 'operation', result?: any) {
          return (error: any): Observable<any> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result);
          };
        }
      }
