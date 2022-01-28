import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyzerApiService {

  urlVowels = 'http://localhost:8001/api/getVowels/sentence=';
  urlConsonants = 'http://localhost:8001/api/getConsonants/sentence=';
  responseMap = new Map();


  constructor(private _http: HttpClient) { }

  getApiResult(returnVowels: boolean, inputSentence: String) {

    if (returnVowels) {

      return this._http.get<any>(this.urlVowels + inputSentence)
        .pipe(catchError(this.errorHandler))


    } else {

      return this._http.get<any>(this.urlConsonants + inputSentence)
        .pipe(catchError(this.errorHandler))

    }


  }

  errorHandler(error: HttpErrorResponse) {

    console.log(error);

    return throwError(error);

  }
}
