import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class CrudService {
  // Define API
  apiURL = 'https://exchangerate-api.p.rapidapi.com/rapid/latest/USD';


  constructor(private http: HttpClient) { }
  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': '8d58f1121fmsh45767e1bcc9c808p14bc76jsn2f3de634b55b',
      'X-RapidAPI-Host': 'exchangerate-api.p.rapidapi.com',
    }),
  };


  // HttpClient API get() method
  get(): Observable<any> {
    return this.http
      .get<any>(this.apiURL, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

// HttpClient API get() method 
getList(): Observable<any> {
  return this.http
    .get<any>("https://api.nbp.pl/api/exchangerates/tables/A?format=json")
    .pipe(retry(1), catchError(this.handleError));
}


  // HttpClient API get() method 
  getByID(id: any): Observable<any> {
    return this.http
      .get<any>('https://exchangerate-api.p.rapidapi.com/rapid/latest/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getByDate(start_date: any,end_date: any,currency: any): Observable<any> {
    return this.http
      // .get<any>('https://openexchangerates.org/api/historical/' + date + '.json, {app_id: "cd7783283a994ea396a59f3d5cc215ab"}')
      .get<any>('http://api.nbp.pl/api/exchangerates/rates/A/'+currency+'/'+start_date+'/'+end_date+'?format=json')
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}