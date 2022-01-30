#java 11
FROM adoptopenjdk/openjdk11:ubi

WORKDIR /usr/app

COPY ./api.jar /usr/app/

ENTRYPOINT ["java","-jar", "-Dserver.port=8000","api.jar"]

