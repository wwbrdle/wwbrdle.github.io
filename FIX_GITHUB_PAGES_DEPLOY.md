# GitHub Pages 배포 권한 문제 해결

## 문제

GitHub Actions가 `gh-pages` 브랜치에 푸시할 권한이 없습니다.

## 해결 방법

### 방법 1: Repository Settings에서 권한 부여 (권장)

1. GitHub Repository → **Settings** → **Actions** → **General**
2. **Workflow permissions** 섹션으로 스크롤
3. **Read and write permissions** 선택
4. **Allow GitHub Actions to create and approve pull requests** 체크 (선택사항)
5. **Save** 클릭

### 방법 2: Personal Access Token (PAT) 사용

Repository Settings 방법이 작동하지 않는 경우:

#### 1단계: Personal Access Token 생성

1. GitHub → **Settings** (개인 설정) → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. **Generate new token** → **Generate new token (classic)** 클릭
3. 다음 설정:
   - **Note**: `GitHub Pages Deploy`
   - **Expiration**: 원하는 기간 선택
   - **Scopes**: `repo` 체크 (전체 권한)
4. **Generate token** 클릭
5. **토큰 복사** (한 번만 표시됨!)

#### 2단계: GitHub Secrets에 토큰 추가

1. Repository → **Settings** → **Secrets and variables** → **Actions**
2. **New repository secret** 클릭
3. 다음 정보 입력:
   - **Name**: `GH_PAGES_TOKEN`
   - **Value**: 복사한 Personal Access Token
4. **Add secret** 클릭

#### 3단계: 워크플로우 수정

`.github/workflows/deploy-gatsby.yml` 파일을 수정:

```yaml
- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  if: github.ref == 'refs/heads/main'
  with:
    github_token: ${{ secrets.GH_PAGES_TOKEN }}  # GITHUB_TOKEN 대신 PAT 사용
    publish_dir: ./public
    cname: ${{ secrets.CNAME || '' }}
```

## 확인

권한 설정 후:
1. GitHub Actions를 다시 실행
2. **Actions** 탭에서 워크플로우 상태 확인
3. 배포가 성공하면 GitHub Pages 설정 확인

## GitHub Pages 설정 확인

1. Repository → **Settings** → **Pages**
2. **Source**가 **Deploy from a branch**로 설정되어 있는지 확인
3. **Branch**가 `gh-pages` / `/ (root)`로 설정되어 있는지 확인

## 문제 해결

### 여전히 권한 오류가 발생하는 경우

1. Repository가 Private인지 확인 (Private 저장소는 GitHub Pages Pro 필요)
2. Personal Access Token의 `repo` 권한 확인
3. 워크플로우 파일의 `github_token` 설정 확인

