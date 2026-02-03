# AWS Lambda & DynamoDB 통합 예제

이 디렉토리는 AWS Lambda 함수와 DynamoDB를 사용하여 데이터를 저장하는 예제입니다.

## 구조

```
lambda/
├── dynamodb-handler/
│   ├── index.js          # Lambda 핸들러 함수
│   └── package.json      # Node.js 의존성
├── serverless.yml        # Serverless Framework 설정
└── README.md            # 이 파일
```

## 사전 요구사항

1. AWS 계정 및 자격 증명 설정
2. Node.js 18.x 이상
3. Serverless Framework 설치

```bash
npm install -g serverless
```

## 설치

1. Lambda 함수 디렉토리로 이동:
```bash
cd lambda/dynamodb-handler
```

2. 의존성 설치:
```bash
npm install
```

## 배포

### Serverless Framework 사용

```bash
# 루트 디렉토리에서
cd lambda
serverless deploy
```

배포가 완료되면 Lambda 함수의 엔드포인트 URL이 출력됩니다. 이 URL을 프론트엔드에서 사용하세요.

### 환경 변수 설정

`.env` 파일을 생성하거나 환경 변수를 직접 설정할 수 있습니다:

```bash
export AWS_ACCESS_KEY_ID=your_access_key
export AWS_SECRET_ACCESS_KEY=your_secret_key
export AWS_REGION=ap-northeast-2
```

## 로컬 테스트

Serverless Offline을 사용하여 로컬에서 테스트할 수 있습니다:

```bash
cd lambda
serverless offline
```

로컬 엔드포인트: `http://localhost:3000/api`

## API 사용법

### 데이터 저장

```bash
curl -X POST https://your-lambda-url.amazonaws.com/api \
  -H "Content-Type: application/json" \
  -d '{
    "action": "saveData",
    "data": {
      "name": "홍길동",
      "email": "hong@example.com",
      "message": "안녕하세요!"
    }
  }'
```

### 데이터 조회

```bash
curl -X POST https://your-lambda-url.amazonaws.com/api \
  -H "Content-Type: application/json" \
  -d '{
    "action": "getData",
    "data": {
      "id": "your-item-id"
    }
  }'
```

## DynamoDB 테이블 구조

테이블은 자동으로 생성되며, 다음과 같은 구조를 가집니다:

- **Primary Key**: `id` (String)
- **Attributes**:
  - `name` (String)
  - `email` (String)
  - `message` (String)
  - `timestamp` (String)
  - `createdAt` (String)

## 프론트엔드 연동

Gatsby 프로젝트의 `.env.development` 또는 `.env.production` 파일에 Lambda 엔드포인트를 추가하세요:

```env
GATSBY_LAMBDA_ENDPOINT=https://your-lambda-url.amazonaws.com/api
```

그런 다음 `/lambda-example` 페이지에서 테스트할 수 있습니다.

## IAM 권한

Lambda 함수는 다음 DynamoDB 권한이 필요합니다:

- `dynamodb:PutItem`
- `dynamodb:GetItem`
- `dynamodb:UpdateItem`
- `dynamodb:DeleteItem`
- `dynamodb:Query`
- `dynamodb:Scan`

이 권한들은 `serverless.yml`에 이미 설정되어 있습니다.

## 문제 해결

### CORS 에러

프로덕션 환경에서는 `index.js`의 CORS 헤더를 특정 도메인으로 제한하세요:

```javascript
const headers = {
  "Access-Control-Allow-Origin": "https://yourdomain.com",
  // ...
}
```

### DynamoDB 테이블이 생성되지 않음

`serverless.yml`의 리전 설정을 확인하고, AWS 자격 증명이 올바른지 확인하세요.

### Lambda 함수 타임아웃

기본 타임아웃은 6초입니다. 필요시 `serverless.yml`에서 조정:

```yaml
functions:
  handler:
    timeout: 30
```


