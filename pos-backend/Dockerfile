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

# JVM tuning for containers (optimized for Render free tier - 512MB limit)
ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=60.0 -XX:+HeapDumpOnOutOfMemoryError -XX:+UseG1GC -XX:MaxGCPauseMillis=200 -XX:+UseStringDeduplication -XX:+OptimizeStringConcat"

# Copy fat jar
COPY --from=build /app/target/*.jar /app/app.jar

# Render provides PORT environment variable. Fall back to 10000 for Render's default.
ENV PORT=10000
EXPOSE 10000

# Health check for faster startup detection
HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:${PORT}/actuator/health || exit 1

# Ensure Spring Boot binds to the provided PORT
ENTRYPOINT ["sh","-c","java $JAVA_OPTS -Dserver.port=${PORT:-10000} -jar /app/app.jar"]
