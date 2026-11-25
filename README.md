# deal-flow

투자·대출 딜을 등록하고, 승인 흐름(작성중 → 승인요청 → 승인/반려 → 약정완료)을 거쳐 약정까지 관리하는 사내 시스템입니다.

## 기술 스택

| 영역 | 스택                                                 |
|---|----------------------------------------------------|
| Frontend | React, TypeScript, Vite                            |
| Backend | Spring Boot 3, JPA, MySQL 8                        |
| Infra | Docker, Docker Compose, Kubernetes, GitHub Actions |

## 폴더 구조

```
deal-flow/
├── backend/        # Spring Boot API 서버
├── frontend/       # Vue 3 + TS 웹 화면
├── infra/
│   ├── docker/     # docker-compose.yml
│   └── k8s/        # Kubernetes 매니페스트
├── docs/           # 화면설계, ERD, API 명세
├── .env.example    # 환경 변수 예시
└── README.md
```

## 로컬 실행

```bash
cp .env.example .env          # 값 채우기
docker compose -f infra/docker/docker-compose.yml --env-file .env up -d   # DB 실행
```

## 진행 상황

- [ ] 저장소, 로컬 DB 환경
- [ ] 빈 백엔드/프론트 + health 체크
- [ ] Dockerfile, 전체 compose 실행
- [ ] GitHub Actions CI
- [ ] 로컬 Kubernetes 배포
- [ ] 거래상대방 관리 (첫 기능)

## 문서

- 화면 설계: `docs/`
