# 1단계: 빌드 단계
FROM gradle:8.3-jdk17 AS builder

# 작업 디렉토리 설정
WORKDIR /app

# Gradle 캐시를 활용하기 위해 gradle 관련 파일 먼저 복사
COPY gradle gradle
COPY build.gradle settings.gradle ./

# Gradle 의존성 미리 다운로드
RUN gradle dependencies --no-daemon

# 전체 프로젝트 복사 후 빌드
COPY . .
RUN gradle build -x test --no-daemon

# 2단계: 실행 단계
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# 빌드된 JAR 파일 복사
COPY --from=builder /app/build/libs/*.jar app.jar

# 실행 포트 설정
EXPOSE 8080

# 실행 명령
CMD ["java", "-jar", "app.jar"]
