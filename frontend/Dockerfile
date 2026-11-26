# ===== 1단계: 빌드 (Node) =====
FROM node:lts-alpine AS build
WORKDIR /app

# package 파일과 .npmrc(공개 npm 저장소 설정)만 먼저 복사 → 의존성 캐시 재사용
COPY package*.json .npmrc ./
RUN npm ci

COPY . .
RUN npm run build

# ===== 2단계: 실행 (nginx로 정적 파일 서빙) =====
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
