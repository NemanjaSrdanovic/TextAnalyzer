package com.api.constraints;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

/**
 * All constant values needed for the api processes.
 * 
 * @author Nemanja Srdanovic
 * @version 1.0
 * @since 4 Jan 2022
 *
 */
public class Constraints {

	public static final Set<Character> VOWELS = new HashSet<>(Arrays.asList('A', 'E', 'I', 'O', 'U'));

	public static final Set<Character> CONSONANT = new HashSet<>(Arrays.asList('B', 'C', 'D', 'F', 'G', 'H', 'J', 'K',
			'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'));
}
