# AWS IAM 권한 설정 가이드

## 문제

Serverless Framework 배포 시 다음 권한이 필요합니다:

- `logs:TagResource` - CloudWatch Logs에 태그 추가
- `cloudformation:*` - CloudFormation 스택 관리
- `lambda:*` - Lambda 함수 관리
- `apigateway:*` - API Gateway 관리
- `dynamodb:*` - DynamoDB 테이블 관리
- `iam:*` (역할 관련) - Lambda 실행 역할 생성
- `s3:*` (배포 버킷 관련) - 배포 패키지 저장
- `logs:*` - CloudWatch Logs 관리

## 해결 방법

### 방법 1: 완전한 정책 사용 (권장)

1. AWS 콘솔 → IAM → Policies → Create policy
2. JSON 탭 선택
3. `AWS_IAM_POLICY.json` 파일의 내용을 복사하여 붙여넣기
4. Policy name: `ServerlessFrameworkDeploymentPolicy`
5. Create policy 클릭
6. IAM → Users → `brad` 선택
7. "Add permissions" → "Attach policies directly"
8. `ServerlessFrameworkDeploymentPolicy` 선택 후 추가

### 방법 2: 관리자 권한 임시 부여 (빠른 테스트용)

1. IAM → Users → `brad` 선택
2. "Add permissions" → "Attach policies directly"
3. `AdministratorAccess` 정책 선택
4. Add permissions 클릭

⚠️ **주의**: 프로덕션 환경에서는 최소 권한 원칙을 따르세요.

### 방법 3: 필요한 권한만 추가

현재 에러를 해결하려면 최소한 다음 권한이 필요합니다:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:TagResource",
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "cloudformation:*",
        "lambda:*",
        "apigateway:*",
        "dynamodb:*",
        "iam:CreateRole",
        "iam:AttachRolePolicy",
        "iam:PutRolePolicy",
        "iam:GetRole",
        "iam:DeleteRole",
        "iam:PassRole",
        "s3:CreateBucket",
        "s3:ListBucket",
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": "*"
    }
  ]
}
```

## 권한 추가 후

1. GitHub Actions를 다시 실행하세요
2. 또는 로컬에서 테스트:
   ```bash
   cd lambda
   serverless deploy --stage prod
   ```

## 확인 방법

권한이 올바르게 설정되었는지 확인:

```bash
aws sts get-caller-identity
aws iam list-attached-user-policies --user-name brad
```

## 문제 해결

### 여전히 권한 오류가 발생하는 경우

1. IAM 변경사항이 전파되는 데 몇 분 걸릴 수 있습니다
2. AWS 콘솔에서 IAM 사용자의 정책이 올바르게 연결되었는지 확인
3. CloudFormation 스택을 삭제하고 다시 배포:
   ```bash
   cd lambda
   serverless remove --stage prod
   serverless deploy --stage prod
   ```


