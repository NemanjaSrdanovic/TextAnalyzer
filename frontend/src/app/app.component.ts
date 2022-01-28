
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
 * 
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
  }

/**
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
  }

  /**
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
   * 
   * @param map 
   * @returns 
   */
  getMapKeys(map: Map<Number, Map<String, Number>>) {

    return map.keys();
  }

  /**
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

  get formControlSequence() {
    return this.analyzerForm.get('formControlSequence');
  }

  get formControlBahaviour() {
    return this.analyzerForm.get('formControlBahaviour');
  }

  get formControlSound() {
    return this.analyzerForm.get('formControlSound');
  }
}




