# ===== 1단계: 빌드 (JDK + Gradle) =====
# JAVA_VERSION은 build.gradle의 JavaLanguageVersion.of(..) 숫자와 맞추세요 (21 또는 25)
ARG JAVA_VERSION=21
FROM eclipse-temurin:${JAVA_VERSION}-jdk AS build
WORKDIR /app

# 의존성 설정 파일만 먼저 복사 → 소스만 바뀌면 의존성 다운로드 단계는 캐시 재사용
COPY gradlew settings.gradle build.gradle ./
COPY gradle gradle
# Windows에서 생긴 CRLF 줄바꿈 제거 + 실행 권한
RUN sed -i 's/\r$//' gradlew && chmod +x gradlew
RUN ./gradlew dependencies --no-daemon > /dev/null 2>&1 || true

COPY src src
RUN ./gradlew bootJar --no-daemon -x test

# ===== 2단계: 실행 (JRE만, 이미지 크기 줄이기) =====
ARG JAVA_VERSION=21
FROM eclipse-temurin:${JAVA_VERSION}-jre
WORKDIR /app

# root가 아닌 사용자로 실행
RUN groupadd --system --gid 1001 app \
 && useradd --system --uid 1001 --gid 1001 --create-home app
USER 1001:1001

COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
