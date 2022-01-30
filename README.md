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


# How to run:

1. install Docker, run the Docker Daemon, make sure you are logged in with your Docker-ID and that Docker is running properly.
2. clone this repo and navigate into any one of the projects.
3. run command:

```
docker-compose up --build
```
"Compose" is a tool for defining and running multi-container Docker applications.

It will run the services defined in docker-compose.yml in an isolated environment.

"up" starts and runs your entire app.

"--build" tells Docker it first has to build the images from your application. The instructions how to build the image are located in the Dockerfile's inside their respective folders.


4. navigate to:
```
localhost:8001
```

5. To stop the running containers simply "CTRL-C" and run:
```
docker-compose down
```
to tell Docker to remove the containers we've created in #3 that are defined in docker-compose.yml.


## Project technology

**Programming Language**: Java, JavaScript <br/>
**Framework**: Angular, Spring Boot <br/>
**Programming interface**: RESTful API <br/>
**Build tool**: Maven <br/>
**Containerization**: Docker <br/>
**Securing the source code**: GitHub <br/>
