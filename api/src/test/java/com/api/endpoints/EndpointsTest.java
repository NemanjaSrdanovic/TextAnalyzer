package com.api.endpoints;

import static org.junit.Assert.assertTrue;

import java.util.HashMap;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import com.api.services.AnalyzerService;

/**
 * Testing endpoint functionalities.
 * 
 * @author Nemanja Srdanovic
 * @version 1.0
 * @since 4 Jan 2022
 *
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class EndpointsTest {

	@MockBean
	private AnalyzerService analyzerService;

	@Autowired
	private Endpoints endpoints;

	/**
	 * Testing if the logic catches cases in which the endpoint receives null values
	 * (%00) oder the decoding of input is not correctly executed. If so the logic
	 * should return a HttpStatus which indicates that the input was wrong.
	 */
	@Test
	public void mockInputArgumentForEndpoint_InputArgumentNull_Returns400BadRequest() {

		ResponseEntity<?> response = endpoints.getVowels(null);

		assertTrue(HttpStatus.BAD_REQUEST.equals(response.getStatusCode()));
	}

	/**
	 * Testing if the endpoints methods correctly forwards the input to the service
	 * which analyse the input and return the result. If so the logic should return
	 * a HttpStatus which indicates that the request was processed correctly and the
	 * entity contains the result.
	 */
	@Test
	public void mockInputArgumentForEndpoint_InputArgumentNotNull_Returns200OK() {

		Mockito.when(analyzerService.getLetters(Mockito.anyBoolean(), Mockito.anyString())).thenReturn(new HashMap<>());

		ResponseEntity<?> response = endpoints.getVowels("Abcd");

		assertTrue(HttpStatus.OK.equals(response.getStatusCode()));

	}

}
