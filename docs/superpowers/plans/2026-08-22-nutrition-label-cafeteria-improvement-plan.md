# 영양표시 조합 식당 개선 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 영양표시 조합 식당을 학습 계약에 맞는 미션 흐름, 정확한 조건 검증, 접근성, 모바일 UI, 테스트·CI 품질을 갖춘 교육용 SPA로 개선한다.

**Architecture:** 기존 Vite + React + TypeScript 단일 SPA 구조를 유지한다. 영양 계산과 조건 판정은 `src/lib/`의 순수 함수로 강화하고, 미션 컴포넌트는 학습 단계와 피드백을 표현하는 역할에 집중한다. 스타일은 토큰·컴포넌트·모션/반응형 파일로 나누어 파일당 500줄 이하를 유지한다.

**Tech Stack:** Vite 6, React 19, TypeScript 5.7, Vitest 2, Testing Library, jsdom, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-07-27-nutrition-label-cafeteria-design.md`

## Global Constraints

- 서버, 로그인, 외부 API, 실제 식품·브랜드·건강 권장량을 추가하지 않는다.
- 당류(g)와 나트륨(mg)을 별도 필드·별도 합계로 유지하고 단위를 섞지 않는다.
- 미션 3·5는 조건을 모두 만족하고 근거 문장을 완성해야 완료된다.
- `servingMode`와 `requiredFoodIds`를 조건 판정에 실제로 반영한다.
- 중요한 학습 단계 버튼에는 과하지 않은 `gi-pulse` 계열 아우라 강조를 사용한다.
- `prefers-reduced-motion` 사용자는 반복 모션을 받지 않는다.
- 색상만으로 상태를 전달하지 않고 텍스트·아이콘·구조를 함께 제공한다.
- 모든 웹앱 수정은 `src/data/updateLog.ts`에 날짜와 간단한 변경 내역을 남긴다.
- 한 파일은 500줄 이하로 유지한다.
- 현재 작업의 범위는 계획 문서 작성이며, 이 계획을 저장하는 동안 코드 구현·테스트 실행·커밋·푸시는 하지 않는다.
- 기존 사용자 변경 사항인 `.DS_Store`, `tsconfig.tsbuildinfo`는 삭제하거나 수정하지 않는다.

## 현재 확인된 문제와 원인

1. `npm run build`는 통과하지만, `npm test -- --dir src`에서 Node 25의 전역 `localStorage` 객체가 `clear`·`setItem`을 제공하지 않아 진행 저장 테스트가 실패한다.
2. 기본 Vitest 실행 범위가 `.worktrees/`까지 포함하여 중복 React와 오래된 테스트를 수집한다.
3. `evaluateMealCondition`이 `servingMode`와 `requiredFoodIds`를 읽지 않아, 한 번 제공량 조건에서 여러 회분을 선택해도 통과할 수 있다.
4. `useMealInvestigation`의 빈 배열 `every()` 결과가 `true`라서 식품을 선택하지 않은 초기 상태가 “표시 확인 완료”처럼 보인다.
5. 좁은 화면의 단계 탭이 식품 선택·배지 확인 전에도 제공량·합계 단계로 이동할 수 있다.
6. 미션 3은 조건을 만족해도 근거 문장을 완성하지 않아 설계 스펙의 완료 계약과 다르다.
7. `FoodLabelCard`의 찾기 버튼과 접근성 라벨이 클릭 전 정답 숫자를 노출해 찾기 활동의 학습 의도를 약화한다.
8. 진행 막대의 `aria-label` 위치, 미션 번호, 결과 모달의 포커스·Escape 처리, `summary` 터치 타깃이 보강되어야 한다.
9. 미션 1의 오답 피드백이 모든 오답을 “1회 숫자만 고름”으로 설명한다.
10. CSS 파일이 900줄 이상이고, hover·active·focus 상태 및 핵심 다음 행동의 강조가 일관되지 않다.
11. GitHub Pages workflow가 테스트를 실행하지 않으며, `index.html`에 설명·테마·favicon 정보가 부족하다.

## 파일 책임과 변경 지도

### 테스트·품질 기반

- Create: `vitest.setup.ts` — 브라우저 저장소의 결정적 메모리 구현을 테스트마다 초기화한다.
- Modify: `vite.config.ts` — `vitest/config` 타입, `setupFiles`, `include`, `exclude`를 설정한다.
- Modify: `package.json` — 타입 검사와 CI에서 재사용할 테스트 스크립트를 명확히 한다.
- Modify: `.github/workflows/deploy-pages.yml` — 빌드 전에 테스트를 실행한다.
- Modify: `.gitignore` — 운영체제 메타 파일, TypeScript 빌드 정보, 브라우저 산출물을 무시한다.

### 계산·조건 판정

- Modify: `src/lib/mealValidation.ts` — 범위·제공량 모드·필수 식품·카테고리·상한 조건을 모두 판정한다.
- Create: `src/lib/mealValidation.test.ts` — 미션 3·5 조건과 회분 경계의 회귀 테스트를 둔다.
- Modify: `src/features/nutrition-label-cafeteria/ConditionChecklist.tsx` — 결과 체크 필드와 카테고리·제공량 모드를 학습자용 한국어로 표시한다.

### 미션·상태 흐름

- Modify: `src/features/nutrition-label-cafeteria/useMealInvestigation.ts` — 빈 선택 상태를 완료로 보지 않는다.
- Modify: `src/features/nutrition-label-cafeteria/MealBuilder.tsx` — 좁은 화면 단계 탭과 다음 버튼에 선행 조건을 적용한다.
- Modify: `src/features/nutrition-label-cafeteria/MissionPhaseGuide.tsx` — 선택·배지 확인·조건 판정·근거 문장의 실제 순서를 반영한다.
- Modify: `src/features/nutrition-label-cafeteria/missions/Mission3SchoolSnack.tsx` — 조건 문구와 선택 식품을 근거 문장으로 조립하고 검증한다.
- Modify: `src/features/nutrition-label-cafeteria/missions/Mission5FinalOrder.tsx` — 제공량 모드와 근거 문장 검증 결과를 완료 조건에 연결한다.
- Modify: `src/features/nutrition-label-cafeteria/useMissionProgress.ts` — 저장값을 엄격히 검증하고 hydration 상태를 화면에 연결한다.
- Modify: `src/features/nutrition-label-cafeteria/NutritionLabelCafeteriaApp.tsx` — hydration 전 화면 깜빡임을 줄이고 완료 결과 전달을 일관화한다.

### 접근성·콘텐츠·결과

- Modify: `src/features/nutrition-label-cafeteria/FoodLabelCard.tsx` — 찾기 모드에서 정답을 클릭 전에 숨기고, 식품명·필드·현재 상태를 낭독 라벨에 반영한다.
- Modify: `src/features/nutrition-label-cafeteria/MissionProgressBar.tsx` — 실제 진행바에 라벨을 부여하고 1-based 미션 번호와 `aria-current`를 사용한다.
- Modify: `src/features/nutrition-label-cafeteria/UpdateLogModal.tsx` — 열릴 때 포커스, Escape 닫기, 닫힌 뒤 포커스 복원을 구현한다.
- Modify: `src/features/nutrition-label-cafeteria/ResultCard.tsx` — 줄 단위 결과를 구조화해 표시하고 결과 텍스트 복사 기능을 제공한다.
- Modify: `src/features/nutrition-label-cafeteria/missions/Mission1WholePackage.tsx` — 선택한 오답 유형에 맞는 계산 피드백을 제공한다.
- Modify: `src/data/updateLog.ts` — 이번 개선의 날짜별 항목을 추가한다.

### 시각 디자인·문서·정적 자산

- Create: `src/styles/tokens.css` — 색상, 간격, 반경, 터치 크기, 포커스 토큰을 둔다.
- Create: `src/styles/components.css` — 공통 레이아웃, 카드, 식품 라벨, 미션, 결과, 모달 스타일을 둔다.
- Create: `src/styles/motion-responsive.css` — 모션, `gi-pulse`, 반응형, reduced-motion 규칙을 둔다.
- Modify: `src/main.tsx` — 새 스타일 파일을 명시적 순서로 불러온다.
- Delete: `src/styles/nutrition-label-cafeteria.css` — 분리 후 중복 단일 스타일 파일을 제거한다.
- Create: `public/favicon.svg` — 앱의 민트·코랄 식당 표지 아이콘을 둔다.
- Modify: `index.html` — 설명, theme color, favicon, 의미 있는 제목을 추가한다.

## 단계별 구현 순서

### Task 1: 계획 문서와 테스트 기반 정비

**Files:**
- Create: `vitest.setup.ts`
- Modify: `vite.config.ts`, `package.json`, `.github/workflows/deploy-pages.yml`, `.gitignore`
- Test: 기존 `src/features/nutrition-label-cafeteria/useMissionProgress.test.ts`

**Interfaces:**
- Produces: 테스트 실행마다 `globalThis.localStorage`와 `window.localStorage`에 `clear`, `getItem`, `setItem`, `removeItem`, `key`, `length`를 제공하는 메모리 저장소.

- [ ] 저장소 테스트가 의존하는 최소 `Storage` 인터페이스를 먼저 정의한다.
- [ ] `vitest.setup.ts`의 `beforeEach`에서 새 저장소를 만들고 `globalThis`·`window`에 configurable property로 주입한다.
- [ ] Vitest에 `setupFiles: ['./vitest.setup.ts']`, `include: ['src/**/*.{test,spec}.{ts,tsx}']`, `exclude: ['node_modules/**', 'dist/**', '.worktrees/**']`를 추가한다.
- [ ] `npm test -- --dir src/features/nutrition-label-cafeteria/useMissionProgress.test.ts`로 저장소 오류가 사라지는지 확인한다.
- [ ] `npm test -- --dir src`로 `.worktrees` 중복 수집 없이 저장소 관련 기존 테스트를 확인한다.
- [ ] workflow에서 `npm ci` 다음에 `npm test -- --dir src`를 실행하고, 테스트 실패 시 Pages artifact를 만들지 않게 한다.

### Task 2: 영양 조건 검증을 학습 계약과 일치시키기

**Files:**
- Create: `src/lib/mealValidation.test.ts`
- Modify: `src/lib/mealValidation.ts`, `src/features/nutrition-label-cafeteria/ConditionChecklist.tsx`

**Interfaces:**
- `evaluateMealCondition(selections, foods, condition)`은 기존 `passed`, `totals`, `checks`를 유지하되 `checks`에 `requiredFoods`와 `servingMode`를 포함한다.
- `servingMode === 'one-serving'`이면 모든 선택의 `servingsChosen === 1`이어야 한다.
- `servingMode === 'whole-package'`이면 선택된 각 식품의 `servingsChosen === food.label.servingsPerPackage`이어야 한다.
- `requiredFoodIds`가 있으면 모든 ID가 선택되어야 한다.
- `assertServingsInRange`는 0 이하와 포장 초과를 구분할 수 있는 피드백 키를 제공한다.

- [ ] 먼저 다음 회귀 테스트를 작성한다.

```ts
it('한 번 제공 조건에서 여러 회분 선택을 통과시키지 않는다', () => {
  const result = evaluateMealCondition(
    [
      { foodId: 'juice', servingsChosen: 1 },
      { foodId: 'cracker', servingsChosen: 2 },
    ],
    foods,
    { ...oneServingCondition, maxSugarGram: 30, maxSodiumMilligram: 400 },
  )

  expect(result.checks.servingMode).toBe(false)
  expect(result.passed).toBe(false)
})

it('필수 식품이 빠진 조합을 통과시키지 않는다', () => {
  const result = evaluateMealCondition(
    [{ foodId: 'juice', servingsChosen: 1 }],
    foods,
    { ...oneServingCondition, requiredFoodIds: ['juice', 'cracker'] },
  )

  expect(result.checks.requiredFoods).toBe(false)
  expect(result.passed).toBe(false)
})

it('포장 전체 조건은 각 선택을 총 제공량으로 검사한다', () => {
  const result = evaluateMealCondition(
    [{ foodId: 'cracker', servingsChosen: 4 }],
    foods,
    { ...wholePackageCondition, requiredFoodIds: ['cracker'] },
  )

  expect(result.checks.servingMode).toBe(true)
  expect(result.passed).toBe(true)
})
```

- [ ] `npm test -- --dir src/lib/mealValidation.test.ts`로 새 테스트가 구현 전 실패하는지 확인한다.
- [ ] 범위 검사, 필수 ID 검사, 제공량 모드 검사를 순서대로 최소 구현한다.
- [ ] `snackSlotCategories`는 기존의 음료 1개·간식 슬롯 1개·각 1회분 규칙을 유지하되 `checks.servingMode`와 중복 판정되지 않도록 이름과 책임을 분리한다.
- [ ] 미션 5의 유효 조합 개수 계산이 UI에서 허용하는 선택 규칙과 일치하는지 테스트한다.
- [ ] `ConditionChecklist`에서 `drink`를 `음료`, `snack`을 `간식`처럼 표시하고 `one-serving`·`whole-package`를 학습자용 문장으로 표시한다.
- [ ] 전체 계산·조건 테스트를 다시 실행해 통과시킨다.

### Task 3: 미션 완료 조건과 순차 진행 고정

**Files:**
- Modify: `useMealInvestigation.ts`, `MealBuilder.tsx`, `MissionPhaseGuide.tsx`, `Mission3SchoolSnack.tsx`, `Mission5FinalOrder.tsx`
- Test: `useMealInvestigation.test.ts`, `src/lib/mealValidation.test.ts`

**Interfaces:**
- `badgesReady`는 선택 항목이 하나 이상이고 선택한 모든 식품의 1회·총 제공량 배지가 확인된 경우에만 `true`다.
- 좁은 화면 단계는 `select`를 항상 방문할 수 있고, `servings`는 선택 항목이 있을 때, `summary`는 선택 항목이 모두 배지 확인된 때 방문할 수 있다.
- 미션 3·5 완료 가능 상태는 `조건 통과 && 배지 확인 && 근거 문장 완성`이다.

- [ ] 빈 선택에서 `badgesReady === false`인 테스트를 먼저 추가하고 실패를 확인한다.
- [ ] `selections.length > 0 && selections.every(...)`로 최소 수정한다.
- [ ] `MealBuilder`에 `canVisitStep`를 만들고 탭의 `disabled`, `aria-disabled`, 클릭 가드를 동일한 판정에 연결한다.
- [ ] “제공량으로”와 “합계로” 버튼이 각각 선택·배지 선행 조건을 안내하도록 문구와 `finishHint`를 보강한다.
- [ ] `MissionPhaseGuide`의 활성·완료 상태를 실제 순서에 맞추고 초기 화면에서 “표시 확인 완료”가 되지 않게 한다.
- [ ] 미션 3에 조건 문구 선택과 식품명 선택을 추가하고, 선택한 합계·조건·식품이 현재 상태와 일치할 때만 `canFinish`를 `true`로 만든다.
- [ ] 미션 5도 제공량 모드 검증 결과를 완료 버튼과 근거 문장에 연결한다.
- [ ] 미션 3·5의 불완전 상태에서 완료 버튼이 비활성이고, 완전한 상태에서만 활성인 컴포넌트 테스트 또는 순수 검증 테스트를 추가한다.

### Task 4: 진행 저장과 결과 카드 개선

**Files:**
- Modify: `useMissionProgress.ts`, `NutritionLabelCafeteriaApp.tsx`, `ResultCard.tsx`
- Test: `useMissionProgress.test.ts`

**Interfaces:**
- 저장된 완료 목록은 길이 6이며 모든 값이 실제 boolean일 때만 사용한다. 그 외의 JSON·길이·타입은 `[false, false, false, false, false, false]`로 복구한다.
- `ResultCard`는 기존 `lastResult: string` 입력을 유지하고, 줄바꿈 기준 결과 항목 목록과 복사 버튼을 렌더링한다.

- [ ] 유효하지 않은 JSON 배열과 문자열 배열을 저장한 뒤 모두 미완료로 복구되는 테스트를 먼저 작성한다.
- [ ] `readCompleted`를 엄격한 타입 가드로 변경하고 저장 오류는 앱을 중단시키지 않도록 처리한다.
- [ ] 앱 화면에 `progress.hydrated`를 연결하여 저장값을 읽기 전 허브/재개 버튼이 잘못 표시되지 않게 한다.
- [ ] 결과 요약을 `활동 기록` 제목, 항목 목록, `결과 복사` 버튼, 복사 성공 상태로 표현한다.
- [ ] Clipboard API가 없거나 거부되어도 결과 화면이 깨지지 않고 상태 문구를 제공하게 한다.
- [ ] 결과 카드의 기존 미션 0~5 요약 문자열이 줄 단위로 손실 없이 표시되는지 테스트한다.

### Task 5: 접근성 및 학습 콘텐츠 개선

**Files:**
- Modify: `FoodLabelCard.tsx`, `MissionProgressBar.tsx`, `UpdateLogModal.tsx`, `Mission1WholePackage.tsx`, `src/data/updateLog.ts`
- Test: 관련 컴포넌트 테스트가 있는 경우 해당 파일에 회귀 테스트 추가

**Interfaces:**
- 찾기 모드의 미확인 필드는 정답 수치를 버튼 이름·식품 카드의 접근성 라벨에서 미리 노출하지 않는다. 확인 후에만 값을 표시한다.
- 일반 읽기 모드는 기존처럼 수치를 제공하되, 당류·나트륨의 단위와 필드명을 함께 낭독한다.
- 모달은 열릴 때 닫기 버튼으로 포커스를 이동하고 Escape로 닫히며, 닫힌 뒤 열기 버튼으로 포커스를 되돌린다.

- [ ] `FoodLabelCard`의 찾기 모드에서 미확인 버튼 텍스트가 `당류 값 확인하기`, `나트륨 값 확인하기`, `1회 제공량 확인하기`, `총 제공량 확인하기`가 되는 테스트를 작성한다.
- [ ] 확인 후 버튼에 `✓`와 실제 단위를 표시하고 `aria-live="polite"`로 상태를 알린다.
- [ ] 카드 `aria-label`을 일반 모드와 찾기 모드로 분리하여 찾기 전 정답 노출을 막는다.
- [ ] 진행바 실제 `role="progressbar"` 요소에 `aria-label`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`를 지정한다.
- [ ] 시각 번호는 1부터 시작하게 하고 현재 미션에 `aria-current="step"`를 지정한다.
- [ ] `UpdateLogModal`에 `useRef`·`useEffect` 기반 포커스 복원과 Escape 처리를 추가하고, 배경 클릭 닫기는 기존 동작과 충돌하지 않게 한다.
- [ ] `summary` 요소에 최소 44px 높이와 키보드 포커스 스타일을 부여한다.
- [ ] 미션 1에서는 선택 값이 1회 값인지, 곱셈 결과가 아닌지, 다른 필드의 오답인지에 따라 서로 다른 피드백을 표시한다.
- [ ] `src/data/updateLog.ts`에 2026-08-22 기준 테스트·조건 검증·단계 흐름·접근성·UI 개선 항목을 추가한다.

### Task 6: 디자인 시스템과 반응형 UI 정리

**Files:**
- Create: `src/styles/tokens.css`, `src/styles/components.css`, `src/styles/motion-responsive.css`
- Modify: `src/main.tsx`
- Delete: `src/styles/nutrition-label-cafeteria.css`

**Design thesis:** 밝은 학교 식당 작업대 위에 영양표시 판을 중심으로 정보를 쌓고, 민트는 진행·확인, 코랄은 완료·강조에만 사용한다. 장식용 카드와 과도한 그라디언트를 줄여 초등 학습자가 현재 해야 할 행동과 숫자를 먼저 보게 한다.

**Interaction thesis:** 다음 행동은 짧은 `gi-pulse` 아우라로 한 번에 하나만 안내하고, 배지 확인 뒤 계산 영역이 나타나며, 완료 결과는 구조화된 기록으로 확인·복사한다. reduced-motion 환경에서는 아우라와 전환을 제거해도 상태 정보가 유지된다.

- [ ] 기존 CSS를 토큰·컴포넌트·모션/반응형 책임으로 나누고 각 파일을 500줄 이하로 유지한다.
- [ ] `src/main.tsx`에서 `tokens.css` → `components.css` → `motion-responsive.css` 순서로 불러온다.
- [ ] body 배경을 단순화하고 민트·코랄을 각각 진행·완료 의미로 제한한다.
- [ ] 버튼과 카드에 `:hover`, `:active`, `:focus-visible`, `:disabled` 상태를 명시한다.
- [ ] 핵심 학습 행동에만 `key-action` 또는 `needs-tap` 클래스를 부여하고 `@keyframes gi-pulse`를 추가한다.
- [ ] `@media (prefers-reduced-motion: reduce)`에서 animation·transition을 제거한다.
- [ ] 모바일 단계형 MealBuilder가 320px 폭에서도 가로 스크롤 없이 보이고, 모든 버튼이 최소 44px 터치 높이를 갖게 한다.
- [ ] CSS 분리 후 `npm run build`로 import 경로와 클래스 누락을 확인한다.

### Task 7: 정적 메타데이터와 출시 안전장치

**Files:**
- Create: `public/favicon.svg`
- Modify: `index.html`, `.github/workflows/deploy-pages.yml`, `package.json`

- [ ] `index.html`에 `meta description`, `theme-color`, `favicon`, 의미 있는 제목을 추가한다.
- [ ] favicon은 실제 브랜드·식품 사진 대신 민트 표지판과 코랄 점을 사용하는 간단한 SVG로 만든다.
- [ ] package scripts에 `typecheck` 또는 동일 목적의 명확한 명령을 추가하고, 기존 `build`가 TypeScript 검사를 계속 수행하게 한다.
- [ ] Pages workflow가 `npm ci` → `npm test -- --dir src` → `npm run build` 순서로 실행되게 한다.
- [ ] workflow가 테스트를 통과하지 못하면 배포 artifact를 만들지 않는지 YAML 구조를 확인한다.

### Task 8: 통합 검증과 구현 완료 체크

**Files:**
- Read-only review: 계획 문서, git diff, 전체 `src/`
- Optional test additions: `src/features/nutrition-label-cafeteria/*.test.tsx`

- [ ] `npm test -- --dir src`를 실행해 모든 테스트가 통과하고 `.worktrees` 중복 테스트가 수집되지 않는지 확인한다.
- [ ] `npm run build`를 실행해 TypeScript와 Vite production build가 모두 종료 코드 0인지 확인한다.
- [ ] 실제 학습자 흐름을 확인한다.

```text
시작 화면
  → 선형 시작
  → 미션 0: 네 항목을 클릭 전 정답 없이 찾기
  → 미션 1: 1회 값 × 총 제공량으로 포장 전체 계산
  → 미션 2: 당류·나트륨을 분리해 비교
  → 미션 3: 배지 확인 → 음료+간식 조합 → 조건 → 근거 문장
  → 미션 4: 나누어 먹기·혼자 먹기 두 시나리오
  → 미션 5: 한 번 제공량 조건 위반 조합 거부 → 근거 문장 완성
  → 결과 카드: 구조화된 기록·복사
  → 허브 해금
```

- [ ] 미션 3에서 여러 정답 후보 중 하나가 통과하고, 조건 일부만 만족하면 완료되지 않는지 확인한다.
- [ ] 미션 5에서 `juice 1회 + cracker 2회`가 당류·나트륨 상한을 만족해도 `one-serving` 위반으로 거부되는지 확인한다.
- [ ] 좁은 화면에서 식품 선택 전 제공량·합계 단계로 이동할 수 없는지 확인한다.
- [ ] 새로고침 후 미션 해금 상태만 유지되고 현재 조합·개인 정보는 저장되지 않는지 확인한다.
- [ ] 업데이트 내역 모달을 키보드로 열고, Escape로 닫고, 원래 버튼으로 포커스가 돌아오는지 확인한다.
- [ ] 320px·375px·768px 폭에서 가로 스크롤, 잘린 버튼, 겹치는 모달이 없는지 확인한다.
- [ ] 브라우저 콘솔 오류가 없는지 확인한다.
- [ ] 모든 수정이 `git diff --check`를 통과하고, 파일당 500줄 이하인지 확인한다.
- [ ] 계획에 포함된 변경만 남아 있는지 `git status --short`로 확인한다.

## 완료 기준

- [ ] 계산·조건 테스트가 통과한다.
- [ ] 미션 0~5가 설계 스펙의 완료 조건을 충족한다.
- [ ] 미션 3·5의 배지 확인·조건·근거 문장 게이트가 실제 완료 버튼에 연결된다.
- [ ] 찾기 모드에서 클릭 전 정답 숫자를 노출하지 않는다.
- [ ] 키보드·스크린 리더·모바일 단계형 흐름에 필요한 라벨과 포커스가 제공된다.
- [ ] CSS와 소스 파일이 파일당 500줄 이하이다.
- [ ] `npm test -- --dir src`, `npm run build`, `git diff --check`의 최신 실행 결과를 보고할 수 있다.
- [ ] 사용자가 별도로 요청하지 않는 한 커밋·푸시·배포는 수행하지 않는다.

## 구현 후 보고 형식

구현이 승인된 뒤에는 각 단계별로 다음 정보를 간단히 보고한다.

1. 변경한 파일과 사용자에게 보이는 개선점
2. 단계별 테스트 명령과 실제 결과
3. 남은 위험 또는 후속 선택지
4. 커밋·푸시·배포를 하지 않았다면 그 상태를 명시
