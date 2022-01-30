package com.api.endpoints;

import java.util.HashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.services.AnalyzerService;

/**
 * Contains all endpoints that can be called by clients in order to save or
 * return data.
 * 
 * @author Nemanja Srdanovic
 * @version 1.0
 * @since 4 Jan 2022
 *
 */

@RestController
@RequestMapping("/api")
public class Endpoints {

	private static Logger logger = LoggerFactory.getLogger(Endpoints.class);

	@Autowired
	AnalyzerService analyzerService;

	/**
	 * Returns all vowel letters and the the number of time they appear in the hand
	 * over sentence.
	 * 
	 * The response in JSON format is embedded in the ResponseEntity which also
	 * contains the appropriate status code issued by a the api in response to a
	 * client's request made to the api.
	 * 
	 * @param inputSentence Text which will be analysed to extract the number of
	 *                      vowels in the sentence.
	 * @return ResponseEntity
	 */
	@CrossOrigin
	@RequestMapping(value = "/getVowels/sentence={inputSentence}")
	public ResponseEntity getVowels(@PathVariable String inputSentence) {

		if (inputSentence == null) {

			return new ResponseEntity<>("BAD REQUEST", HttpStatus.BAD_REQUEST);

		} else {
			return new ResponseEntity<HashMap<Character, Integer>>(analyzerService.getLetters(true, inputSentence),
					HttpStatus.OK);

		}
	}

	/**
	 * Returns all consonant letters and the the number of time they appear in the
	 * hand over sentence.
	 * 
	 * The response in JSON format is embedded in the ResponseEntity which also
	 * contains the appropriate status code issued by a the api in response to a
	 * client's request made to the api.
	 * 
	 * @param inputSentence Text which will be analysed to extract the number of
	 *                      vowels in the sentence.
	 * @return ResponseEntity
	 */
	@CrossOrigin
	@RequestMapping(value = "/getConsonants/sentence={inputSentence}")
	public ResponseEntity getConsonants(@PathVariable String inputSentence) {

		if (inputSentence == null) {

			return new ResponseEntity<>("BAD REQUEST", HttpStatus.BAD_REQUEST);

		} else {

			return new ResponseEntity<HashMap<Character, Integer>>(analyzerService.getLetters(false, inputSentence),
					HttpStatus.OK);

		}
	}
}
