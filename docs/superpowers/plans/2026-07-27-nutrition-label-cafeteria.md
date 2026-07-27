# 영양표시 조합 식당 MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **UI polish:** When building screens, follow @open-design-web-prototype (educational web prototype) with mint/coral school-cafeteria tone from the spec.
>
> **Commits:** Do **not** commit unless the user explicitly asks. Skip commit steps or pause and ask.

**Goal:** 서버 없는 Vite+React+TS SPA로, 초등 5~6학년용 영양표시 읽기·환산·당류/나트륨 분리 합산·미션 0~5·결과 카드를 제공한다.

**Architecture:** 단일 SPA + 미션 상태머신. `data/`(카드·조건), `lib/`(순수 계산·검증), `features/nutrition-label-cafeteria/`(화면·훅). 첫 회차 선형 잠금, 전체 클리어 후 허브 해금(`localStorage` 플래그만).

**Tech Stack:** Vite, React 19, TypeScript, Vitest, CSS variables (민트·코랄). React Router 없음.

**Spec:** `docs/superpowers/specs/2026-07-27-nutrition-label-cafeteria-design.md`

---

## File map

| Path | Responsibility |
|---|---|
| `package.json`, `vite.config.ts`, `tsconfig*.json`, `index.html` | 스캐폴드·Vitest |
| `src/main.tsx`, `src/App.tsx` | 엔트리, 앱 마운트 |
| `src/data/types.ts` | 공유 타입 |
| `src/data/foodCards.ts` | 가상 식품 6종 |
| `src/data/mealConditions.ts` | 미션 3·5 조건 |
| `src/data/feedbackRules.ts` | 피드백 문구 |
| `src/data/updateLog.ts` | 업데이트 내역 |
| `src/lib/nutritionCalculation.ts` | 포장 전체·선택량·합계 |
| `src/lib/mealValidation.ts` | 제공량·조건 판정·근거 숫자 일치 |
| `src/lib/accessibilityLabels.ts` | 낭독 라벨 |
| `src/lib/*.test.ts` | Vitest |
| `src/styles/nutrition-label-cafeteria.css` | 디자인 토큰·레이아웃 |
| `src/features/nutrition-label-cafeteria/*` | UI·훅·미션 화면 |

단일 파일 500줄 초과 금지. 가격·건강 점수·권장량·브랜드 이미지·개인 건강 입력 금지.

---

### Task 1: Vite + React + TS + Vitest 스캐폴드

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/vite-env.d.ts`
- Create: `.gitignore` (include `node_modules`, `dist`, `.superpowers`)

- [ ] **Step 1: Scaffold project**

```bash
cd /Users/kimhongnyeon/Dev/cursor/nutrition-label-combination-cafeteria
npm create vite@latest . -- --template react-ts
```

If directory not empty, create files manually with Vite React-TS defaults and add existing `docs/` / MVP md to stay put.

- [ ] **Step 2: Add Vitest**

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

In `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
```

Add to `package.json` scripts: `"test": "vitest run"`, `"test:watch": "vitest"`.

- [ ] **Step 3: Smoke App**

`src/App.tsx` renders `<h1>영양표시 조합 식당</h1>`.

```bash
npm run dev
```

Expected: page title visible in browser.

- [ ] **Step 4: Commit only if user asks**

---

### Task 2: 공유 타입 + 식품·조건 데이터

**Files:**
- Create: `src/data/types.ts`
- Create: `src/data/foodCards.ts`
- Create: `src/data/mealConditions.ts`
- Create: `src/data/feedbackRules.ts`
- Create: `src/data/updateLog.ts`
- Test: `src/data/foodCards.test.ts`

- [ ] **Step 1: Write failing data integrity test**

```ts
// src/data/foodCards.test.ts
import { describe, expect, it } from 'vitest'
import { foodCards, getFoodById } from './foodCards'

describe('foodCards', () => {
  it('matches spec table', () => {
    expect(getFoodById('cereal')?.label).toEqual({
      servingAmount: 30,
      servingUnit: 'g',
      servingsPerPackage: 3,
      sugarGram: 8,
      sodiumMilligram: 90,
    })
    expect(foodCards.map((f) => f.category)).toEqual([
      'grain', 'dairy', 'snack', 'drink', 'snack', 'fruit',
    ])
  })
})
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
npm test -- src/data/foodCards.test.ts
```

Expected: FAIL (module not found).

- [ ] **Step 3: Implement types + data**

`src/data/types.ts` — copy types from spec §5 (`ServingUnit`, `NutritionLabel`, `FoodCard`, `FoodCategory`, `MealCondition`, `MealSelection`).

`src/data/foodCards.ts`:

```ts
import type { FoodCard } from './types'

export const foodCards: FoodCard[] = [
  {
    id: 'cereal',
    name: '바삭 시리얼',
    category: 'grain',
    label: { servingAmount: 30, servingUnit: 'g', servingsPerPackage: 3, sugarGram: 8, sodiumMilligram: 90 },
    icon: '🥣',
    note: '가상 수치이며 실제 제품 추천이 아닙니다.',
  },
  {
    id: 'yogurt',
    name: '새콤 요거트',
    category: 'dairy',
    label: { servingAmount: 100, servingUnit: 'g', servingsPerPackage: 1, sugarGram: 10, sodiumMilligram: 70 },
    icon: '🥛',
    note: '가상 수치이며 실제 제품 추천이 아닙니다.',
  },
  {
    id: 'cracker',
    name: '고소 크래커',
    category: 'snack',
    label: { servingAmount: 20, servingUnit: 'g', servingsPerPackage: 4, sugarGram: 2, sodiumMilligram: 120 },
    icon: '🍘',
    note: '가상 수치이며 실제 제품 추천이 아닙니다.',
  },
  {
    id: 'juice',
    name: '달콤 주스',
    category: 'drink',
    label: { servingAmount: 200, servingUnit: 'mL', servingsPerPackage: 2, sugarGram: 18, sodiumMilligram: 15 },
    icon: '🧃',
    note: '가상 수치이며 실제 제품 추천이 아닙니다.',
  },
  {
    id: 'sandwich',
    name: '담백 샌드',
    category: 'snack',
    label: { servingAmount: 1, servingUnit: 'piece', servingsPerPackage: 2, sugarGram: 4, sodiumMilligram: 260 },
    icon: '🥪',
    note: '가상 수치이며 실제 제품 추천이 아닙니다.',
  },
  {
    id: 'fruit-cup',
    name: '과일 컵',
    category: 'fruit',
    label: { servingAmount: 150, servingUnit: 'g', servingsPerPackage: 1, sugarGram: 12, sodiumMilligram: 5 },
    icon: '🍎',
    note: '가상 수치이며 실제 제품 추천이 아닙니다.',
  },
]

export function getFoodById(id: string): FoodCard | undefined {
  return foodCards.find((f) => f.id === id)
}
```

`src/data/mealConditions.ts`:

```ts
import type { MealCondition } from './types'

export const mission3Condition: MealCondition = {
  id: 'mission-3',
  title: '학교 간식 조합',
  maxSugarGram: 28,
  maxSodiumMilligram: 200,
  requiredCategories: ['drink'],
  snackSlotCategories: ['snack', 'grain', 'fruit', 'dairy'],
  servingMode: 'one-serving',
  explanation: '음료 1회 + 간식 슬롯 1회, 당류 28g 이하, 나트륨 200mg 이하',
}

export const mission5Condition: MealCondition = {
  id: 'mission-5',
  title: '영양표시 조합 식당 최종 주문',
  maxSugarGram: 30,
  maxSodiumMilligram: 400,
  requiredCategories: ['drink'],
  servingMode: 'one-serving',
  explanation: '당류 30g 이하, 나트륨 400mg 이하, 음료 포함',
}
```

`feedbackRules.ts` — map keys from spec §7 to Korean strings (절차 중심, 낙인 금지).

`updateLog.ts`:

```ts
export const updateLog = [
  { date: '2026-07-27', body: '최초 MVP 설계: 영양표시 기준 확인과 식단 조합' },
  { date: '2026-07-27', body: '표시판 읽기·포장 전체 계산·5개 조합 미션 추가' },
]
```

- [ ] **Step 4: Run test — expect PASS**

```bash
npm test -- src/data/foodCards.test.ts
```

---

### Task 3: `nutritionCalculation` (TDD)

**Files:**
- Create: `src/lib/nutritionCalculation.ts`
- Test: `src/lib/nutritionCalculation.test.ts`

- [ ] **Step 1: Write failing tests**

```ts
import { describe, expect, it } from 'vitest'
import {
  wholePackageValue,
  selectedNutrition,
  sumSelections,
} from './nutritionCalculation'
import { getFoodById } from '../data/foodCards'

describe('wholePackageValue', () => {
  it('multiplies per-serving by servings per package', () => {
    expect(wholePackageValue(8, 3)).toBe(24)
    expect(wholePackageValue(2, 4)).toBe(8)
  })
})

describe('selectedNutrition', () => {
  it('scales by servingsChosen', () => {
    const cereal = getFoodById('cereal')!
    expect(selectedNutrition({ foodId: 'cereal', servingsChosen: 2 }, cereal)).toEqual({
      sugarGram: 16,
      sodiumMilligram: 180,
    })
  })
})

describe('sumSelections', () => {
  it('sums sugar and sodium separately', () => {
    const foods = [getFoodById('juice')!, getFoodById('cracker')!]
    const sum = sumSelections(
      [
        { foodId: 'juice', servingsChosen: 1 },
        { foodId: 'cracker', servingsChosen: 1 },
      ],
      foods,
    )
    expect(sum).toEqual({ sugarGram: 20, sodiumMilligram: 135 })
  })
})
```

- [ ] **Step 2: Run — expect FAIL**

```bash
npm test -- src/lib/nutritionCalculation.test.ts
```

- [ ] **Step 3: Implement**

```ts
import type { FoodCard, MealSelection } from '../data/types'

export function wholePackageValue(perServing: number, servingsPerPackage: number): number {
  return perServing * servingsPerPackage
}

export function selectedNutrition(
  selection: MealSelection,
  food: FoodCard,
): { sugarGram: number; sodiumMilligram: number } {
  return {
    sugarGram: food.label.sugarGram * selection.servingsChosen,
    sodiumMilligram: food.label.sodiumMilligram * selection.servingsChosen,
  }
}

export function sumSelections(
  selections: MealSelection[],
  foods: FoodCard[],
): { sugarGram: number; sodiumMilligram: number } {
  return selections.reduce(
    (acc, sel) => {
      const food = foods.find((f) => f.id === sel.foodId)
      if (!food) return acc
      const part = selectedNutrition(sel, food)
      return {
        sugarGram: acc.sugarGram + part.sugarGram,
        sodiumMilligram: acc.sodiumMilligram + part.sodiumMilligram,
      }
    },
    { sugarGram: 0, sodiumMilligram: 0 },
  )
}
```

- [ ] **Step 4: Run — expect PASS**

---

### Task 4: `mealValidation` (TDD)

**Files:**
- Create: `src/lib/mealValidation.ts`
- Test: `src/lib/mealValidation.test.ts`

- [ ] **Step 1: Write failing tests**

```ts
import { describe, expect, it } from 'vitest'
import {
  assertServingsInRange,
  evaluateMealCondition,
  explanationNumbersMatch,
  countMission3ValidCombos,
  countMission5ValidCombos,
} from './mealValidation'
import { foodCards, getFoodById } from '../data/foodCards'
import { mission3Condition, mission5Condition } from '../data/mealConditions'

describe('assertServingsInRange', () => {
  it('rejects zero and over-package', () => {
    const c = getFoodById('cracker')!
    expect(assertServingsInRange(0, c).ok).toBe(false)
    expect(assertServingsInRange(5, c).ok).toBe(false)
    expect(assertServingsInRange(4, c).ok).toBe(true)
  })
})

describe('evaluateMealCondition mission 3', () => {
  it('accepts juice + cereal one serving each', () => {
    const r = evaluateMealCondition(
      [
        { foodId: 'juice', servingsChosen: 1 },
        { foodId: 'cereal', servingsChosen: 1 },
      ],
      foodCards,
      mission3Condition,
    )
    expect(r.passed).toBe(true)
  })

  it('rejects sandwich + juice for sodium', () => {
    const r = evaluateMealCondition(
      [
        { foodId: 'juice', servingsChosen: 1 },
        { foodId: 'sandwich', servingsChosen: 1 },
      ],
      foodCards,
      mission3Condition,
    )
    expect(r.passed).toBe(false)
    expect(r.checks.sodium).toBe(false)
  })

  it('has at least two valid one-serving drink+snackSlot combos', () => {
    expect(countMission3ValidCombos(foodCards, mission3Condition)).toBeGreaterThanOrEqual(2)
  })
})

describe('evaluateMealCondition mission 5', () => {
  it('requires drink category', () => {
    const r = evaluateMealCondition(
      [{ foodId: 'cracker', servingsChosen: 1 }],
      foodCards,
      mission5Condition,
    )
    expect(r.checks.categories).toBe(false)
  })

  it('has at least two valid combos under mission 5 caps with a drink', () => {
    expect(countMission5ValidCombos(foodCards, mission5Condition)).toBeGreaterThanOrEqual(2)
  })
})

describe('explanationNumbersMatch', () => {
  it('requires assembled totals to match selection sum', () => {
    expect(
      explanationNumbersMatch(
        { sugarGram: 20, sodiumMilligram: 135 },
        { sugarGram: 20, sodiumMilligram: 135 },
      ),
    ).toBe(true)
    expect(
      explanationNumbersMatch(
        { sugarGram: 20, sodiumMilligram: 135 },
        { sugarGram: 21, sodiumMilligram: 135 },
      ),
    ).toBe(false)
  })
})
```

- [ ] **Step 2: Run — expect FAIL**

- [ ] **Step 3: Implement `mealValidation.ts`**

- `assertServingsInRange(n, food)` → `{ ok, feedbackKey? }`
- `evaluateMealCondition(selections, foods, condition)` → `{ passed, checks: { sugar, sodium, categories, snackSlot?, servingMode? }, feedbackKeys: string[] }`
  - Mission 3: exactly one drink with servingsChosen===1; exactly one other food in `snackSlotCategories` with servingsChosen===1; sugar/sodium caps
  - Mission 5: at least one drink; sugar/sodium caps; servings in range
- `countMission3ValidCombos` — brute force drink × snackSlot at 1 serving
- `countMission5ValidCombos` — enumerate selections with ≥1 drink, servings in range, sugar≤30, sodium≤400; assert ≥2 (e.g. juice+cracker; juice+cereal+yogurt trimmed to pass caps)
- `explanationNumbersMatch`

Partial feedback: if only sugar fails, include `feedbackRules` key for partial condition miss — do not set `passed`.

- [ ] **Step 4: Run — expect PASS**

```bash
npm test -- src/lib/mealValidation.test.ts
```

---

### Task 5: accessibility labels + CSS tokens

**Files:**
- Create: `src/lib/accessibilityLabels.ts`
- Test: `src/lib/accessibilityLabels.test.ts`
- Create: `src/styles/nutrition-label-cafeteria.css`
- Modify: `src/main.tsx` (import CSS)

- [ ] **Step 1: Test label format**

```ts
expect(foodCardAriaLabel(getFoodById('cereal')!)).toBe(
  '바삭 시리얼, 1회 제공량 30g, 총 3회, 당류 8g, 나트륨 90mg',
)
```

For `piece` unit use `1개`.

- [ ] **Step 2: Implement labels + CSS variables**

```css
:root {
  --color-mint: #2bb8a6;
  --color-coral: #f0756a;
  --color-bg: #f7fbf9;
  --color-ink: #1c2b28;
  --color-surface: #ffffff;
  --touch-min: 44px;
  --font-display: "Pretendard", "Nunito", "Apple SD Gothic Neo", sans-serif;
  --font-body: "Pretendard", "Noto Sans KR", sans-serif;
}
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
```

No purple-on-white theme. No health score red stigma styles. Min button height `var(--touch-min)`.

- [ ] **Step 3: Tests PASS; visual check later in UI tasks**

---

### Task 6: 진행 훅 `useMissionProgress`

**Files:**
- Create: `src/features/nutrition-label-cafeteria/useMissionProgress.ts`
- Test: `src/features/nutrition-label-cafeteria/useMissionProgress.test.ts`

- [ ] **Step 1: Failing tests with `renderHook`**

Behavior:
- `completed: Set` / boolean array for missions 0–5
- `isUnlocked(n)`: hub mode → all unlocked if `hubUnlocked`; linear → `n===0` or `completed[n-1]`
- `completeMission(n)`: marks complete; if all done → `localStorage.setItem('nlc-hub-unlocked','1')` and `hubUnlocked=true`
- On mount: read `nlc-hub-unlocked`
- `resetSession()` clears in-memory mission state but keeps hub flag unless explicit `clearHubUnlock()`

- [ ] **Step 2: Implement hook**

- [ ] **Step 3: Tests PASS**

---

### Task 7: 공통 UI 컴포넌트

**Files:**
- Create under `src/features/nutrition-label-cafeteria/`: `FoodLabelCard.tsx`, `ServingCalculator.tsx`, `NutritionSummary.tsx`, `ConditionChecklist.tsx`, `MissionShell.tsx`, `UpdateLogModal.tsx`
- Optional light RTL smoke tests for ServingCalculator clamp

- [ ] **Step 1: `FoodLabelCard`**

Props: `food`, `showBadges`, `confirmedServing`, `confirmedPackage`, `onConfirmServing`, `onConfirmPackage`, `selected`, `onSelect`.

Show name, icon, note (가상 수치), table rows for sugar g / sodium mg with icons + text (not color-only). Large badges `1회 기준` / `포장 전체`. `aria-label` from `foodCardAriaLabel`.

- [ ] **Step 2: `ServingCalculator`**

`+` / `−` / number buttons only (no drag). Clamp 1..servingsPerPackage. Call `assertServingsInRange` for feedback text.

- [ ] **Step 3: `NutritionSummary`**

Separate columns: 당류(g) | 나트륨(mg). Never one combined score.

- [ ] **Step 4: `ConditionChecklist`**

List each check with pass/fail text (아이콘+문구).

- [ ] **Step 5: `MissionShell`**

Title, fixed tip sentence from spec, hint slot, primary Next (disabled until `canComplete`), Reset, children.

- [ ] **Step 6: `UpdateLogModal`**

Button + dialog listing `updateLog`.

---

### Task 8: StartScreen + MissionHub + App shell

**Files:**
- Create under `src/features/nutrition-label-cafeteria/`: `StartScreen.tsx`, `MissionHub.tsx`, `NutritionLabelCafeteriaApp.tsx`, `useMealInvestigation.ts`
- Modify: `src/App.tsx`

- [ ] **Step 1: Screen state machine in App**

```ts
type Screen =
  | { name: 'start' }
  | { name: 'hub' }
  | { name: 'mission'; id: 0 | 1 | 2 | 3 | 4 | 5 }
  | { name: 'result'; missionId: 0 | 1 | 2 | 3 | 4 | 5 }
```

**결과 카드 규칙:** 미션 0~5 **각각** 완료 시 `result` 화면으로 이동해 해당 미션 요약·다음 행동을 보여 준다. 미션 5 결과에서만 허브 해금 CTA를 강조한다. 미션 3·4도 동일하게 결과 카드를 거친 뒤 다음 미션(또는 허브)으로 이동한다.

- [ ] **Step 2: Implement `useMealInvestigation`**

Responsibility: **한 미션 세션 안의 선택·배지 확인·합계·피드백** 상태. Mission progress(해금)와 분리.

```ts
// API sketch
type MealInvestigation = {
  selections: MealSelection[]
  confirmedBadges: Record<string, { serving: boolean; package: boolean }>
  feedbackKeys: string[]
  setSelection(foodId: string, servingsChosen: number): void
  removeSelection(foodId: string): void
  confirmBadge(foodId: string, kind: 'serving' | 'package'): void
  reset(): void
  totals: { sugarGram: number; sodiumMilligram: number } // via sumSelections
}
```

Used by Mission 3–5 + MealBuilder. Missions 0–2 may use local state or a slim subset (`confirmBadge` only).

- [ ] **Step 3: StartScreen**

Title `영양표시 조합 식당`, subtitle `알록달록 학교 식당`, safety blurb (의료·체중·알레르기 비수집, 가상 조건만), Update log button, CTA `시작하기` → mission 0, if hubUnlocked show `미션 모음`.

- [ ] **Step 4: MissionHub**

Six cards; locked missions disabled with text `이전 미션을 먼저 완료해 보세요` in linear; all open in hub mode.

- [ ] **Step 5: Wire App.tsx → NutritionLabelCafeteriaApp**

---

### Task 9: 미션 0·1·2

**Files:**
- Create under `src/features/nutrition-label-cafeteria/missions/`: `Mission0ReadLabel.tsx`, `Mission1WholePackage.tsx`, `Mission2SameUnit.tsx`

- [ ] **Step 1: Mission 0**

Food: cereal. Student taps four fields (serving amount, servings/package, sugar, sodium). Gate Next until all four correct. Serving/package badges must be confirmed before submit (spec gate).

- [ ] **Step 2: Mission 1**

Foods: cereal, cracker. After badge confirm, student enters whole-package sugar & sodium (or picks from number cards). Compare side-by-side `1회만` vs `포장 전체` using `wholePackageValue`. Complete when both foods correct.

- [ ] **Step 3: Mission 2**

Present fruit-cup, sandwich, juice. **표시 기준 게이트:** 각 카드의 1회/총 제공량 배지를 확인하기 전에는 비교 제출·퀴즈 제출 버튼 비활성 (스펙: 미션 0·1·2 공통). Two tasks: (a) 각 영양소에서 **가장 큰 값인 식품 하나**를 고르기 (당류 라운드 / 나트륨 라운드 분리); (b) Quiz: “당류 g와 나트륨 mg를 한 합계로 더할 수 있나요?” → 아니오. Complete when badges confirmed + both comparisons + quiz correct.

- [ ] **Step 4: Manual smoke** — linear unlock 0→1→2

---

### Task 10: MealBuilder + 미션 3·4·5 + 근거 문장

**Files:**
- Create under `src/features/nutrition-label-cafeteria/`: `MealBuilder.tsx`, `ExplanationBuilder.tsx`
- Create under `src/features/nutrition-label-cafeteria/missions/`: `Mission3SnackCombo.tsx`, `Mission4ServingVsPackage.tsx`, `Mission5FinalOrder.tsx`

- [ ] **Step 1: MealBuilder**

Wide: click cards + steppers. Narrow (`max-width: 640px`): steps `select → servings → summary`. Each selected food requires badge confirm before servings locked. Cancel selection / reset all.

- [ ] **Step 2: Mission 3**

Use `mission3Condition` + MealBuilder + ConditionChecklist + ExplanationBuilder. **미션 3 근거 틀:** `이 조합의 당류 합은 ___g, 나트륨 합은 ___mg입니다.` (+ 선택적으로 조건 확인 틀 1개). Complete only if `evaluateMealCondition.passed` && `explanationNumbersMatch`.

- [ ] **Step 3: Mission 4**

Foods cracker, yogurt, juice. Scenario A expected servings (1,1,1); B (4,1,2). Student sets steppers or confirms computed totals for sugar/sodium per scenario. Complete when both scenarios match.

- [ ] **Step 4: Mission 5**

Full menu, `mission5Condition`. **미션 5 근거 틀:** `나는 ___ 조건을 확인하고 ___을(를) 선택했습니다.` + `이 조합의 당류 합은 ___g, 나트륨 합은 ___mg입니다.` On success → Result screen.

- [ ] **Step 5: ExplanationBuilder**

Fill-in blanks from app-provided chips only (food names, numbers, condition phrases). Validate numbers against current sum.

---

### Task 11: ResultCard + 허브 해금 마무리

**Files:**
- Create: `ResultCard.tsx`
- Modify: progress hook usage in App

- [ ] **Step 1: ResultCard**

Show selections, per-food 1회 vs chosen, sugar sum, sodium sum, satisfied conditions, explanation sentence, follow-up `다른 조합도 조건을 만족할까요?`, Copy text button (`navigator.clipboard.writeText`), buttons: `미션 모음` (if unlocked) / `다음 미션` / `처음부터`.

- [ ] **Step 2: After mission 5 complete** — set all complete → hub unlock persisted.

- [ ] **Step 3: Verify refresh clears meal state but keeps hub unlock; Start shows hub button.

---

### Task 12: 접근성·콘텐츠 검수·최종 검증

**Files:** touch up CSS/components as needed

- [ ] **Step 1: Keyboard pass** — Tab through start → mission 0 fields → Next; steppers operable with keyboard.

- [ ] **Step 2: Content checklist**

No price/budget; no health grade; virtual disclaimer on cards; no brand imagery; sugar/sodium never merged score.

- [ ] **Step 3: Run full test suite**

```bash
npm test
npm run build
```

Expected: all tests PASS; build succeeds.

- [ ] **Step 4: UI smoke checklist**

- [ ] 시작 → 0→5 → 결과
- [ ] 스테퍼 clamp
- [ ] 모바일 단계형 MealBuilder
- [ ] 업데이트 내역 open/close
- [ ] 허브 해금 후 자유 선택
- [ ] 파일당 줄 수 ≤ 500 (`wc -l src/**/*.{ts,tsx}`)

- [ ] **Step 5: Commit / deploy only if user asks**

---

## Execution notes

- Prefer TDD order in Tasks 2–6 before heavy UI.
- Keep Korean UI copy; error tone = procedural.
- Do not add React Router, backend, or Gemini unless user later requests.
- Open Design: mint/coral cafeteria look, large touch targets, expressive but readable fonts (Pretendard/Nunito — not Inter/Roboto default stack).
