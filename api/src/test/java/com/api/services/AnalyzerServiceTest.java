package com.api.services;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.HashMap;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

/**
 * Testing analyzerService functionalities.
 * 
 * @author Nemanja Srdanovic
 * @version 1.0
 * @since 4 Jan 2022
 *
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class AnalyzerServiceTest {

	@Autowired
	private AnalyzerService analyzerService;

	/**
	 * Testing if the method returns only vowels with the correct count of the
	 * indicated vowel when the method is called with a condition value that
	 * activates that case. The result should only contain letters that are vowels
	 * and not special cases or consonants.
	 */
	@Test
	public void mockInputSentence_VowelsTrue_ReturnedHashMapContainsOnlyVowelsAndCorrectValues() {

		String inputSentence = "A/GE*KU54cH?";
		HashMap<Character, Integer> result = analyzerService.getLetters(true, inputSentence);

		assertFalse(result.equals(null));
		assertTrue(result.containsKey('A') && result.get('A').equals(1));
		assertTrue(result.containsKey('E') && result.get('E').equals(1));
		assertTrue(result.containsKey('U') && result.get('U').equals(1));
		assertFalse(result.containsKey('H'));
		assertFalse(result.containsKey('*'));
	}

	/**
	 * Testing if the method returns only consonants with the correct count of the
	 * indicated consonant when the method is called with a condition value that
	 * activates that case.The result should only contain letters that are
	 * consonants and not special cases or vowels.
	 */
	@Test
	public void mockInputSentence_VowelsFalse_ReturnedHashMapContainsOnlyConsonantsAndCorrectValues() {

		String inputSentence = "A/GE*KU54hH?";
		HashMap<Character, Integer> result = analyzerService.getLetters(false, inputSentence);

		assertFalse(result.equals(null));
		assertTrue(result.containsKey('G') && result.get('G').equals(1));
		assertTrue(result.containsKey('K') && result.get('K').equals(1));
		assertTrue(result.containsKey('H') && result.get('H').equals(2));
		assertFalse(result.containsKey('A'));
		assertFalse(result.containsKey('/'));

	}

	/**
	 * Testing if the method returns a result that does not contain any letters if
	 * the input does not contain letters.
	 */
	@Test
	public void mockInputSentence_sentenceOnlyContainsSpecialCharacters_ReturnedEmptyHashMap() {

		String inputSentence = "/*?";
		HashMap<Character, Integer> result = analyzerService.getLetters(false, inputSentence);

		assertFalse(result.equals(null));
		assertFalse(result.containsKey('?'));
		assertFalse(result.containsKey('*'));
		assertFalse(result.containsKey('/'));
		assertTrue(result.size() == 0);

	}

}
