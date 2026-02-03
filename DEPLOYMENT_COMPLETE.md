# 배포 완료 가이드

## ✅ Lambda 함수 배포 완료

Lambda 함수가 성공적으로 배포되었습니다!

- **Lambda ARN**: `arn:aws:lambda:ap-northeast-2:ACCOUNT_ID:function:dynamodb-handler-prod-handler`
- **API Gateway 엔드포인트**: `https://xxxxx.execute-api.ap-northeast-2.amazonaws.com/prod/api`

## 다음 단계

### 1. GitHub Secrets에 엔드포인트 추가

1. GitHub Repository → **Settings** → **Secrets and variables** → **Actions**
2. **New repository secret** 클릭
3. 다음 정보 입력:
   - **Name**: `GATSBY_LAMBDA_ENDPOINT`
   - **Value**: `https://xxxxx.execute-api.ap-northeast-2.amazonaws.com/prod/api`
4. **Add secret** 클릭

### 2. Gatsby 사이트 재배포

GitHub Actions가 자동으로 재배포하거나, 수동으로 트리거:

1. **Actions** 탭으로 이동
2. **Deploy Gatsby to GitHub Pages** 워크플로우 선택
3. **Run workflow** 클릭
4. 배포 완료 대기

### 3. 테스트

배포 완료 후:
1. GitHub Pages 사이트 접속 (예: `https://yourusername.github.io/wwbrdle.github.io/`)
2. `/lambda-example` 페이지로 이동
3. 폼을 작성하고 제출
4. DynamoDB에 데이터가 저장되는지 확인

## 확인 방법

### DynamoDB 데이터 확인

AWS 콘솔에서:
1. DynamoDB → Tables
2. `dynamodb-handler-prod` 테이블 선택
3. **Explore table items** 클릭
4. 저장된 데이터 확인

### Lambda 함수 로그 확인

AWS 콘솔에서:
1. CloudWatch → Logs → Log groups
2. `/aws/lambda/dynamodb-handler-prod-handler` 선택
3. 최근 로그 스트림 확인

## 문제 해결

### CORS 에러가 발생하는 경우

Lambda 함수의 CORS 헤더를 확인하세요. `lambda/dynamodb-handler/index.js`에서:
```javascript
const headers = {
  "Access-Control-Allow-Origin": "*", // 프로덕션에서는 특정 도메인으로 제한
  // ...
}
```

프로덕션에서는 `*` 대신 실제 도메인을 지정하는 것이 좋습니다:
```javascript
"Access-Control-Allow-Origin": "https://yourusername.github.io"
```

### 엔드포인트가 작동하지 않는 경우

1. API Gateway에서 CORS 설정 확인
2. Lambda 함수의 로그 확인
3. 브라우저 개발자 도구의 Network 탭에서 에러 확인

## 완료 체크리스트

- [x] Lambda 함수 배포 완료
- [x] API Gateway 엔드포인트 확인
- [ ] GitHub Secrets에 `GATSBY_LAMBDA_ENDPOINT` 추가
- [ ] Gatsby 사이트 재배포
- [ ] `/lambda-example` 페이지 테스트
- [ ] DynamoDB에 데이터 저장 확인


