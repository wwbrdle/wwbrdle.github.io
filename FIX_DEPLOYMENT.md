# 배포 문제 해결 가이드

## 현재 문제

기존 LogGroup이 남아있어서 CloudFormation이 생성에 실패합니다.

## 해결 방법

### 방법 1: 기존 리소스 완전 삭제 (권장)

#### 1단계: CloudFormation 스택 삭제

AWS 콘솔에서:
1. CloudFormation → Stacks
2. `dynamodb-handler-prod` 스택 선택
3. Delete 클릭
4. 삭제 완료 대기 (5-10분 소요)

또는 AWS CLI:
```bash
aws cloudformation delete-stack --stack-name dynamodb-handler-prod --region us-east-1
```

#### 2단계: LogGroup 삭제

AWS 콘솔에서:
1. CloudWatch → Logs → Log groups
2. `/aws/lambda/dynamodb-handler-prod-handler` 찾기
3. 선택 → Actions → Delete log group(s)
4. 확인 후 삭제

또는 AWS CLI:
```bash
aws logs delete-log-group --log-group-name /aws/lambda/dynamodb-handler-prod-handler --region us-east-1
```

#### 3단계: 재배포

GitHub Actions를 다시 실행하거나:
```bash
cd lambda
serverless deploy --stage prod
```

### 방법 2: Serverless Framework로 정리

```bash
cd lambda
serverless remove --stage prod
```

그런 다음 재배포:
```bash
serverless deploy --stage prod
```

## 확인

모든 리소스가 삭제되었는지 확인:

```bash
# CloudFormation 스택 확인
aws cloudformation describe-stacks --stack-name dynamodb-handler-prod --region us-east-1

# LogGroup 확인
aws logs describe-log-groups --log-group-name-prefix /aws/lambda/dynamodb-handler-prod --region us-east-1
```

결과가 "does not exist" 또는 빈 배열이면 삭제 완료입니다.

## 다음 단계

1. ✅ CloudFormation 스택 삭제
2. ✅ LogGroup 삭제
3. ✅ GitHub Actions 재실행

