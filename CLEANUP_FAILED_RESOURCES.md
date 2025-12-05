# 실패한 리소스 정리 가이드

## 문제

이전 배포 실패로 인해 CloudWatch Logs 그룹이 남아있어서 삭제 권한이 필요합니다.

## 해결 방법

### 방법 1: AWS 콘솔에서 수동 삭제 (가장 빠름)

1. AWS 콘솔 → CloudWatch → Logs → Log groups
2. 다음 LogGroup 찾기:
   - `/aws/lambda/dynamodb-handler-prod-handler`
3. LogGroup 선택 → Actions → Delete log group(s)
4. 확인 후 삭제

### 방법 2: AWS CLI로 삭제

```bash
aws logs delete-log-group --log-group-name /aws/lambda/dynamodb-handler-prod-handler --region us-east-1
```

### 방법 3: IAM 권한 추가 후 재배포

IAM 사용자에 다음 권한 추가:
- `logs:DeleteLogGroup`
- `logs:DeleteLogStream`

그런 다음 GitHub Actions를 다시 실행하면 자동으로 정리됩니다.

## IAM 권한 업데이트

`AWS_IAM_POLICY.json` 파일이 이미 업데이트되었습니다. 이 정책을 IAM 사용자에 다시 적용하세요:

1. AWS 콘솔 → IAM → Policies
2. `ServerlessFrameworkDeploymentPolicy` 선택 (또는 새로 생성)
3. JSON 탭에서 `AWS_IAM_POLICY.json` 내용으로 업데이트
4. Save changes

## 확인

LogGroup이 삭제되었는지 확인:

```bash
aws logs describe-log-groups --log-group-name-prefix /aws/lambda/dynamodb-handler-prod --region us-east-1
```

결과가 비어있으면 삭제 완료입니다.

## 다음 단계

1. LogGroup 삭제 완료
2. IAM 권한 업데이트 (logs:DeleteLogGroup 포함)
3. GitHub Actions 재실행

