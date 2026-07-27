# 영양표시 조합 식당 — 설계 스펙

| 항목 | 내용 |
|---|---|
| 상태 | 설계 승인 후 구현 계획 대기 |
| 작성일 | 2026-07-27 |
| 출처 | `2026-07-27-nutrition-label-combination-cafeteria-mvp.md` + 브레인스토밍 합의 |
| 대상 | 초등 5~6학년 실과·수학 |
| 스택 | Vite + React + TypeScript (SPA, 서버 없음) |

## 1. 목적

가상 학교 식당(`알록달록 학교 식당`)에서 영양표시를 읽고, 1회 제공량과 포장 전체를 구분·환산하며, 당류(g)·나트륨(mg)을 같은 단위끼리 합산해 가상 조건에 맞는 식단을 고르는 교육용 웹앱.

**고유 학습 단위:** 영양표시 기준 확인 → 제공량 환산 → 영양소 합산 → 조건에 맞는 조합 설명.

**의도적으로 제외:** 가격·예산·잔액, 건강 점수/등급, 실제 권장량, 체중·외모·질환·알레르기 입력, 실제 브랜드·제품 이미지, 학생 간 순위 비교.

## 2. 합의된 제품 결정

| 결정 | 선택 |
|---|---|
| 기술 스택 | Vite + React + TypeScript |
| 구현 범위 | MVP 전체 — 미션 0~5, 결과 카드, 업데이트 내역 |
| 비주얼 톤 | 밝고 또렷한 학교 식당 (민트·코랄 포인트, 큰 카드·버튼, 친근한 일러스트) |
| 미션 진행 | 혼합 — 첫 회차는 0→5 선형 잠금, 전체 클리어 후 허브에서 자유 선택 |
| 아키텍처 | 단일 SPA + 미션 상태머신, `lib/`에 순수 계산·검증 분리 |
| 저장 | 기본 새로고침 시 초기화. 허브 해금 플래그만 `localStorage`. 결과 텍스트 복사 선택 제공 |
| 커밋·배포 | 사용자 요청 시에만 |

## 3. 아키텍처

```text
src/
  data/
    foodCards.ts
    mealConditions.ts
    feedbackRules.ts
    updateLog.ts
  features/nutrition-label-cafeteria/
    NutritionLabelCafeteriaApp.tsx
    MissionShell.tsx
    MissionHub.tsx
    StartScreen.tsx
    missions/
      Mission0ReadLabel.tsx
      Mission1WholePackage.tsx
      Mission2SameUnit.tsx
      Mission3SnackCombo.tsx
      Mission4ServingVsPackage.tsx
      Mission5FinalOrder.tsx
    FoodLabelCard.tsx
    ServingCalculator.tsx
    MealBuilder.tsx
    NutritionSummary.tsx
    ConditionChecklist.tsx
    ResultCard.tsx
    UpdateLogModal.tsx
    useMealInvestigation.ts
    useMissionProgress.ts
  lib/
    nutritionCalculation.ts
    mealValidation.ts
    accessibilityLabels.ts
  styles/
    nutrition-label-cafeteria.css
```

- 단일 파일 500줄 초과 금지.
- 서버·외부 API·실제 식품 DB 없음. 브라우저에서 결정적으로 실행.
- React Router는 기본 미사용. 화면 전환은 앱 상태(`screen` / `missionId`)로 관리.

### 진행 상태

- `progressMode`: `linear` | `hub`
- 선형: 미션 `n` **완료** 시에만 `n+1` 해금.
- 미션 0~5 모두 완료 시 `hubUnlocked=true`를 `localStorage`에 저장하고 허브 진입 가능.
- 개인 식단·이름·건강 정보는 저장하지 않음.

### 미션 완료 판정

| 미션 | 완료 조건 (다음 해금·허브 카운트에 사용) |
|---|---|
| 0 | 지정 식품 카드에서 1회 제공량·총 제공량·당류·나트륨 네 항목을 모두 올바르게 표시(탭/선택)함 |
| 1 | 제시된 각 식품에 대해 포장 전체 당류·나트륨을 올바르게 계산(또는 정답 확인)함 |
| 2 | 당류 비교와 나트륨 비교를 분리해 수행하고, g·mg를 한 합계로 섞지 않음을 확인하는 퀴즈/체크를 통과함 |
| 3 | 구성·상한 조건을 **모두** 만족하는 조합을 선택하고, 근거 문장 틀 1개를 완성함 |
| 4 | “나누어 먹기”와 “혼자 먹기” 시나리오 각각에서 선택량 합계를 올바르게 계산함 |
| 5 | 손님 조건을 모두 만족하는 조합을 선택하고 근거 문장 틀을 완성함 |

- **부분 피드백만으로는 완료되지 않음.** 필수 조건을 모두 만족해야 “다음”/완료가 활성화된다.
- 조건을 만족하는 조합이 여러 개면 그 중 하나를 고르면 완료로 인정한다.
- 허브 모드에서는 이미 완료한 미션을 재입장해 연습할 수 있으며, 재완료가 해금 상태를 되돌리지는 않는다.

## 4. 화면 흐름

1. **시작** — 제목, 건강·안전 범위 안내, 업데이트 내역, 시작(선형)/허브(해금 시)
2. **미션 허브** — 미션 0~5 카드, 잠금·완료 표시
3. **미션 0** — 표시판 읽기 (1회·총 제공량·당류·나트륨 찾기)
4. **미션 1** — 한 포장 전체 계산 (시리얼·크래커, 1회 vs 전체)
5. **미션 2** — 같은 단위끼리 비교 (당류 g / 나트륨 mg 분리)
6. **미션 3** — 학교 간식 조합 (음료 1 + 간식 1회, 가상 조건)
7. **미션 4** — 포장 전체 vs 실제 선택량 (나누어 먹기 / 혼자 먹기)
8. **미션 5** — 최종 주문 (손님 조건 + 근거 문장 조립)
9. **결과 카드** — 선택·계산식·조건·근거, 복사, 허브/다시하기

**표시 기준 게이트:** 미션 0·1·2에서는 해당 카드의 1회/총 제공량 배지를 확인(탭)하기 전에는 계산·선택 단계의 제출 버튼이 비활성이다. 미션 3~5에서는 MealBuilder 진입 시 선택한 각 식품의 기준 배지를 한 번 확인해야 제공량 확정이 가능하다.

### 조작

- 넓은 화면: 카드 클릭 + `+`/`−` 스테퍼·숫자 버튼
- 작은 화면: 식품 선택 → 제공량 → 합계 단계형
- 드래그만으로 제공량 조절하지 않음
- 선택 취소·처음부터 다시 계산 버튼 제공

## 5. 데이터 모델

```ts
type ServingUnit = 'g' | 'mL' | 'piece';

type NutritionLabel = {
  servingAmount: number;
  servingUnit: ServingUnit;
  servingsPerPackage: number;
  sugarGram: number;
  sodiumMilligram: number;
};

type FoodCard = {
  id: string;
  name: string;
  category: 'grain' | 'dairy' | 'drink' | 'snack' | 'fruit';
  label: NutritionLabel;
  icon: string;
  note: string;
};

type FoodCategory = 'grain' | 'dairy' | 'drink' | 'snack' | 'fruit';

type MealCondition = {
  id: string;
  title: string;
  requiredFoodIds?: string[];
  maxSugarGram?: number;
  maxSodiumMilligram?: number;
  /** 카테고리 유니온과 동일. 예: 음료 필수면 ['drink'] */
  requiredCategories?: FoodCategory[];
  /**
   * 미션 3 “간식” 슬롯: snack | grain | fruit | dairy 중
   * 음료가 아닌 1회 제공량 1회분. drink는 별도 슬롯.
   */
  snackSlotCategories?: FoodCategory[];
  servingMode: 'one-serving' | 'whole-package';
  explanation: string;
};

type MealSelection = {
  foodId: string;
  servingsChosen: number;
};
```

### 식품 카드 (가상)

| 식품 | category | 1회 | 총 제공량 | 당류 | 나트륨 | 역할 |
|---|---|---:|---:|---:|---:|---|
| 바삭 시리얼 | grain | 30g | 3회 | 8g | 90mg | 포장 전체 환산 |
| 새콤 요거트 | dairy | 100g | 1회 | 10g | 70mg | 1회=전체 |
| 고소 크래커 | snack | 20g | 4회 | 2g | 120mg | 1회 vs 전체 |
| 달콤 주스 | drink | 200mL | 2회 | 18g | 15mg | mL 단위 |
| 담백 샌드 | snack | 1개 | 2회 | 4g | 260mg | 개수·높은 나트륨 |
| 과일 컵 | fruit | 150g | 1회 | 12g | 5mg | 당류·나트륨 분리 |

모든 카드에 “가상 수치, 실제 제품 추천 아님” 고지.

### 미션별 고정 조건·제시 식품

| 미션 | 제시 식품 | 조건 (가상) | 비고 |
|---|---|---|---|
| 0 | 바삭 시리얼 | 네 항목 찾기 | 읽기만 |
| 1 | 바삭 시리얼, 고소 크래커 | 각 식품 포장 전체 당류·나트륨 계산 | 1회 vs 전체 나란히 |
| 2 | 과일 컵, 담백 샌드, 달콤 주스 등 | 당류만 / 나트륨만 분리 비교 과제 | 합산 금지 확인 |
| 3 | 음료·간식 후보 전체 중 선택 | 음료 1개(`drink`, 제공량 1회) + 간식 슬롯 1회 + 당류 합 ≤ 28g + 나트륨 합 ≤ 200mg | 간식 슬롯 = `snack` \| `grain` \| `fruit` \| `dairy` (음료 제외). `snack` 카테고리만이 아님 |
| 4 | 고소 크래커, 새콤 요거트, 달콤 주스 | 시나리오 A: 세 식품을 친구와 나누어 각 1회 / 시나리오 B: 크래커·주스는 포장 전체, 요거트 1회 | `servingsChosen`로 표현. A=(1,1,1), B=(4,1,2) |
| 5 | 전체 메뉴 | 당류 합 ≤ 30g, 나트륨 합 ≤ 400mg, 음료(`drink`) 1개 이상 포함 | 복수 정답 허용 |

미션 3·5에서 조건을 만족하는 조합이 2개 이상임을 데이터 검수 시 확인하고, Vitest에 “정답 후보 ≥ 2” fixture를 둔다.

### 고정 안내 문장

> 1회 제공량은 한 번 먹는 기준 양이고, 총 제공량은 이 포장 안에 몇 번 먹을 양이 들어 있는지 나타냅니다.

## 6. 계산 · 검증 규칙

```ts
wholePackageValue(perServing, servingsPerPackage) = perServing * servingsPerPackage

selectedNutrition(selection, food) = {
  sugarGram: food.label.sugarGram * selection.servingsChosen,
  sodiumMilligram: food.label.sodiumMilligram * selection.servingsChosen,
}
```

검증:
- `servingsChosen > 0` 이고 `servingsChosen <= servingsPerPackage`
- 당류·나트륨 별도 필드
- 단위(g/mg) 표시 일치
- 제공량 단위(g/mL/piece)끼리 양을 합산하지 않음
- 반올림 없음. MVP 식품 수치는 정수만 사용하며 합계도 정수로 유지한다.

조건 판정:
- 당류 상한(g), 나트륨 상한(mg), 구성 조건(음료 포함 등) 각각 검사
- 복수 조합 정답 허용
- 일부만 만족 시 부분 피드백

## 7. 피드백 · 근거 문장

| 상황 | 피드백 |
|---|---|
| 1회·전체 혼동 | 1회 기준임을 알리고 총 제공량 확인 유도 |
| 제공량 초과 | 총 제공량보다 많이 선택할 수 없음 |
| 당류·나트륨 혼합 | g끼리·mg끼리 따로 더하기 |
| 단위 누락 | 합계에 g 또는 mg 붙이기 |
| 그림만 보고 선택 | 영양표시 기준·숫자 먼저 확인 |
| 조건 일부 누락 | 당류와 나트륨 조건 모두 확인 |
| 근거 충분 | 제공량 확인 + 두 영양소 분리 계산 인정 |

근거 문장 틀(숫자 카드 조립, 자유 입력은 선택):
- `___은(는) 한 포장에 ___회분이므로 전체 당류는 ___g입니다.`
- `이 조합의 당류 합은 ___g, 나트륨 합은 ___mg입니다.`
- `나는 ___ 조건을 확인하고 ___을(를) 선택했습니다.`
- `같은 식품도 ___회 먹는지에 따라 계산 결과가 달라집니다.`

**근거 문장 검증:** 빈칸은 앱이 제공하는 선택지(식품명·숫자·조건 문구)만으로 채운다. 미션 3·5 완료 시 조립된 숫자(제공량·당류 합·나트륨 합)가 현재 선택·합계와 일치해야 한다. 불일치면 완료되지 않고 절차 안내 피드백을 보여 준다.

## 8. 시각 · UX

- CSS 변수: 민트·코랄 포인트, 밝은 배경, 큰 터치 타깃
- `1회 기준` / `포장 전체` 배지 크게
- 당류·나트륨은 색 + 아이콘 + 열 제목 + 단위로 구분
- 식품은 단순 일러스트(이모지/아이콘) + 텍스트 영양표시. 실사·브랜드 금지
- 건강 점수·빨간 경고·낙인 표현 금지
- 애니메이션: 주문 카드 추가 정도의 짧은 전환, `prefers-reduced-motion` 지원
- 터치 44px+, 키보드 전 흐름, 화면 낭독 라벨 제공

## 9. 안전 · 윤리

- 개인 건강·체중·질병·알레르기 미수집
- 특정 식품을 좋음/나쁨으로 단정하지 않음
- 미션 조건은 가상 상한만 사용 (공식 권장량 미사용)
- “제한/금지”보다 “주어진 조건을 만족하는 조합” 언어 사용
- 학생 간 식단 순위 없음

## 10. 검증 계획

1. **계산 단위 테스트 (Vitest):** 포장 전체값, 선택량, 상한 초과, 단위 분리
2. **조건 판정 테스트:** 복수 정답, 부분 만족, 구성 조건
3. **콘텐츠 검수:** 가상 고지, 낙인·브랜드 없음, 금융 앱 흐름과 비중복
4. **UI 스모크:** 시작→0~5→결과, 스테퍼, 모바일 단계형, 업데이트 내역, 허브 해금, 새로고침 초기화

## 11. 완료 조건

- [ ] 서버 없이 미션 0~5 + 결과 카드 동작
- [ ] 1회/전체 구분 및 선택 전 기준 확인 게이트
- [ ] 당류·나트륨 분리 합산, 복수 정답 인정
- [ ] 가격·예산 요소 없음
- [ ] 낙인·권장량·브랜드·개인 건강 입력 없음
- [ ] 색 비의존 표현 + 키보드/모바일 지원
- [ ] 업데이트 내역 버튼
- [ ] 파일당 500줄 이하
- [ ] Vitest 계산·조건 테스트 통과

## 12. 구현 순서 (계획 단계에서 상세화)

1. Vite+React+TS 스캐폴드 및 디자인 토큰 CSS
2. `data/` 식품·조건·피드백·업데이트 내역
3. `lib/` 계산·검증 + Vitest
4. 공통 UI (`FoodLabelCard`, `MissionShell` 등)
5. 시작·미션 0~2
6. 미션 3~5·결과 카드·근거 문장
7. 허브 해금·접근성·업데이트 내역
8. UI 스모크 및 콘텐츠 검수

## 13. 비범위 (YAGNI)

- 백엔드, 로그인, 반/학생 계정
- AI 코칭, 외부 영양 API
- PWA/오프라인 패키징 (요청 시 후속)
- React Router 딥링크 (요청 시 후속)
- 열량·지방·단백질 등 추가 영양소
- 실제 권장량·의료 가이드 연동
