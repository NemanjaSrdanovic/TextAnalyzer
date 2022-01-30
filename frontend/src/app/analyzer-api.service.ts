import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyzerApiService {

  urlVowels = 'http://localhost:8000/api/getVowels/sentence=';
  urlConsonants = 'http://localhost:8000/api/getConsonants/sentence=';
  responseMap = new Map();


  constructor(private _http: HttpClient) { }

  /**
   * Based on the returnVowels argument this methods is calling a endpoint from the api,
   * which returns the amount of vowels or consonants in the input string.
   * 
   * @param returnVowels 
   * @param inputSentence 
   * @returns 
   */
  getApiResult(returnVowels: boolean, inputSentence: String) {

    if (returnVowels) {

      return this._http.get<any>(this.urlVowels + inputSentence)
        .pipe(catchError(this.errorHandler))


    } else {

      return this._http.get<any>(this.urlConsonants + inputSentence)
        .pipe(catchError(this.errorHandler))

    }


  }

  /**
   * This method is logging errors returned from the api when a endpoint was called 
   * and throwing them so that they can be displayed in the html to the user.
   * 
   * @param error 
   * @returns 
   */
  errorHandler(error: HttpErrorResponse) {

    console.log(error);

    return throwError(error);

  }
}
