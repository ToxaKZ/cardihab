FROM maven
WORKDIR /usr/src/app
COPY . .

RUN mvn package
EXPOSE 8080
CMD ["java -jar /usr/src/app/target/cardihab-test-0.1.0.jar"]




