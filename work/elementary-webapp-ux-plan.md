# 영양표시 조합 식당 교육용 웹앱 개선 실행 계획

- 작성일: 2026-08-31
- 대상: 초등 5–6학년 학습자(주 페르소나: 서윤, 10–12세)
- 실행 모드: `full`
- 범위: 학습 로직, 코드 품질, 상태 흐름, 콘텐츠, 접근성, 반응형 UI, 디자인 시스템, 테스트/CI
- 제외: VoiceOver 구현·검증, 서버/로그인/외부 API, 실제 식품·브랜드·건강 권장량, HVC 정적 갤러리 동기화

## Stage 0와 전문 경로

사전 점검 보고서: [`elementary-webapp-ux-bootstrap.md`](./elementary-webapp-ux-bootstrap.md)

```text
status=ready
selected-route=design-system
route-status=runtime-available
browser-evidence=required / runtime-available
implementation=redesign-existing-projects + frontend-skill / runtime-available
image-decision=not-needed
simulation-decision=not-needed
```

현재 실행 경로는 `ui-ux-pro-max`가 filesystem-only인 상태여서 첫 runtime-available 후보인 `design-system`을 선택했습니다. `design-system`의 토큰 계층·컴포넌트 상태·포커스 기준을 적용하고, 기존 React/Vite 구조를 유지하는 `redesign-existing-projects` 원칙으로 수정합니다.

## 브라우저 기준선

- URL: `https://wbmaker2.github.io/nutrition-label-combination-cafeteria/`
- 첫 화면: 제목과 학습 목표는 보이지만 시작 CTA가 넓은 데스크톱 카드 안에서 왼쪽에 치우치고, 업데이트 내역은 `선생님용`을 열어야 보입니다.
- 미션 0: `FoodLabelCard`의 카드 `aria-label`과 “눌러 확인” 버튼 이름이 클릭 전 정답 수치를 함께 노출합니다. 찾기 활동의 관찰·회복 루프가 약해집니다.
- 진행 표시: 실제 진행바는 존재하지만 바깥 설명과 미션 점의 번호/ARIA 표현이 0-based로 혼동을 줍니다.
- 콘솔: 기준선 첫 화면과 미션 0에서 오류·경고 없음.
- 브라우저 증거: 위 URL의 DOM snapshot, 미션 0의 `article[aria-label]`, `button` accessible name, `progressbar` 상태.

## 개선 원칙

### 학습·상태

1. `servingMode`와 `requiredFoodIds`를 조건 판정에 실제로 반영합니다.
2. 선택 → 표시 확인 → 제공량 → 조건 → 근거 숫자/문장 순서를 모바일에서도 건너뛸 수 없게 합니다.
3. 미션 3·5는 조건 통과와 근거 문장 완성을 모두 만족해야 완료됩니다.
4. 오답은 정답을 대신 말하지 않고, 무엇을 다시 확인할지 구체적으로 안내합니다.
5. 시뮬레이션은 기존 고정 수치 선택 활동만으로 학습 목표가 충족되므로 새 Canvas/WebGL/게임 시뮬레이션은 추가하지 않습니다.

### 콘텐츠·학습자 언어

- 핵심 용어는 `1회 제공량`, `총 제공량`, `당류(g)`, `나트륨(mg)`을 유지하고 첫 등장에 쉬운 풀이를 연결합니다.
- `drink` 같은 내부 카테고리와 `servingMode` 표현은 학습자용 한국어로 변환합니다.
- “지금 할 일 → 확인 방법 → 틀렸을 때 다시 볼 단서” 순서로 문장을 정리합니다.
- 정적 후보 목록은 [`elementary-webapp-ux-language-candidates.md`](./elementary-webapp-ux-language-candidates.md)이며, 동적 상태는 브라우저 회귀 검증에서 확인합니다.

### 시각·상호작용

디자인 thesis: 밝은 학교 식당 작업대 위에 영양표시 판을 중심으로 정보를 쌓고, 민트는 진행·확인, 코랄은 완료·주의에만 사용합니다. 장식용 그라디언트를 줄이고 숫자와 현재 행동의 대비를 높입니다.

Interaction thesis: 다음 행동은 한 번에 하나만 `gi-pulse` 아우라로 안내합니다. 확인한 배지 뒤에 계산 영역을 열고, 완료 화면에서는 기록을 항목별로 읽고 복사할 수 있게 합니다. `prefers-reduced-motion: reduce`에서는 펄스·전환 없이 동일한 상태 정보를 유지합니다.

## 구현 순서

### 1. 테스트와 저장 환경

- `vitest.setup.ts`에 결정적인 메모리 `Storage` 구현을 추가합니다.
- Vitest가 `src`만 수집하고 `.worktrees/**`를 제외하도록 설정합니다.
- `typecheck` 스크립트와 Pages workflow의 `test → build` 게이트를 추가합니다.
- 사용자 소유의 `.DS_Store`, `tsconfig.tsbuildinfo`는 삭제하지 않습니다.

### 2. 조건 판정과 회귀 테스트

- `src/lib/mealValidation.ts`에 `requiredFoods`, `servingMode` 검사를 추가합니다.
- 0회·포장 초과·1회 제공량 위반·필수 식품 누락·포장 전체 통과를 순수 테스트로 고정합니다.
- 조건 체크리스트에 식품 구성과 제공량 모드를 한국어로 표시합니다.

### 3. 미션 흐름

- 빈 선택에서 `badgesReady`가 `false`가 되도록 합니다.
- 모바일 단계 탭을 선행 조건에 따라 잠급니다.
- 미션 3·5에 조건 문구와 선택 식품 문장을 추가하고 완료 계약에 포함합니다.
- 진행 저장값을 엄격하게 검증하고 hydration 전 재개 상태 깜빡임을 줄입니다.

### 4. 접근성·콘텐츠·결과

- 찾기 모드 미확인 값은 버튼 이름·카드 라벨에도 노출하지 않습니다.
- 스테퍼에 식품명·현재 제공량을 연결하고 `aria-live` 상태를 제공합니다.
- 진행바·미션 점·모달 포커스/Escape·결과 `summary` 터치 타깃을 보강합니다.
- 미션 1 오답 종류를 구분해 계산 단서를 제공합니다.
- 업데이트 내역에 이번 변경을 추가합니다.

### 5. 디자인 시스템·메타데이터

- 903줄 CSS를 `tokens.css`, `components.css`, `learning.css`, `results-navigation.css`, `progress-builder.css`, `motion-responsive.css`로 분리하고 각 파일을 500줄 이하로 유지합니다.
- 버튼/카드의 hover, active, focus-visible, disabled 상태와 터치 최소 44px을 토큰으로 관리합니다.
- 핵심 학습 버튼에만 `gi-pulse`를 적용하고 reduced-motion을 지원합니다.
- favicon, description, theme-color를 추가합니다. 새 사실 이미지가 학습에 필요하지 않으므로 imagegen 자산은 추가하지 않습니다.

## 수용 기준

- 해결되지 않은 P0/P1 없음.
- 기본 테스트와 타입 검사·빌드가 통과하고 Pages workflow가 테스트 실패 시 배포 artifact를 만들지 않습니다.
- `evaluateMealCondition`이 제공량 모드와 필수 식품을 판정하고 회귀 테스트가 이를 고정합니다.
- 주 페르소나가 시작 → 미션 0 오답/회복 → 미션 3 또는 5의 선택·확인·조건·문장·완료 흐름을 수행합니다.
- 320px/375px/데스크톱에서 CTA, 숫자, 피드백이 잘리지 않고 가로 넘침이 없습니다.
- 마우스 없이 핵심 경로를 Tab/Enter/Space로 조작하고 포커스가 보입니다. VoiceOver는 평가하지 않습니다.
- 정상, 오답, 빈 입력/미완료, 완료, 업데이트 모달 상태의 학습자 문구를 검토합니다.
- 최종 결과에 학습 takeaway와 다음 행동이 있고, 결과 복사 실패도 화면을 깨뜨리지 않습니다.

## 검증 산출물

- 계획: 이 문서
- 기준선: 브라우저 URL과 DOM snapshot 기록
- 문구 후보: [`elementary-webapp-ux-language-candidates.md`](./elementary-webapp-ux-language-candidates.md)
- 최종 감사: `work/elementary-webapp-ux-audit.md`
- 최종 학습자 검증: `work/elementary-webapp-ux-acceptance.md`
