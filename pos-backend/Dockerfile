# syntax=docker/dockerfile:1

# ---- Build stage ----
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Leverage build cache for dependencies
COPY pom.xml .
RUN --mount=type=cache,target=/root/.m2 mvn -q -e -DskipTests dependency:go-offline

# Copy sources and build
COPY src ./src
RUN --mount=type=cache,target=/root/.m2 mvn -q -e -DskipTests package

# ---- Runtime stage ----
FROM eclipse-temurin:17-jre
WORKDIR /app

# JVM tuning for containers
ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0 -XX:+HeapDumpOnOutOfMemoryError"

# Copy fat jar
COPY --from=build /app/target/*.jar /app/app.jar

# Railway provides PORT. Fall back to 5000 locally.
ENV PORT=5000
EXPOSE 5000

# Ensure Spring Boot binds to the provided PORT
ENTRYPOINT ["sh","-c","java $JAVA_OPTS -Dserver.port=${PORT:-5000} -jar /app/app.jar"]
