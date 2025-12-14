# Dockerfile para servicio-usuarios
# Ubicación: Microservicios/servicio-usuarios/Dockerfile

# Etapa 1: Build
FROM maven:3.9.9-amazoncorretto-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Etapa 2: Run
FROM amazoncorretto:21-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]