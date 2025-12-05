# AWS Lambda & DynamoDB 통합 가이드

이 가이드는 Gatsby 프로젝트에서 AWS Lambda와 DynamoDB를 사용하는 방법을 설명합니다.

## 개요

이 예제는 다음과 같은 구조로 구성되어 있습니다:

1. **프론트엔드** (`src/pages/lambda-example.js`): Lambda 함수를 호출하는 React 컴포넌트
2. **Lambda 함수** (`lambda/dynamodb-handler/index.js`): DynamoDB에 데이터를 저장하는 서버리스 함수
3. **배포 설정** (`lambda/serverless.yml`): Serverless Framework를 사용한 배포 설정

## 단계별 설정

### 1. AWS 계정 설정

1. AWS 계정에 로그인
2. IAM에서 사용자 생성 및 권한 부여:
   - `AWSLambda_FullAccess`
   - `AmazonDynamoDBFullAccess`
   - `IAMFullAccess` (Serverless Framework가 필요)

### 2. AWS CLI 설정

```bash
aws configure
```

다음 정보를 입력:
- AWS Access Key ID
- AWS Secret Access Key
- Default region: `ap-northeast-2` (서울)
- Default output format: `json`

### 3. Serverless Framework 설치

```bash
npm install -g serverless
```

### 4. Lambda 함수 배포

```bash
cd lambda/dynamodb-handler
npm install
cd ..
serverless deploy
```

배포가 완료되면 다음과 같은 출력을 볼 수 있습니다:

```
endpoints:
  POST - https://xxxxx.execute-api.ap-northeast-2.amazonaws.com/dev/api
```

이 URL을 복사하세요.

### 5. 프론트엔드 환경 변수 설정

프로젝트 루트에 `.env.development` 파일 생성:

```env
GATSBY_LAMBDA_ENDPOINT=https://xxxxx.execute-api.ap-northeast-2.amazonaws.com/dev/api
```

프로덕션용 `.env.production` 파일도 동일하게 생성하세요.

### 6. Gatsby 개발 서버 재시작

환경 변수를 변경한 후에는 개발 서버를 재시작해야 합니다:

```bash
npm run clean
npm run dev
```

### 7. 테스트

브라우저에서 `http://localhost:8000/lambda-example`로 이동하여 폼을 제출해보세요.

## 대안: AWS SAM 사용

Serverless Framework 대신 AWS SAM을 사용할 수도 있습니다. `lambda/sam-template.yaml` 파일을 참조하세요.

## 비용

- **Lambda**: 월 100만 요청까지 무료
- **DynamoDB**: 월 25GB 저장소 및 200만 읽기/쓰기 단위까지 무료

자세한 내용은 [AWS 프리 티어](https://aws.amazon.com/ko/free/)를 참조하세요.

## 보안 고려사항

1. **CORS 설정**: 프로덕션에서는 특정 도메인만 허용
2. **API 키**: 필요시 API Gateway에서 API 키 사용
3. **환경 변수**: 민감한 정보는 AWS Systems Manager Parameter Store 사용
4. **IAM 역할**: 최소 권한 원칙 적용

## 문제 해결

### "Access Denied" 에러

IAM 권한을 확인하세요. Lambda 함수에 DynamoDB 접근 권한이 필요합니다.

### CORS 에러

브라우저 콘솔에서 CORS 에러가 발생하면:
1. Lambda 함수의 CORS 헤더 확인
2. API Gateway의 CORS 설정 확인

### DynamoDB 테이블이 보이지 않음

AWS 콘솔에서 DynamoDB 서비스로 이동하여 테이블이 생성되었는지 확인하세요.

## 추가 리소스

- [AWS Lambda 문서](https://docs.aws.amazon.com/lambda/)
- [DynamoDB 문서](https://docs.aws.amazon.com/dynamodb/)
- [Serverless Framework 문서](https://www.serverless.com/framework/docs)
- [Gatsby 환경 변수](https://www.gatsbyjs.com/docs/how-to/local-development/environment-variables/)

