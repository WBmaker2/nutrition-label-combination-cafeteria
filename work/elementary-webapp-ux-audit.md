# 영양표시 조합 식당 UX·코드 기준선 감사

- 감사일: 2026-08-31
- 모드: full
- 주 페르소나: 초등 5–6학년 서윤(10–12세)
- 기준선 URL: https://wbmaker2.github.io/nutrition-label-combination-cafeteria/
- 브라우저: Codex 인앱 브라우저, 데스크톱 기준선과 미션 0 DOM snapshot
- VoiceOver: 제외
- 시뮬레이션: not-needed — 고정 식품 수치와 선택·계산 활동이 목표에 직접 대응하며 새 물리/시간 시뮬레이션이 필요하지 않음
- 이미지: not-needed — 기존 이모지 식품 표지가 화면 맥락을 제공하고, 새 이미지가 수치·정답·사실을 대신하지 않도록 함

## 기준선 관찰

| 상태 | 보이는 단서 | 행동 | 관찰 결과 | 증거 |
| --- | --- | --- | --- | --- |
| entry | 제목, 영양표시 학습 목표, 미션 시작하기 | 시작 버튼 클릭 | 미션 0으로 이동 | 공개 URL DOM snapshot |
| mission 0 / unanswered | 눌러 확인, 눌러 찾기 | 카드의 네 항목을 찾는 활동 시작 | 버튼 이름과 카드 라벨에 정답 수치가 함께 노출됨 | article[aria-label], button accessible name |
| mission 0 / incomplete | 아직 찾지 않은 항목을 눌러 주세요 | 일부 항목 확인 | 완료 버튼은 비활성, 다음 회복 행동은 보임 | button 완료 [disabled] |
| console | 없음 | entry → mission 0 | 오류·경고 없음 | browser dev logs |
| source tests | 없음 | npm test | .worktrees/** 중복 수집으로 3개 실패, npm test -- --dir src는 통과 | command output |

## 이슈 장부

| ID | 심각도 | 상태 | 영역 | 문제와 학습자 영향 | 근거/수정 방향 |
| --- | --- | --- | --- | --- | --- |
| EDU-UX-001 | P1 | fixed | 학습 로직 | servingMode, requiredFoodIds가 조건 판정에 반영되지 않아 한 회분 조건에서 여러 회분 선택이나 필수 식품 누락이 통과할 수 있음 | `src/lib/mealValidation.ts`와 순수 회귀 테스트로 모드·필수 ID·제공량 범위 판정 |
| EDU-UX-002 | P1 | fixed | 테스트/출시 | 기본 npm test가 .worktrees/**의 다른 React 복사본을 수집해 Invalid hook call로 실패함 | Vitest include/exclude와 메모리 Storage setup 정비 |
| EDU-UX-003 | P2 | fixed | 단계 흐름 | 좁은 화면 단계 탭에서 선행 조건 없이 제공량·합계로 점프 가능 | `MealBuilder.tsx`의 방문 가능 상태와 disabled/ARIA 연결 |
| EDU-UX-004 | P1 | fixed | 미션 완료 | 미션 3은 조건·배지·숫자만 확인하고 근거 문장을 요구하지 않아 설계 계약과 불일치 | `Mission3SchoolSnack.tsx`에 조건 문구·식품명 검증 추가 |
| EDU-UX-005 | P2 | fixed | 상태 계산 | 빈 선택 배열의 every()가 true여서 초기 표시 확인 단계가 완료처럼 보임 | `useMealInvestigation.ts`에서 선택 1개 이상 조건 적용 |
| EDU-UX-006 | P2 | fixed | 콘텐츠/회복 | 미션 1의 모든 오답을 “1회 숫자만 고른 것”으로 설명해 다른 오답 원인을 구분하지 못함 | `Mission1WholePackage.tsx`에 오답 유형별 단서 적용 |
| EDU-UX-007 | P2 | fixed | 학습 의도/ARIA | 미션 0 찾기 전 정답 값이 버튼과 카드 aria-label에 노출되어 관찰 활동을 약화함 | `FoodLabelCard.tsx`, `accessibilityLabels.ts`에서 미확인 값을 숨김 |
| EDU-UX-008 | P2 | fixed | 접근성 | 진행바 설명/미션 점 번호가 혼동되고, 스테퍼 그룹에 식품명이 없으며 현재 값 상태가 즉시 전달되지 않음 | 1-based 진행 설명, 식품명 포함 그룹 라벨, aria-live 적용 |
| EDU-UX-009 | P2 | fixed | 접근성 | 업데이트 모달에 포커스 이동·Escape·복원 계약이 없음 | `UpdateLogModal.tsx`에 포커스 관리와 Escape 닫기 적용 |
| EDU-UX-010 | P2 | fixed | 결과/전이 | 결과 문자열이 한 덩어리이며 복사·다음 학습 행동이 약함 | `ResultCard.tsx`에 줄 단위 목록, 복사 fallback, 다음 행동 적용 |
| EDU-UX-011 | P2 | fixed | 디자인 | 903줄 CSS가 단일 파일이고 raw 색/상태/모션 토큰이 섞여 있음. 시작 CTA 위계와 상태별 hover/active가 약함 | 토큰·기본·학습·결과·진행·모션 반응형 스타일로 분리 |
| EDU-UX-012 | P2 | fixed | 반응형/동작 | 모바일 핵심 버튼·단계 상태가 일관된 gi-pulse와 최소 터치 크기로 안내되지 않음 | 핵심 행동 펄스, 44px 터치 기준, reduced-motion 적용 |
| EDU-UX-013 | P3 | fixed | 메타데이터 | favicon, description, theme-color가 부족함 | `index.html`, `public/favicon.svg` 보강 |

## 문구 감사 요약

자동 후보 수집은 [elementary-webapp-ux-language-candidates.md](./elementary-webapp-ux-language-candidates.md)에 남겼습니다. 적용할 변환은 다음 원칙을 따릅니다.

| 상태 | 기존 표현 | 개선 방향 | 신호 | 정확성 |
| --- | --- | --- | --- | --- |
| 미션 0 / 찾기 전 | 눌러 찾기 · 8g | 당류 값 확인하기 | technical/정답 선노출 | 교과 수치 보존, 클릭 후 표시 |
| 조건 체크 | 구성: drink 포함 | 구성: 음료 포함 | 내부 용어 | confirmed |
| 조건 체크 | 제공량 범위 확인 | 제공량: 1회씩 맞추기 또는 제공량: 포장 전체로 맞추기 | abstract/formal | confirmed |
| 미션 1 오답 | 모든 오답에 1회 숫자만 고른 것 같아요 | 1회 값, 곱셈 결과, 당류/나트륨 값에 따라 단서 분기 | ambiguous feedback | confirmed |
| 결과 | 내가 한 일 보기 안의 긴 문자열 | 활동 기록 목록 + 결과 복사 | dense/recovery | 수치 보존 |

## 기준선 초기 수용 판단

## 구현 후 확인

- P0/P1 미해결: 없음.
- 정적 검증: `npm test` 21/21, `npm run typecheck`, `npm run build`, `git diff --check` 통과.
- 로컬 학습자 흐름: 시작 → 미션 0 찾기 전 숨김/확인 → 미션 1 오답 단서 → 미션 3 제공량 단계 잠금 → 조건 문장·숫자 완료까지 통과.
- 좁은 화면: 375px에서 가로 넘침 없음. 브라우저 viewport 최소 폭 제약으로 320px은 별도 캡처하지 못했으며, CSS media rule과 375px DOM 측정으로 대체 확인했습니다.
- 핵심 행동: 시작 화면의 활성 `key-action`에 `gi-pulse` 애니메이션이 적용됨.
- 키보드: semantic 버튼의 `focus-visible` 포커스는 확인했으나 인앱 브라우저 키 이벤트 어댑터가 React 활성화를 재현하지 못해 실제 교실 기기 수동 확인으로 남겼습니다.
- 릴리스 PR [#1](https://github.com/WBmaker2/nutrition-label-combination-cafeteria/pull/1)이 `d8bf0a6`으로 병합되었고, Pages 실행 [33390351016](https://github.com/WBmaker2/nutrition-label-combination-cafeteria/actions/runs/33390351016)이 build/deploy 모두 성공했습니다.
- 공개 URL에서 HTTP 200, 제목 `영양표시 조합 식당`, H1, description, favicon, subpath CSS/JS와 375px 가로 넘침 없음을 확인했습니다.
- 최종 수용 기록: [elementary-webapp-ux-acceptance.md](./elementary-webapp-ux-acceptance.md)

따라서 현재 로컬 구현 기준 수용 판단은 **pass**입니다. 실제 공개 서비스 반영은 별도 릴리스 승인 뒤 공개 learner-path와 Pages/CI를 다시 확인해야 합니다.
