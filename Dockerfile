# 1단계: 빌드 단계
FROM node:20-alpine AS builder

# 작업 디렉토리 생성
WORKDIR /app

# package.json, package-lock.json 복사 후 의존성 설치
COPY package*.json ./
RUN npm install --production

# 전체 소스 코드 복사
COPY . .

# NestJS 애플리케이션 빌드 (보통 npm run build 명령어가 빌드 스크립트로 정의되어 있음)
RUN npm run build

# 2단계: 실제 실행 이미지
FROM node:20-alpine

WORKDIR /app

# 빌드 결과물와 package.json 파일만 복사
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# 프로덕션용 의존성 설치 (빌드 결과에 필요한 최소 의존성)
RUN npm install --production

# 환경변수 설정 (필요한 경우)
ENV NODE_ENV=production
ENV PORT=8080

# 애플리케이션이 사용하는 포트를 노출 (여기서는 8080)
EXPOSE 8080

# 애플리케이션 실행 (NestJS에서 start:prod 스크립트가 production 모드에서 서버를 시작)
CMD ["npm", "run", "start:prod"]