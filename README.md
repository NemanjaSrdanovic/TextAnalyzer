# TextAnalyzer
## Demo project

Implement an Angular application that supports following requirements:<br/>
•	a user can enter a text and start the analysis with the press of a button <br/>
•	the logic provided in the Text Analyzer java class (see attachment) is to be reused for the java script text analysis; the code should also be refactored to be in a "good enough" state <br/>
•	write a test(s) that checks the output of the text analyzer logic <br/>
•	the content of the analysis is displayed as a human readable output in the UI. An existing (previous) output should remain visible <br/>
•	implement a toggle switch that changes the application behavior between online and offline functionality in this way:<br/>
	o	Offline: The application uses its own implementation of the "Text Analyzer" to analyze the user input<br/>
	o	Online: The application uses the REST API of the server to analyze the user input<br/>
 
Backend part:<br/>
A backend part should be a Java server app with a RESTful API interface (Spring Boot is allowed)  that would provide functionality of the Text Analyzer.<br/>
The Text Analyzer should also be refactored to be in a "good enough" state. <br/>
This basically means two things:<br/>
•	A developer should not be ashamed to give his code to a colleague for a code review<br/>
•	A company should not be afraid to sell this piece of software to another company <br/>




## Project technology

**Programming Language**: Java, JavaScript <br/>
**Framework**: Angular, Spring Boot <br/>
**Programming interface**: RESTful API <br/>
**Build tool**: Maven <br/>
**Containerization**: Docker <br/>
**Securing the source code**: GitHub <br/>
