# Wanted BE Internship

## Description

- 사용 스택: node.js / Sequelizer / sqlite3

## Todo

- [x] 채용공고를 등록합니다.
- [x] 채용공고를 수정합니다.(회사id 이외 모두 수정 가능)
- [x] 채용공고를 삭제합니다.(DB에서 삭제됨)
- [x] 채용공고 목록을 가져옵니다.
  - [x] 채용공고 목록 가져오기
  - [x] (선택사항) 채용공고 검색 기능 구현
- [x] 채용 상세 페이지를 가져옵니다.
  - [x] "채용내용"이 추가적으로 담겨있습니다.
  - [x] (선택사항) 해당 회사가 올린 다른 채용공고가 추가적으로 포함됩니다.
- [ ] (선택사항) 사용자는 채용 공고에 지원합니다.
  - [ ] 사용자는 1회만 지원 가능합니다.

## Caution

- 위 예시 데이터는 구현의 편의를 위해 제공되는 정보이며, 요구사항(의도)을 만족시킨다면 다른 형태의 요청 및 리스폰스를 사용하여도 좋습니다.

- 필요한 모델: 회사, 사용자, 채용공고, 지원내역(선택사항)
  (이외 추가 모델정의는 자유입니다.)

- 위 제공된 필드명은 예시이며, 임의로 생성 가능합니다.

- 회사, 사용자 등록 절차는 생략합니다.
  (DB에 임의로 생성하여 진행)

- 로그인 등 사용자 인증절차(토큰 등)는 생략합니다.

- Frontend 요소(html, css, js 등)는 개발 범위에 제외됩니다.
  (구현시 불이익은 없지만, 평가에 이점 또한 없습니다.)

- 명시되지 않은 조건또한 자유롭게 개발 가능합니다.

- Repository 명은 “wanted-pre-onboarding-backend” 으로 생성 합니다.

- Github Repository 주소를 제출해주세요.

## 필수 기술요건

- ORM 사용하여 구현.
- RDBMS 사용 (SQLite, PostgreSQL,MySql 등).

## 채점기준

1. 기능 구현 여부 (40%)

   - 요구된 기능의 구현 여부
   - 추가 기능의 구현 및 완성도

2. 코드 품질 (30%)

   - 코드의 가독성 및 일관성
   - 주석 및 문서화(README)의 적절성
   - git commit 컨벤션(=규칙)의 준수
   - 예외 처리 및 에러 핸들링

3. 테스트 및 검증 (20%)

   - 유닛 테스트 여부
   - 테스트 커버리지 및 테스트의 철저성

4. 프로젝트 구조 및 설계 (10%)
   - 디렉토리 구조의 논리적 배치
   - 디자인 패턴의 적절한 사용

# Recruitment Service

This is a simple recruitment service API built with Node.js and Express.js. It allows companies to post job listings and users to view and apply for jobs.

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/recruitment-service.git
   cd recruitment-service
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm start
   ```

## Endpoints

- **POST /api/jobs**: Create a new job listing.
- **PUT /api/jobs/:jobId**: Update an existing job listing.
- **DELETE /api/jobs/:jobId**: Delete a job listing.
- **GET /api/jobs**: Get a list of job listings.
- **GET /api/jobs/:jobId**: Get details of a specific job listing.

## Example JSON Requests

### Create Job

```json
{
  "companyId": 1,
  "position": "Backend Developer",
  "reward": 1000000,
  "description": "Looking for a backend developer skilled in Node.js",
  "skills": "Node.js"
}
```

### Update Job

```json
{
  "position": "Senior Backend Developer",
  "reward": 1500000,
  "description": "Looking for a senior backend developer skilled in Node.js and Express.js",
  "skills": "Node.js, Express.js"
}
```
