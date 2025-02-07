# 1단계: 빌드 단계
FROM node:20-alpine AS builder

# 작업 디렉토리 생성
WORKDIR /app

# 빌드에 필요한 패키지 설치
RUN apk add --no-cache python3 make g++

# package.json, package-lock.json 복사 후 의존성 설치
COPY package*.json ./
RUN npm install  # <-- `--production` 제거

# 전체 소스 코드 복사
COPY . .

# NestJS 애플리케이션 빌드
RUN npm run build

# 2단계: 실제 실행 이미지
FROM node:20-alpine

WORKDIR /app

# 빌드된 결과물만 복사
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# 프로덕션 의존성 설치
RUN npm install --production

# 환경변수 설정
ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["npm", "run", "start:prod"]
