# GitHub Actions 워크플로우

이 디렉토리에는 GitHub Actions 워크플로우 파일이 있습니다.

## 워크플로우 파일

### 1. `deploy-lambda.yml`
Lambda 함수를 AWS에 자동 배포합니다.

**트리거:**
- `lambda/` 디렉토리 변경 시
- 수동 실행 가능

**필요한 GitHub Secrets:**
- `AWS_ACCESS_KEY_ID`: AWS 액세스 키 ID
- `AWS_SECRET_ACCESS_KEY`: AWS 시크릿 액세스 키
- `AWS_REGION`: AWS 리전 (기본값: us-east-1)

### 2. `deploy-gatsby.yml`
Gatsby 사이트를 GitHub Pages에 자동 배포합니다.

**트리거:**
- `lambda/` 디렉토리 외의 변경 시
- 수동 실행 가능

**필요한 GitHub Secrets:**
- `GATSBY_LAMBDA_ENDPOINT`: Lambda 함수 엔드포인트 URL (선택사항)
- `CNAME`: 커스텀 도메인 (선택사항)

## 설정 방법

### 1. GitHub Secrets 설정

Repository → Settings → Secrets and variables → Actions → New repository secret

다음 Secrets를 추가하세요:

```
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
AWS_REGION=us-east-1
GATSBY_LAMBDA_ENDPOINT=https://your-lambda-url.execute-api.us-east-1.amazonaws.com/prod/api
```

### 2. Lambda 함수 배포

1. `lambda/` 디렉토리에 변경사항을 커밋하고 푸시
2. GitHub Actions가 자동으로 Lambda 함수를 배포
3. 배포 완료 후 출력된 엔드포인트 URL을 복사
4. `GATSBY_LAMBDA_ENDPOINT` Secret에 추가

### 3. Gatsby 사이트 배포

1. 프론트엔드 코드 변경사항을 커밋하고 푸시
2. GitHub Actions가 자동으로 빌드하고 GitHub Pages에 배포

## 워크플로우 실행 확인

1. Repository → Actions 탭으로 이동
2. 실행 중인 워크플로우 확인
3. 각 단계의 로그 확인

## 문제 해결

### Lambda 배포 실패
- AWS 자격 증명이 올바른지 확인
- IAM 권한이 충분한지 확인 (Lambda, DynamoDB, CloudFormation 권한 필요)

### Gatsby 빌드 실패
- 환경 변수가 올바르게 설정되었는지 확인
- `npm ci`가 실패하면 `package-lock.json` 확인

