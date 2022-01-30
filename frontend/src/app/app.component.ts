
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AnalyzerApiService } from './analyzer-api.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sounds = ['Vowels', 'Consonants'];
  soundHasError = true;
  resultKeys = new Array();
  resultSentence = new Map();
  resultBahaviour = new Map();
  resultSound = new Map();
  result = new Map();
  errorMsg = '';

  vowels = new Set(['A', 'E', 'I', 'O', 'U']);
  consonants = new Set(['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K',
    'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z']);


  constructor(private formBuilder: FormBuilder, private _analyzerApiService: AnalyzerApiService) { }

  analyzerForm = this.formBuilder.group({
    formControlSequence: ['', Validators.required],
    formControlBahaviour: ['', Validators.required],
    formControlSound: ['']
  });


/**
 * Method called when the user fills out the form and presses the submit button. 
 * Based on the form input the input text is analyzed localy or a request send to the api
 * to analyze the input text. The form inputs and analysis result are linked together with the 
 * same key and are stored in different maps to be used. After the data has been saved the form
 * is reset to allow further input. 
 */
  getResults() {

    var returnVowels = this.formControlSound?.value == 'Vowels' ? true : false;
    var callApi = this.formControlBahaviour?.value == 'online' ? true : false;
    this.errorMsg = "";

    this.resultSentence.set(this.result.size, this.formControlSequence?.value);
    this.resultBahaviour.set(this.result.size,this.formControlBahaviour?.value);
    this.resultSound.set(this.result.size, this.formControlSound?.value);


    if (callApi) {

      this._analyzerApiService.getApiResult(returnVowels, this.formControlSequence?.value)
        .subscribe(
          response => this.setApiResult(response),
          error => this.errorMsg = "An error has occurred. Please try again or change the application behavior. Error: " + error.status + " : " + error.error,

        );
    } else {

      this.getLocalResult(returnVowels, this.formControlSequence?.value);
    }

    this.formControlSequence?.reset();
    this.formControlBahaviour?.reset();
    this.formControlSound?.setValue("default");
  }

/**
 * Method called from the getResults() method when the form input "offline" has been selected.
 * Based on the returnVowels argument in analyzes the input sentence and returns the amount of 
 * vowels or consonants that exsist in the input sentence.
 * 
 * @param returnVowels 
 * @param inputSentence 
 */
  getLocalResult(returnVowels: boolean, inputSentence: String) {

    var chars = Array.from(inputSentence);
    var vowelsMap = new Map();
    var consonantsMap = new Map();

    chars.forEach(letter => {

      var upperLetter = letter.toUpperCase();

      if (this.vowels.has(upperLetter)) {

        var count = vowelsMap.has(upperLetter) ? vowelsMap.get(upperLetter) : 0;
        vowelsMap.set(upperLetter, count + 1);

      } else if (this.consonants.has(upperLetter)) {

        var count = consonantsMap.has(upperLetter) ? consonantsMap.get(upperLetter) : 0;
        consonantsMap.set(upperLetter, count + 1);

      }
    });

    returnVowels ? this.result.set(this.result.size, vowelsMap) : this.result.set(this.result.size, consonantsMap);
    this.resultKeys = Array.from(this.result.keys());
    this.resultKeys.reverse();
  }

/**
 * Method which receives the response from the api and saves the data in a local variable from which
 * the saved result is extracted and presented to the user.
 * 
 * @param response 
 */
  setApiResult(response: any) {

    var responseMap = new Map();

    for (let key in response) {

      if (response.hasOwnProperty(key)) {

        responseMap.set(key, response[key]);
      }
    }

    this.result.set(this.result.size, responseMap);
    this.resultKeys = Array.from(this.result.keys()); 
    this.resultKeys.reverse();
  }


  /**
   * The method receives a key as argument and based on that key extracts data that was returned by the 
   * api or calculated localy. This data is consequently transformed and put in a iterable that can be 
   * iterated by the html component to be displayed to the user.
   * 
   * @param key 
   * @returns 
   */
  getResultText(key: any) {

    var resultTextArray = new Array<String>();

    var resultMap = this.result.get(key);

    resultMap.forEach((value: any, key: any) => {


      resultTextArray.push(key + " : " + value);
    });

    return resultTextArray;
  }

  

  /**
   * Validates the value of the select component from the form input group. This method is needed because
   * simple template driven security methods weren't enought to validate the state if multiple changes of the 
   * value were made.
   * 
   * @param value 
   */
  validateSound(value: any) {

    if (value === 'default') {

      this.soundHasError = true
    } else {

      this.soundHasError = false;
    }

  }


  /**
   * Returns the formControl that contains data inputed in the sentence text area.
   */
  get formControlSequence() {
    return this.analyzerForm.get('formControlSequence');
  }

  /**
   * Returns the formControl that contains data inputed from the radio buttons that represent the application behavior.
   */
  get formControlBahaviour() {
    return this.analyzerForm.get('formControlBahaviour');
  }

  /**
   * Return the formControl that contains data for the select component.
   */
  get formControlSound() {
    return this.analyzerForm.get('formControlSound');
  }
}




