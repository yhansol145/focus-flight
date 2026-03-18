# focus-flight
몰입형 심층 업무를 향한 당신의 여정

## 프로젝트 구조

NestJS + React 모노레포 (클린 아키텍처)

```
focus-flight/
├── backend/                          # NestJS
│   └── src/
│       ├── modules/
│       │   └── [module]/
│       │       ├── presentation/     # Controller (HTTP 진입점)
│       │       ├── application/      # Use Case + DTO
│       │       │   ├── use-cases/
│       │       │   └── dto/
│       │       ├── domain/           # Entity + Repository Interface
│       │       │   ├── entities/
│       │       │   └── repositories/
│       │       └── infrastructure/   # Repository 구현체 + 외부 서비스
│       └── common/                   # 공통 필터/가드/인터셉터/데코레이터
│
└── frontend/                         # React + Vite
    └── src/
        ├── pages/                    # 라우트 단위 페이지
        ├── features/
        │   └── [feature]/
        │       ├── presentation/     # Component + Hook
        │       ├── application/      # Use Case (비즈니스 로직)
        │       └── domain/           # Entity + Repository Interface
        └── shared/                   # 공통 API 클라이언트, 컴포넌트, 훅, 유틸
```

## 레이어 의존 방향

```
presentation → application → domain ← infrastructure
```

## 실행

```bash
npm install
npm run dev          # 백엔드 + 프론트 동시 실행
npm run dev:backend  # 백엔드만
npm run dev:frontend # 프론트만
```
