package com.api.services;

import java.util.HashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.api.constraints.Constraints;

/**
 * Service containing methods that are called by the endpoints to analyse text.
 * 
 * @author Nemanja Srdanovic
 * @version 1.0
 * @since 4 Jan 2022
 *
 */
@Service
public class AnalyzerService {

	private static Logger logger = LoggerFactory.getLogger(AnalyzerService.class);

	/**
	 * Method which receives the sentence to be analysed and a condition variable
	 * that signals if all the vowels or all the consonants from the sentence should
	 * be returned.
	 * 
	 * When the variable signals true all the vowels are been returned or all
	 * consonants if false is signalled. This is made clear by the method argument
	 * designation. The result is returned as a hashmap where the vowel/consonant
	 * letter is the key in the map and the number this letter is repeated is the
	 * value for that key.
	 * 
	 * @param returnVowels  Boolean variable
	 * @param inputSentence Text which will be analysed to extract the number of
	 *                      vowels in the sentence.
	 * @return HashMap
	 */
	public HashMap<Character, Integer> getLetters(Boolean returnVowels, String inputSentence) {

		char[] chars = inputSentence.toCharArray();
		HashMap<Character, Integer> vowels = new HashMap<>();
		HashMap<Character, Integer> consonants = new HashMap<>();
		int count;

		for (char letter : chars) {

			char upperLetter = Character.toUpperCase(letter);

			if (Constraints.VOWELS.contains(upperLetter)) {

				count = vowels.containsKey(upperLetter) ? vowels.get(upperLetter) : 0;
				vowels.put(upperLetter, count + 1);

			} else if (Constraints.CONSONANT.contains(upperLetter)) {

				count = consonants.containsKey(upperLetter) ? consonants.get(upperLetter) : 0;
				consonants.put(upperLetter, count + 1);
			}
		}

		return returnVowels ? vowels : consonants;
	}

}
