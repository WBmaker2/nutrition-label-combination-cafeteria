# Learner Text Inventory

- Root: `/Volumes/ External Drive 256G/Dev2/cursor/nutrition-label-combination-cafeteria`
- Files scanned: `38`
- Candidates: `362`
- Status: `triage only`; not a grade-level certification or automatic rewrite.

## Candidate strings

| Source | Surface | Text | Role hints | Review signals |
| --- | --- | --- | --- | --- |
| index.html:1:28 | text | ko | learner-text-candidate | — |
| index.html:1:53 | text | UTF-8 | learner-text-candidate | technical-or-internal |
| index.html:1:73 | text | viewport | learner-text-candidate | — |
| index.html:1:92 | text | width=device-width,initial-scale=1.0 | learner-text-candidate | technical-or-internal |
| index.html:1:138 | text | 영양표시 조합 식당 | learner-text-candidate | repeated-text |
| src/data/feedbackRules.ts:3:6 | text | 이 숫자는 1회 제공량 기준이에요. 포장 전체는 몇 회분인지 확인해 보세요. | learner-text-candidate | — |
| src/data/feedbackRules.ts:4:22 | text | 한 포장에 들어 있는 총 제공량보다 많이 선택할 수는 없어요. | learner-text-candidate | repeated-text |
| src/data/feedbackRules.ts:5:16 | text | 당류는 g끼리, 나트륨은 mg끼리 따로 더해 보세요. | learner-text-candidate | — |
| src/data/feedbackRules.ts:6:17 | text | 합계 뒤에 g 또는 mg 단위를 붙여 보세요. | learner-text-candidate | — |
| src/data/feedbackRules.ts:7:17 | text | 식품 이름보다 영양표시의 기준과 숫자를 먼저 확인해 보세요. | learner-text-candidate | — |
| src/data/feedbackRules.ts:8:22 | text | 당류와 나트륨 조건을 모두 확인했나요? | learner-text-candidate | — |
| src/data/feedbackRules.ts:9:19 | text | 제공량을 확인하고 두 영양소를 따로 계산했어요. | learner-text-candidate | multiple-actions |
| src/data/feedbackRules.ts:10:25 | text | 조립한 숫자가 현재 선택·합계와 일치하는지 다시 확인해 보세요. | learner-text-candidate | multiple-actions, repeated-text |
| src/data/feedbackRules.ts:11:23 | text | 표시 기준과 단위를 다시 확인해 보세요. | learner-text-candidate | — |
| src/data/foodCards.test.ts:17:25 | text | cereal | learner-text-candidate | repeated-text |
| src/data/foodCards.test.ts:100:21 | text | servingsExceeded | feedback-or-error | repeated-text |
| src/data/foodCards.test.ts:104:21 | text | servingsExceeded | feedback-or-error | repeated-text |
| src/data/foodCards.test.ts:106:32 | text | servingsExceeded | feedback-or-error | repeated-text |
| src/data/foodCards.test.ts:107:8 | text | 한 포장에 들어 있는 총 제공량보다 많이 선택할 수는 없어요. | learner-text-candidate | repeated-text |
| src/data/foodCards.test.ts:120:11 | text | accessibilityLabels | learner-text-candidate | — |
| src/data/foodCards.test.ts:121:7 | text | formats cereal aria label | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/data/foodCards.test.ts:122:43 | text | cereal | learner-text-candidate | repeated-text |
| src/data/foodCards.test.ts:123:8 | text | 바삭 시리얼, 1회 제공량 30g, 총 3회, 당류 8g, 나트륨 90mg | learner-text-candidate | — |
| src/data/foodCards.ts:6:12 | text | 바삭 시리얼 | learner-text-candidate | — |
| src/data/foodCards.ts:16:12 | text | 가상 수치이며 실제 제품 추천이 아닙니다. | learner-text-candidate | repeated-text |
| src/data/foodCards.ts:20:12 | text | 새콤 요거트 | learner-text-candidate | — |
| src/data/foodCards.ts:30:12 | text | 가상 수치이며 실제 제품 추천이 아닙니다. | learner-text-candidate | repeated-text |
| src/data/foodCards.ts:34:12 | text | 고소 크래커 | learner-text-candidate | — |
| src/data/foodCards.ts:44:12 | text | 가상 수치이며 실제 제품 추천이 아닙니다. | learner-text-candidate | repeated-text |
| src/data/foodCards.ts:48:12 | text | 달콤 주스 | learner-text-candidate | — |
| src/data/foodCards.ts:58:12 | text | 가상 수치이며 실제 제품 추천이 아닙니다. | learner-text-candidate | repeated-text |
| src/data/foodCards.ts:62:12 | text | 담백 샌드 | learner-text-candidate | — |
| src/data/foodCards.ts:72:12 | text | 가상 수치이며 실제 제품 추천이 아닙니다. | learner-text-candidate | repeated-text |
| src/data/foodCards.ts:76:12 | text | 과일 컵 | learner-text-candidate | — |
| src/data/foodCards.ts:86:12 | text | 가상 수치이며 실제 제품 추천이 아닙니다. | learner-text-candidate | repeated-text |
| src/data/mealConditions.ts:5:11 | text | 학교 간식 조합 | learner-text-candidate | repeated-text |
| src/data/mealConditions.ts:11:17 | text | 음료 1회 + 간식 슬롯 1회, 당류 28g 이하, 나트륨 200mg 이하 | learner-text-candidate | — |
| src/data/mealConditions.ts:16:11 | text | 영양표시 조합 식당 최종 주문 | learner-text-candidate | repeated-text |
| src/data/mealConditions.ts:21:17 | text | 당류 30g 이하, 나트륨 400mg 이하, 음료 포함 | learner-text-candidate | — |
| src/data/updateLog.ts:2:32 | text | 최초 MVP 설계: 영양표시 기준 확인과 식단 조합 | learner-text-candidate | technical-or-internal |
| src/data/updateLog.ts:3:32 | text | 표시판 읽기·포장 전체 계산·5개 조합 미션 추가 | learner-text-candidate | — |
| src/data/updateLog.ts:7:4 | text | 1회 제공량은 한 번 먹는 기준 양이고, 총 제공량은 이 포장 안에 몇 번 먹을 양이 들어 있는지 나타냅니다. | learner-text-candidate | long-or-dense |
| src/features/nutrition-label-cafeteria/ConditionChecklist.tsx:23:15 | text | 당류 합 ≤ ${condition.maxSugarGram}g | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/ConditionChecklist.tsx:30:15 | text | 나트륨 합 ≤ ${condition.maxSodiumMilligram}mg | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/ConditionChecklist.tsx:37:15 | text | 구성: ${condition.requiredCategories.join(', ')} 포함 | learner-text-candidate | abstract-or-formal, long-or-dense |
| src/features/nutrition-label-cafeteria/ConditionChecklist.tsx:44:15 | text | 음료 1회 + 간식 슬롯 1회 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/ConditionChecklist.tsx:51:15 | text | 제공량 범위 확인 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/ConditionChecklist.tsx:57:66 | aria-label | 조건 확인 | aria-label | — |
| src/features/nutrition-label-cafeteria/ConditionChecklist.tsx:60:56 | text | {item.ok ? '⭐' : '○'} | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/ConditionChecklist.tsx:62:18 | text | {' '} {item.label}: {item.ok ? '잘했어요!' : '아직이에요'} | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/ConditionChecklist.tsx:63:37 | text | 잘했어요! | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/ConditionChecklist.tsx:63:47 | text | 아직이에요 | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/ExplanationBuilder.tsx:37:15 | text | 근거 문장 만들기 (숫자만 고르기) | learner-text-candidate | multiple-actions |
| src/features/nutrition-label-cafeteria/ExplanationBuilder.tsx:55:43 | text | 이 조합의 당류 합은{' '} | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/ExplanationBuilder.tsx:57:85 | text | g, 나트륨 합은{' '} | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/ExplanationBuilder.tsx:61:18 | text | mg입니다. | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/ExplanationBuilder.tsx:65:12 | text | 당류 (g) — 숫자 고르기 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/ExplanationBuilder.tsx:66:57 | aria-label | 당류 숫자 고르기 | aria-label | — |
| src/features/nutrition-label-cafeteria/ExplanationBuilder.tsx:73:14 | text | {n}g | button-or-action | repeated-text |
| src/features/nutrition-label-cafeteria/ExplanationBuilder.tsx:80:12 | text | 나트륨 (mg) — 숫자 고르기 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/ExplanationBuilder.tsx:81:57 | aria-label | 나트륨 숫자 고르기 | aria-label | — |
| src/features/nutrition-label-cafeteria/ExplanationBuilder.tsx:88:14 | text | {n}mg | button-or-action | repeated-text |
| src/features/nutrition-label-cafeteria/ExplanationBuilder.tsx:93:13 | text | {assembled && !match && ( | feedback-or-error | — |
| src/features/nutrition-label-cafeteria/ExplanationBuilder.tsx:95:33 | text | 조립한 숫자가 현재 선택·합계와 일치하는지 다시 확인해 보세요. | feedback-or-error | multiple-actions, repeated-text |
| src/features/nutrition-label-cafeteria/ExplanationBuilder.tsx:95:72 | text | )} {match && ( | feedback-or-error | — |
| src/features/nutrition-label-cafeteria/ExplanationBuilder.tsx:98:73 | text | ⭐ 맞아요! 제공량을 확인하고 두 영양소를 따로 계산했어요. | feedback-or-error | multiple-actions |
| src/features/nutrition-label-cafeteria/FoodLabelCard.tsx:6:27 | text | serving | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/FoodLabelCard.tsx:6:39 | text | package | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/FoodLabelCard.tsx:6:51 | text | sugar | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/FoodLabelCard.tsx:6:61 | text | sodium | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/FoodLabelCard.tsx:27:33 | text | piece | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/FoodLabelCard.tsx:28:10 | text | ${food.label.servingAmount}개 | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/FoodLabelCard.tsx:29:10 | text | ${food.label.servingAmount}${food.label.servingUnit} | learner-text-candidate | long-or-dense, repeated-text |
| src/features/nutrition-label-cafeteria/FoodLabelCard.tsx:54:46 | text | 👇 아래 버튼을 눌러 확인해 주세요 | learner-text-candidate | multiple-actions |
| src/features/nutrition-label-cafeteria/FoodLabelCard.tsx:64:10 | text | {confirmed?.serving ? '✓ ' : '눌러 확인 · '}1회 제공량 · {unit} | button-or-action | multiple-actions |
| src/features/nutrition-label-cafeteria/FoodLabelCard.tsx:65:41 | text | 눌러 확인 · | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/FoodLabelCard.tsx:72:10 | text | {confirmed?.package ? '✓ ' : '눌러 확인 · '}총 제공량 · {food.label.servingsPerPackage} 회 | button-or-action | long-or-dense, multiple-actions |
| src/features/nutrition-label-cafeteria/FoodLabelCard.tsx:73:41 | text | 눌러 확인 · | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/FoodLabelCard.tsx:80:17 | text | 🍬 당류 (g) | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/FoodLabelCard.tsx:81:17 | text | 🧂 나트륨 (mg) | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/FoodLabelCard.tsx:86:17 | text | {findMode ? ( | button-or-action | repeated-text |
| src/features/nutrition-label-cafeteria/FoodLabelCard.tsx:93:18 | text | {confirmed?.sugar ? `✓ ${food.label.sugarGram}g` : `눌러 찾기 · ${food.label.sugarGram}g`} | button-or-action | long-or-dense |
| src/features/nutrition-label-cafeteria/FoodLabelCard.tsx:94:40 | text | ✓ ${food.label.sugarGram}g | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/FoodLabelCard.tsx:94:71 | text | 눌러 찾기 · ${food.label.sugarGram}g | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/FoodLabelCard.tsx:95:26 | text | ) : ( `${food.label.sugarGram}g` )} | button-or-action | — |
| src/features/nutrition-label-cafeteria/FoodLabelCard.tsx:97:18 | text | ${food.label.sugarGram}g | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/FoodLabelCard.tsx:100:17 | text | {findMode ? ( | button-or-action | repeated-text |
| src/features/nutrition-label-cafeteria/FoodLabelCard.tsx:107:18 | text | {confirmed?.sodium ? `✓ ${food.label.sodiumMilligram}mg` : `눌러 찾기 · ${food.label.sodiumMilligram}mg`} | button-or-action | long-or-dense |
| src/features/nutrition-label-cafeteria/FoodLabelCard.tsx:109:24 | text | ✓ ${food.label.sodiumMilligram}mg | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/FoodLabelCard.tsx:110:24 | text | 눌러 찾기 · ${food.label.sodiumMilligram}mg | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/FoodLabelCard.tsx:111:26 | text | ) : ( `${food.label.sodiumMilligram}mg` )} | button-or-action | — |
| src/features/nutrition-label-cafeteria/FoodLabelCard.tsx:113:18 | text | ${food.label.sodiumMilligram}mg | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/FoodLabelCard.tsx:118:15 | text | {onSelect && ( | button-or-action | — |
| src/features/nutrition-label-cafeteria/FoodLabelCard.tsx:125:10 | text | {selected ? '선택 해제' : '이 식품 고르기'} | button-or-action | multiple-actions |
| src/features/nutrition-label-cafeteria/FoodLabelCard.tsx:126:24 | text | 선택 해제 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/FoodLabelCard.tsx:126:34 | text | 이 식품 고르기 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/FoodLabelCard.tsx:148:38 | text | { const result = assertServingsInRange(next, food) if (!result.ok) { onBoundaryFeedback?.(getFeedbackMessage(result.feedbackKey)) return } onBoundaryFeedback?.('') onChange(Math.min(max, next)) } return ( | feedback-or-error | long-or-dense |
| src/features/nutrition-label-cafeteria/FoodLabelCard.tsx:159:55 | aria-label | 제공량 선택 | aria-label | — |
| src/features/nutrition-label-cafeteria/FoodLabelCard.tsx:168:39 | text | {value}회 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/MealBuilder.tsx:70:17 | text | {!badgeOk(food.id) && ( | hint | repeated-text, technical-or-internal |
| src/features/nutrition-label-cafeteria/MealBuilder.tsx:72:39 | text | 제공량을 정하기 전에 「눌러 확인」으로 1회·총 제공량을 확인해 주세요. | hint | multiple-actions |
| src/features/nutrition-label-cafeteria/MealBuilder.tsx:100:47 | text | 단계 {step === 'select' ? '1' : step === 'servings' ? '2' : '3'} / 3 —{' '} {step === 'select' ? '식품 선택' : step === 'servings' ? '제공량' : '합계'} | learner-text-candidate | long-or-dense |
| src/features/nutrition-label-cafeteria/MealBuilder.tsx:102:31 | text | 식품 선택 | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/MealBuilder.tsx:102:63 | text | 제공량 | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/MealBuilder.tsx:102:71 | text | 합계 | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/MealBuilder.tsx:104:61 | aria-label | 식사 구성 단계 | aria-label | abstract-or-formal |
| src/features/nutrition-label-cafeteria/MealBuilder.tsx:113:12 | text | {i + 1}. {s === 'select' ? '식품 선택' : s === 'servings' ? '제공량' : '합계'} | button-or-action | long-or-dense |
| src/features/nutrition-label-cafeteria/MealBuilder.tsx:114:41 | text | 식품 선택 | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/MealBuilder.tsx:114:70 | text | 제공량 | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/MealBuilder.tsx:114:78 | text | 합계 | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/MealBuilder.tsx:122:47 | text | s.foodId === food.id) return ( | learner-text-candidate | technical-or-internal |
| src/features/nutrition-label-cafeteria/MealBuilder.tsx:142:12 | text | 제공량으로 | button-or-action | repeated-text |
| src/features/nutrition-label-cafeteria/MealBuilder.tsx:157:17 | text | {!badgeOk(food.id) && ( | hint | repeated-text, technical-or-internal |
| src/features/nutrition-label-cafeteria/MealBuilder.tsx:159:37 | text | 「눌러 확인」을 누른 뒤에 제공량을 정할 수 있어요. | hint | multiple-actions |
| src/features/nutrition-label-cafeteria/MealBuilder.tsx:172:85 | text | select | button-or-action | — |
| src/features/nutrition-label-cafeteria/MealBuilder.tsx:172:95 | text | 선택으로 | button-or-action | — |
| src/features/nutrition-label-cafeteria/MealBuilder.tsx:175:83 | text | summary | button-or-action | — |
| src/features/nutrition-label-cafeteria/MealBuilder.tsx:175:94 | text | 합계로 | button-or-action | — |
| src/features/nutrition-label-cafeteria/MealBuilder.tsx:184:14 | text | 당류 합: {totals.sugarGram}g · 나트륨 합: {totals.sodiumMilligram}mg | learner-text-candidate | long-or-dense, repeated-text |
| src/features/nutrition-label-cafeteria/MealBuilder.tsx:189:33 | text | {food.name}: {selection.servingsChosen}회 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/MealBuilder.tsx:194:83 | text | servings | button-or-action | — |
| src/features/nutrition-label-cafeteria/MealBuilder.tsx:194:95 | text | 제공량으로 | button-or-action | repeated-text |
| src/features/nutrition-label-cafeteria/MealBuilder.tsx:206:12 | text | 당류 합: {totals.sugarGram}g · 나트륨 합: {totals.sodiumMilligram}mg | learner-text-candidate | long-or-dense, repeated-text |
| src/features/nutrition-label-cafeteria/MealBuilder.tsx:208:13 | text | )} {servingFeedback && ( | feedback-or-error | — |
| src/features/nutrition-label-cafeteria/MealBuilder.tsx:224:10 | text | 처음부터 다시 계산 | button-or-action | — |
| src/features/nutrition-label-cafeteria/MissionHub.tsx:18:11 | text | 미션 모음 | heading | repeated-text |
| src/features/nutrition-label-cafeteria/MissionHub.tsx:20:42 | text | { const unlocked = isUnlocked(id) return ( | button-or-action | technical-or-internal |
| src/features/nutrition-label-cafeteria/MissionHub.tsx:29:45 | text | linear | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/MissionHub.tsx:29:56 | text | 이전 미션을 먼저 완료해 보세요 | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/MissionHub.tsx:31:21 | text | 미션 {id} | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/features/nutrition-label-cafeteria/MissionHub.tsx:32:39 | text | {!unlocked && mode === 'linear' && ( | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/MissionHub.tsx:34:40 | text | 이전 미션을 먼저 완료해 보세요 | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/MissionHub.tsx:36:37 | text | 완료 | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/MissionHub.tsx:41:72 | text | 처음으로 | button-or-action | repeated-text |
| src/features/nutrition-label-cafeteria/MissionPhaseGuide.tsx:8:45 | aria-label | 미션 단계 | aria-label | — |
| src/features/nutrition-label-cafeteria/MissionPhaseGuide.tsx:14:58 | text | {p.done ? '⭐' : i + 1} | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/MissionProgressBar.tsx:15:52 | text | 미션 진행 ${done} / ${MISSION_COUNT} | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/MissionProgressBar.tsx:17:17 | text | 미션 {currentId + 1} / {MISSION_COUNT} | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/features/nutrition-label-cafeteria/MissionProgressBar.tsx:20:33 | text | {missionTitles[currentId]} | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/features/nutrition-label-cafeteria/MissionProgressBar.tsx:21:33 | text | 완료 {done}개 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/MissionProgressBar.tsx:33:26 | text | 미션 ${i}${completed[i] ? ' 완료' : i === currentId ? ' 진행 중' : ''} | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/nutrition-label-cafeteria/MissionShell.tsx:23:23 | text | {message && | heading, hint | — |
| src/features/nutrition-label-cafeteria/MissionShell.tsx:24:52 | text | } {children} {!canFinish && finishHint && ( | hint | — |
| src/features/nutrition-label-cafeteria/MissionShell.tsx:27:50 | text | 아직: {finishHint} | hint | — |
| src/features/nutrition-label-cafeteria/MissionShell.tsx:32:74 | text | 뒤로 | button-or-action | — |
| src/features/nutrition-label-cafeteria/MissionShell.tsx:35:96 | text | 완료 | button-or-action | repeated-text |
| src/features/nutrition-label-cafeteria/NutritionLabelCafeteriaApp.tsx:28:35 | text | void }) { switch (id) { case 0: return | learner-text-candidate | technical-or-internal |
| src/features/nutrition-label-cafeteria/NutritionLabelCafeteriaApp.tsx:32:75 | text | case 1: return | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/NutritionLabelCafeteriaApp.tsx:42:76 | text | default: return null } } export function NutritionLabelCafeteriaApp() { const progress = useMissionProgress() const [screen, setScreen] = useState | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/nutrition-label-cafeteria/NutritionLabelCafeteriaApp.tsx:75:32 | text | 알록달록 학교 식당 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/NutritionLabelCafeteriaApp.tsx:76:13 | text | 영양표시 조합 식당 | heading | repeated-text |
| src/features/nutrition-label-cafeteria/NutritionLabelCafeteriaApp.tsx:78:39 | text | 연습용 가상 숫자예요. 진짜 건강·체중·알레르기 정보는 넣지 않아요. | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/ResultCard.tsx:2:7 | text | 표시판에서 네 가지를 잘 찾았어요! 다음으로 포장 전체를 계산해 볼까요? | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/ResultCard.tsx:3:7 | text | 포장 전체는 1회 숫자 × 총 제공량이에요. 잘했어요! | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/ResultCard.tsx:4:7 | text | 당류는 g끼리, 나트륨은 mg끼리만 비교해요. 잘 구분했어요! | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/ResultCard.tsx:5:7 | text | 다른 조합도 조건을 만족할까요? 미션 모음에서 다시 연습해 보세요. | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/ResultCard.tsx:6:7 | text | 같은 식품도 몇 회 먹는지에 따라 합계가 달라져요. | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/ResultCard.tsx:7:7 | text | 영양표시를 보고 조합을 고르는 연습을 마쳤어요. 멋져요! | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/ResultCard.tsx:35:45 | text | 미션 완료! | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/ResultCard.tsx:36:36 | text | 미션 {missionId} 잘했어요! | heading | missing-term-explanation, technical-or-internal |
| src/features/nutrition-label-cafeteria/ResultCard.tsx:37:34 | text | {FOLLOW_UP[missionId] ?? '다음 미션으로 가 볼까요?'} | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/features/nutrition-label-cafeteria/ResultCard.tsx:37:60 | text | 다음 미션으로 가 볼까요? | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/ResultCard.tsx:39:18 | text | 내가 한 일 보기 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/ResultCard.tsx:42:47 | text | {showNext ? ( | button-or-action | — |
| src/features/nutrition-label-cafeteria/ResultCard.tsx:44:90 | text | 다음 미션으로 → | button-or-action | — |
| src/features/nutrition-label-cafeteria/ResultCard.tsx:46:20 | text | ) : hubUnlocked ? ( | button-or-action | — |
| src/features/nutrition-label-cafeteria/ResultCard.tsx:48:89 | text | 미션 모음 보기 | button-or-action | — |
| src/features/nutrition-label-cafeteria/ResultCard.tsx:52:82 | text | 처음으로 | button-or-action | repeated-text |
| src/features/nutrition-label-cafeteria/ResultCard.tsx:54:20 | text | )} {showNext && hubUnlocked && ( | button-or-action | — |
| src/features/nutrition-label-cafeteria/ResultCard.tsx:57:71 | text | 미션 모음 | button-or-action | repeated-text |
| src/features/nutrition-label-cafeteria/ResultCard.tsx:59:20 | text | )} {(showNext \|\| hubUnlocked) && ( | button-or-action | — |
| src/features/nutrition-label-cafeteria/ResultCard.tsx:62:73 | text | 처음으로 | button-or-action | repeated-text |
| src/features/nutrition-label-cafeteria/StartScreen.tsx:30:35 | text | 오늘 식판에 올릴 간식을 골라 볼까요? | heading | — |
| src/features/nutrition-label-cafeteria/StartScreen.tsx:31:33 | text | 영양표시의 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/StartScreen.tsx:32:23 | text | 1회 제공량 | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/StartScreen.tsx:32:38 | text | 과 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/StartScreen.tsx:32:48 | text | 총 제공량 | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/StartScreen.tsx:32:62 | text | 을 보고, 당류(g)와 나트륨(mg)을 따로 계산해 보는 학교 식당 놀이예요. | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/StartScreen.tsx:36:53 | text | 저장됨: 미션 {completedCount} / {MISSION_COUNT} 완료 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/StartScreen.tsx:41:18 | text | 시작 전에 알아두기 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/StartScreen.tsx:45:80 | text | {resume ? '이어서 하기' : '미션 시작하기'} | button-or-action | — |
| src/features/nutrition-label-cafeteria/StartScreen.tsx:46:22 | text | 이어서 하기 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/StartScreen.tsx:46:33 | text | 미션 시작하기 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/StartScreen.tsx:47:18 | text | {hubUnlocked && ( | button-or-action | — |
| src/features/nutrition-label-cafeteria/StartScreen.tsx:49:75 | text | 미션 모음 | button-or-action | repeated-text |
| src/features/nutrition-label-cafeteria/StartScreen.tsx:55:18 | text | 선생님용 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/StartScreen.tsx:56:73 | text | 업데이트 내역 | button-or-action | repeated-text |
| src/features/nutrition-label-cafeteria/UpdateLogModal.tsx:3:61 | text | void }) { return ( | learner-text-candidate | technical-or-internal |
| src/features/nutrition-label-cafeteria/UpdateLogModal.tsx:5:63 | text | true | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/UpdateLogModal.tsx:5:81 | aria-label | 업데이트 내역 | aria-label | repeated-text |
| src/features/nutrition-label-cafeteria/UpdateLogModal.tsx:7:13 | text | 업데이트 내역 | heading | repeated-text |
| src/features/nutrition-label-cafeteria/UpdateLogModal.tsx:15:73 | text | 닫기 | button-or-action | — |
| src/features/nutrition-label-cafeteria/missionTitles.ts:2:4 | text | 표시판 읽기 훈련 | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/missionTitles.ts:3:4 | text | 한 포장 전체 계산 | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/missionTitles.ts:4:4 | text | 같은 단위끼리 비교 | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/missionTitles.ts:5:4 | text | 학교 간식 조합 | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/missionTitles.ts:6:4 | text | 포장 전체와 실제 선택량 | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/missionTitles.ts:7:4 | text | 영양표시 조합 식당 최종 주문 | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/missions/Mission0ReadLabel.tsx:7:16 | text | 표시판 읽기 훈련 | heading | repeated-text |
| src/features/nutrition-label-cafeteria/missions/Mission0ReadLabel.tsx:8:34 | text | serving | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/missions/Mission0ReadLabel.tsx:8:45 | text | package | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/missions/Mission0ReadLabel.tsx:8:56 | text | sugar | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/missions/Mission0ReadLabel.tsx:8:65 | text | sodium | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/missions/Mission0ReadLabel.tsx:10:13 | text | 1회 제공량 | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/missions/Mission0ReadLabel.tsx:11:13 | text | 총 제공량 | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/missions/Mission0ReadLabel.tsx:12:11 | text | 당류 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission0ReadLabel.tsx:13:12 | text | 나트륨 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission0ReadLabel.tsx:21:35 | text | void }) { const [found, setFound] = useState | learner-text-candidate | technical-or-internal |
| src/features/nutrition-label-cafeteria/missions/Mission0ReadLabel.tsx:23:66 | text | ({ serving: false, package: false, sugar: false, sodium: false, }) const [lastCheer, setLastCheer] = useState | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/nutrition-label-cafeteria/missions/Mission0ReadLabel.tsx:37:19 | text | ${LABELS[kind]} — 잘 찾았어요! | learner-text-candidate | technical-or-internal |
| src/features/nutrition-label-cafeteria/missions/Mission0ReadLabel.tsx:46:16 | text | 카드에서 「눌러 확인」「눌러 찾기」를 눌러 1회 제공량, 총 제공량, 당류, 나트륨을 찾아 보세요. | learner-text-candidate | multiple-actions |
| src/features/nutrition-label-cafeteria/missions/Mission0ReadLabel.tsx:47:44 | text | 아직 찾지 않은 항목을 눌러 주세요 | hint | — |
| src/features/nutrition-label-cafeteria/missions/Mission0ReadLabel.tsx:51:21 | text | 미션 0 완료: ${food.name}의 1회·총 제공량과 당류·나트륨을 확인했습니다. | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission0ReadLabel.tsx:54:90 | text | {lastCheer && !canFinish && | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission0ReadLabel.tsx:57:28 | text | 네 가지를 모두 찾았어요! 멋져요! | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission0ReadLabel.tsx:59:68 | aria-label | 찾은 항목 | aria-label | — |
| src/features/nutrition-label-cafeteria/missions/Mission0ReadLabel.tsx:62:58 | text | {found[key] ? '⭐' : '○'} | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission0ReadLabel.tsx:64:20 | text | {LABELS[key]}: {found[key] ? '잘 찾았어요!' : '아직이에요'} | learner-text-candidate | technical-or-internal |
| src/features/nutrition-label-cafeteria/missions/Mission0ReadLabel.tsx:65:43 | text | 잘 찾았어요! | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission0ReadLabel.tsx:65:55 | text | 아직이에요 | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/missions/Mission0ReadLabel.tsx:69:61 | text | 별 스티커 {foundCount} / {REQUIRED.length} | learner-text-candidate | technical-or-internal |
| src/features/nutrition-label-cafeteria/missions/Mission1WholePackage.tsx:8:16 | text | 한 포장 전체 계산 | heading | repeated-text |
| src/features/nutrition-label-cafeteria/missions/Mission1WholePackage.tsx:72:21 | text | a - b) })() const finishHint = !canFinish ? step | hint | — |
| src/features/nutrition-label-cafeteria/missions/Mission1WholePackage.tsx:77:10 | text | ${food.name}의 「눌러 확인」과 포장 전체 숫자를 맞춰 주세요 | learner-text-candidate | multiple-actions |
| src/features/nutrition-label-cafeteria/missions/Mission1WholePackage.tsx:78:10 | text | 두 식품을 모두 맞춰 주세요 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission1WholePackage.tsx:86:10 | text | 식품 ${step + 1}/${IDS.length}: ${food.name} — 「눌러 확인」 후 포장 전체 숫자를 골라 보세요. | learner-text-candidate | long-or-dense, multiple-actions, technical-or-internal |
| src/features/nutrition-label-cafeteria/missions/Mission1WholePackage.tsx:94:26 | text | ${a.food.name} 포장 전체: 당류 ${a.sugar}g, 나트륨 ${a.sodium}mg | learner-text-candidate | long-or-dense |
| src/features/nutrition-label-cafeteria/missions/Mission1WholePackage.tsx:99:47 | aria-label | 식품 진행 | aria-label | — |
| src/features/nutrition-label-cafeteria/missions/Mission1WholePackage.tsx:116:30 | text | 1회만: 당류 {food.label.sugarGram}g · 나트륨 {food.label.sodiumMilligram}mg | learner-text-candidate | long-or-dense |
| src/features/nutrition-label-cafeteria/missions/Mission1WholePackage.tsx:118:13 | text | {!ready && | hint | — |
| src/features/nutrition-label-cafeteria/missions/Mission1WholePackage.tsx:119:40 | text | 먼저 「눌러 확인」 버튼을 눌러 주세요. | hint | multiple-actions |
| src/features/nutrition-label-cafeteria/missions/Mission1WholePackage.tsx:119:66 | text | } {ready && ( | hint | — |
| src/features/nutrition-label-cafeteria/missions/Mission1WholePackage.tsx:122:21 | text | {food.name} 포장 전체 확인 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission1WholePackage.tsx:123:38 | text | 계산 힌트: 1회 숫자 × {times}회 = 포장 전체 | hint | — |
| src/features/nutrition-label-cafeteria/missions/Mission1WholePackage.tsx:125:21 | text | 당류 {food.label.sugarGram} × {times} = ? · 나트륨 {food.label.sodiumMilligram} ×{' '} {times} = ? | learner-text-candidate | long-or-dense |
| src/features/nutrition-label-cafeteria/missions/Mission1WholePackage.tsx:130:18 | text | 포장 전체 당류 (g) — 숫자 고르기 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission1WholePackage.tsx:131:64 | text | ${food.name} 당류 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission1WholePackage.tsx:143:20 | text | {n}g | button-or-action | repeated-text |
| src/features/nutrition-label-cafeteria/missions/Mission1WholePackage.tsx:150:18 | text | 포장 전체 나트륨 (mg) — 숫자 고르기 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission1WholePackage.tsx:151:64 | text | ${food.name} 나트륨 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission1WholePackage.tsx:163:20 | text | {n}mg | button-or-action | repeated-text |
| src/features/nutrition-label-cafeteria/missions/Mission1WholePackage.tsx:168:19 | text | {picked.sugar !== null && picked.sodium !== null && !correct && ( | feedback-or-error | long-or-dense, technical-or-internal |
| src/features/nutrition-label-cafeteria/missions/Mission1WholePackage.tsx:170:59 | text | 아쉬워요! 1회 숫자만 고른 것 같아요. × {times} 한 값(포장 전체)을 골라 보세요. | feedback-or-error | — |
| src/features/nutrition-label-cafeteria/missions/Mission1WholePackage.tsx:177:24 | text | 포장 전체 맞아요! 당류 ${current.sugar}g · 나트륨 ${current.sodium}mg | learner-text-candidate | long-or-dense |
| src/features/nutrition-label-cafeteria/missions/Mission1WholePackage.tsx:187:97 | text | 이전 식품 | button-or-action | — |
| src/features/nutrition-label-cafeteria/missions/Mission1WholePackage.tsx:189:20 | text | )} {canAdvance && ( | button-or-action | — |
| src/features/nutrition-label-cafeteria/missions/Mission1WholePackage.tsx:199:12 | text | 다음 식품: {getFoodById(IDS[step + 1]!)!.name} → | button-or-action | technical-or-internal |
| src/features/nutrition-label-cafeteria/missions/Mission1WholePackage.tsx:201:20 | text | )} {ready && !correct && ( | button-or-action | — |
| src/features/nutrition-label-cafeteria/missions/Mission1WholePackage.tsx:207:40 | text | 1회 숫자 × 총 제공량을 계산한 값을 골라 보세요. | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission1WholePackage.tsx:208:12 | text | 확인 힌트 | button-or-action, hint | — |
| src/features/nutrition-label-cafeteria/missions/Mission2CompareUnits.tsx:8:16 | text | 같은 단위끼리 비교 | heading | repeated-text |
| src/features/nutrition-label-cafeteria/missions/Mission2CompareUnits.tsx:49:14 | text | 확인했어요! 이제 당류·나트륨을 따로 비교해 보세요. | learner-text-candidate | multiple-actions |
| src/features/nutrition-label-cafeteria/missions/Mission2CompareUnits.tsx:50:14 | text | 식품마다 「이 식품 확인」을 누르거나, 아래에서 한 번에 확인해 보세요. | learner-text-candidate | multiple-actions |
| src/features/nutrition-label-cafeteria/missions/Mission2CompareUnits.tsx:54:14 | text | 표시 기준을 확인해 주세요 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission2CompareUnits.tsx:56:16 | text | 비교 문제와 퀴즈를 모두 맞춰 주세요 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission2CompareUnits.tsx:63:12 | text | 당류와 나트륨을 분리해 비교했습니다. 서로 다른 단위는 한 합계로 더하지 않습니다. | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission2CompareUnits.tsx:69:78 | text | 세 식품 표시 기준 한 번에 확인 | button-or-action | — |
| src/features/nutrition-label-cafeteria/missions/Mission2CompareUnits.tsx:90:15 | text | {!ok && ( | button-or-action | — |
| src/features/nutrition-label-cafeteria/missions/Mission2CompareUnits.tsx:92:100 | text | 이 식품 확인 (1회·총 제공량) | button-or-action | — |
| src/features/nutrition-label-cafeteria/missions/Mission2CompareUnits.tsx:94:24 | text | )} {ok && | button-or-action, feedback-or-error | — |
| src/features/nutrition-label-cafeteria/missions/Mission2CompareUnits.tsx:96:61 | text | ⭐ {food.name} 표시 확인 완료 | feedback-or-error | — |
| src/features/nutrition-label-cafeteria/missions/Mission2CompareUnits.tsx:97:17 | text | ) })} {!badgesOk && ( | hint | — |
| src/features/nutrition-label-cafeteria/missions/Mission2CompareUnits.tsx:101:29 | text | 표시를 확인한 뒤에 비교·퀴즈를 풀 수 있어요. | hint | multiple-actions |
| src/features/nutrition-label-cafeteria/missions/Mission2CompareUnits.tsx:104:17 | text | 당류(g)가 가장 큰 식품은? | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission2CompareUnits.tsx:113:19 | text | {f.name} ({f.label.sugarGram}g) | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission2CompareUnits.tsx:116:19 | text | ))} {sugarPick && !sugarOk && ( | feedback-or-error | — |
| src/features/nutrition-label-cafeteria/missions/Mission2CompareUnits.tsx:119:49 | text | 다시 보면: 당류(g) 숫자가 가장 큰 식품을 골라 보세요. | feedback-or-error | — |
| src/features/nutrition-label-cafeteria/missions/Mission2CompareUnits.tsx:121:15 | text | )} {sugarOk && | feedback-or-error | — |
| src/features/nutrition-label-cafeteria/missions/Mission2CompareUnits.tsx:123:62 | text | ⭐ 당류 비교 맞아요! | feedback-or-error | — |
| src/features/nutrition-label-cafeteria/missions/Mission2CompareUnits.tsx:126:17 | text | 나트륨(mg)이 가장 큰 식품은? | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission2CompareUnits.tsx:135:19 | text | {f.name} ({f.label.sodiumMilligram}mg) | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission2CompareUnits.tsx:138:19 | text | ))} {sodiumPick && !sodiumOk && ( | feedback-or-error | — |
| src/features/nutrition-label-cafeteria/missions/Mission2CompareUnits.tsx:141:49 | text | 다시 보면: 나트륨(mg) 숫자가 가장 큰 식품을 골라 보세요. (당류와 섞지 마세요) | feedback-or-error | — |
| src/features/nutrition-label-cafeteria/missions/Mission2CompareUnits.tsx:143:15 | text | )} {sodiumOk && | feedback-or-error | — |
| src/features/nutrition-label-cafeteria/missions/Mission2CompareUnits.tsx:145:63 | text | ⭐ 나트륨 비교 맞아요! | feedback-or-error | — |
| src/features/nutrition-label-cafeteria/missions/Mission2CompareUnits.tsx:148:17 | text | 당류 g와 나트륨 mg를 한 합계로 더할 수 있나요? | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission2CompareUnits.tsx:155:17 | text | 아니오 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission2CompareUnits.tsx:156:17 | text | {quiz === 'yes' && ( | feedback-or-error | — |
| src/features/nutrition-label-cafeteria/missions/Mission2CompareUnits.tsx:158:49 | text | {getFeedbackMessage('mixedUnits')} | feedback-or-error | — |
| src/features/nutrition-label-cafeteria/missions/Mission2CompareUnits.tsx:159:34 | text | mixedUnits | feedback-or-error | — |
| src/features/nutrition-label-cafeteria/missions/Mission2CompareUnits.tsx:162:39 | text | 단위를 섞지 않았어요. 잘했어요! | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission3SchoolSnack.tsx:16:16 | text | 학교 간식 조합 | heading | repeated-text |
| src/features/nutrition-label-cafeteria/missions/Mission3SchoolSnack.tsx:53:33 | text | = 2) { setMessage('음료 1개와 간식 슬롯 1개만 선택해 보세요.') return } meal.setSelection(foodId, 1) setMessage('') } const phases = [ { id: 'pick', label: '식품 고르기', done: picked, active: !picked }, { id: 'badge', label: '표시 확인', done: meal.badgesReady, active: picked && !meal.badgesReady, }, { id: 'condition', label: '조건 맞추기', done: evalResult.passed, active: meal.badgesReady && !evalResult.passed, }, { id: 'explain', label: '숫자 고르기', done: numbersOk, active: evalResult.passed && !numbersOk, }, ] return ( | learner-text-candidate | long-or-dense, multiple-actions, technical-or-internal |
| src/features/nutrition-label-cafeteria/missions/Mission3SchoolSnack.tsx:54:19 | text | 음료 1개와 간식 슬롯 1개만 선택해 보세요. | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission3SchoolSnack.tsx:62:12 | text | pick | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/missions/Mission3SchoolSnack.tsx:62:27 | text | 식품 고르기 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission3SchoolSnack.tsx:65:15 | text | 표시 확인 | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/missions/Mission3SchoolSnack.tsx:71:15 | text | 조건 맞추기 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission3SchoolSnack.tsx:77:15 | text | 숫자 고르기 | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/missions/Mission3SchoolSnack.tsx:91:16 | text | 음료 1개 + 간식 1개를 골라 주세요 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission3SchoolSnack.tsx:93:18 | text | 선택한 식품의 「눌러 확인」을 눌러 주세요 | learner-text-candidate | multiple-actions |
| src/features/nutrition-label-cafeteria/missions/Mission3SchoolSnack.tsx:95:20 | text | 조건을 만족하는 조합으로 바꿔 보세요 | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/missions/Mission3SchoolSnack.tsx:96:20 | text | 아래 문장의 숫자를 골라 주세요 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission3SchoolSnack.tsx:102:12 | text | 조건: ${condition.explanation} 당류 합 ${meal.totals.sugarGram}g, 나트륨 합 ${meal.totals.sodiumMilligram}mg 이 조합의 당류 합은 ${meal.totals.sugarGram}g, 나트륨 합은 ${meal.totals.sodiumMilligram}mg입니다. | learner-text-candidate | long-or-dense |
| src/features/nutrition-label-cafeteria/missions/Mission3SchoolSnack.tsx:107:60 | aria-label | 1단계 식품 고르기와 제공량 | aria-label | — |
| src/features/nutrition-label-cafeteria/missions/Mission3SchoolSnack.tsx:108:39 | text | 1–2. 식품 고르기 · 표시 확인 | heading | multiple-actions |
| src/features/nutrition-label-cafeteria/missions/Mission3SchoolSnack.tsx:124:17 | text | {picked && ( | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission3SchoolSnack.tsx:126:62 | aria-label | 3단계 조건 | aria-label | — |
| src/features/nutrition-label-cafeteria/missions/Mission3SchoolSnack.tsx:127:41 | text | 3. 조건 확인 | heading | — |
| src/features/nutrition-label-cafeteria/missions/Mission3SchoolSnack.tsx:131:60 | aria-label | 4단계 숫자 고르기 | aria-label | — |
| src/features/nutrition-label-cafeteria/missions/Mission3SchoolSnack.tsx:132:39 | text | 4. 근거 숫자 고르기 | heading | repeated-text |
| src/features/nutrition-label-cafeteria/missions/Mission4PackageVsChoice.tsx:9:16 | text | 포장 전체와 실제 선택량 | heading | repeated-text |
| src/features/nutrition-label-cafeteria/missions/Mission4PackageVsChoice.tsx:77:16 | text | 나누어 먹기·혼자 먹기에서 목표 제공량에 맞춘 뒤, 각각 「이 시나리오 확인」을 눌러 주세요. | learner-text-candidate | multiple-actions |
| src/features/nutrition-label-cafeteria/missions/Mission4PackageVsChoice.tsx:82:16 | text | 각 식품의 「눌러 확인」을 눌러 주세요 | learner-text-candidate | multiple-actions |
| src/features/nutrition-label-cafeteria/missions/Mission4PackageVsChoice.tsx:83:16 | text | 두 시나리오를 모두 확인해 주세요 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission4PackageVsChoice.tsx:89:12 | text | 나누어 먹기: 당류 ${shareTotals.sugarGram}g, 나트륨 ${shareTotals.sodiumMilligram}mg 혼자 먹기: 당류 ${aloneTotals.sugarGram}g, 나트륨 ${aloneTotals.sodiumMilligram}mg 같은 식품도 몇 회 먹는지에 따라 계산 결과가 달라집니다. | learner-text-candidate | long-or-dense |
| src/features/nutrition-label-cafeteria/missions/Mission4PackageVsChoice.tsx:98:10 | text | 나누어 먹기 (각 1회){shareConfirmed ? ' ✓' : ''} | button-or-action | — |
| src/features/nutrition-label-cafeteria/missions/Mission4PackageVsChoice.tsx:105:10 | text | 혼자 먹기 (포장 전체){aloneConfirmed ? ' ✓' : ''} | button-or-action | — |
| src/features/nutrition-label-cafeteria/missions/Mission4PackageVsChoice.tsx:109:27 | text | {scenario === 'share' ? '세 식품을 친구와 나누어 각 1회씩 맞춰 보세요.' : '크래커·주스는 포장 전체, 요거트는 1회로 맞춰 보세요.'} | hint | long-or-dense |
| src/features/nutrition-label-cafeteria/missions/Mission4PackageVsChoice.tsx:111:14 | text | 세 식품을 친구와 나누어 각 1회씩 맞춰 보세요. | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission4PackageVsChoice.tsx:112:14 | text | 크래커·주스는 포장 전체, 요거트는 1회로 맞춰 보세요. | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission4PackageVsChoice.tsx:114:49 | aria-label | 목표 제공량 | aria-label | — |
| src/features/nutrition-label-cafeteria/missions/Mission4PackageVsChoice.tsx:115:43 | text | 이번 목표 제공량 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission4PackageVsChoice.tsx:117:31 | text | { const food = getFoodById(e.foodId)! const whole = e.servingsChosen === food.label.servingsPerPackage return ( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/nutrition-label-cafeteria/missions/Mission4PackageVsChoice.tsx:122:45 | text | : {e.servingsChosen}회 {whole ? ' (포장 전체)' : ''} | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission4PackageVsChoice.tsx:123:27 | text | (포장 전체) | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/missions/Mission4PackageVsChoice.tsx:141:15 | text | {locked && | hint | — |
| src/features/nutrition-label-cafeteria/missions/Mission4PackageVsChoice.tsx:142:44 | text | 「눌러 확인」 후 제공량을 조절할 수 있어요. | hint | multiple-actions |
| src/features/nutrition-label-cafeteria/missions/Mission4PackageVsChoice.tsx:143:80 | text | 목표: {target}회 {target === food.label.servingsPerPackage ? ' (포장 전체)' : ''} · 지금: {servings}회 {!locked && !match && ( | learner-text-candidate | long-or-dense |
| src/features/nutrition-label-cafeteria/missions/Mission4PackageVsChoice.tsx:145:60 | text | (포장 전체) | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/missions/Mission4PackageVsChoice.tsx:148:41 | text | → 더 늘려 보세요 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission4PackageVsChoice.tsx:148:57 | text | → 줄여 보세요 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission4PackageVsChoice.tsx:164:17 | text | ) })} {servingFeedback && ( | feedback-or-error | — |
| src/features/nutrition-label-cafeteria/missions/Mission4PackageVsChoice.tsx:184:11 | text | {!scenarioOk && badgesOk && ( | feedback-or-error | — |
| src/features/nutrition-label-cafeteria/missions/Mission4PackageVsChoice.tsx:186:33 | text | 목표 제공량 표를 보고 −/+ 를 맞춰 보세요. | feedback-or-error | — |
| src/features/nutrition-label-cafeteria/missions/Mission4PackageVsChoice.tsx:186:63 | text | )} {scenarioOk && badgesOk && ( | feedback-or-error | — |
| src/features/nutrition-label-cafeteria/missions/Mission4PackageVsChoice.tsx:189:28 | text | 제공량이 시나리오와 맞아요. 확인해 주세요! | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission4PackageVsChoice.tsx:196:8 | text | 이 시나리오 확인 | button-or-action | — |
| src/features/nutrition-label-cafeteria/missions/Mission5FinalOrder.tsx:16:16 | text | 영양표시 조합 식당 최종 주문 | heading | repeated-text |
| src/features/nutrition-label-cafeteria/missions/Mission5FinalOrder.tsx:57:32 | text | Boolean(n)) const phases = [ { id: 'pick', label: '조합 고르기', done: picked, active: !picked }, { id: 'badge', label: '표시 확인', done: meal.badgesReady, active: picked && !meal.badgesReady, }, { id: 'condition', label: '조건·문장', done: evalResult.passed && sentenceOk, active: meal.badgesReady && !(evalResult.passed && sentenceOk), }, { id: 'explain', label: '숫자 고르기', done: numbersOk, active: evalResult.passed && sentenceOk && !numbersOk, }, ] return ( | learner-text-candidate | long-or-dense, multiple-actions, technical-or-internal |
| src/features/nutrition-label-cafeteria/missions/Mission5FinalOrder.tsx:60:12 | text | pick | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/missions/Mission5FinalOrder.tsx:60:27 | text | 조합 고르기 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission5FinalOrder.tsx:63:15 | text | 표시 확인 | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/missions/Mission5FinalOrder.tsx:69:15 | text | 조건·문장 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission5FinalOrder.tsx:75:15 | text | 숫자 고르기 | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/missions/Mission5FinalOrder.tsx:89:16 | text | 식품을 골라 주세요 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission5FinalOrder.tsx:91:18 | text | 「눌러 확인」을 눌러 주세요 | learner-text-candidate | multiple-actions |
| src/features/nutrition-label-cafeteria/missions/Mission5FinalOrder.tsx:93:20 | text | 조건을 만족하는 조합으로 바꿔 보세요 | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/missions/Mission5FinalOrder.tsx:95:22 | text | 조건 문장과 식품 이름을 골라 주세요 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission5FinalOrder.tsx:96:22 | text | 합계 숫자를 골라 주세요 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission5FinalOrder.tsx:102:12 | text | 조건: ${condition.explanation} 당류 합 ${meal.totals.sugarGram}g, 나트륨 합 ${meal.totals.sodiumMilligram}mg 나는 ${conditionPhrase} 조건을 확인하고 ${pickedFoodName}을(를) 선택했습니다. 이 조합의 당류 합은 ${meal.totals.sugarGram}g, 나트륨 합은 ${meal.totals.sodiumMilligram}mg입니다. | learner-text-candidate | long-or-dense, multiple-actions |
| src/features/nutrition-label-cafeteria/missions/Mission5FinalOrder.tsx:108:39 | text | 1–2. 조합 고르기 · 표시 확인 | heading | multiple-actions |
| src/features/nutrition-label-cafeteria/missions/Mission5FinalOrder.tsx:131:41 | text | 3. 조건 · 문장 | heading | — |
| src/features/nutrition-label-cafeteria/missions/Mission5FinalOrder.tsx:134:21 | text | 나는 ___ 조건을 확인하고 ___을(를) 선택했습니다. | learner-text-candidate | multiple-actions |
| src/features/nutrition-label-cafeteria/missions/Mission5FinalOrder.tsx:136:18 | text | 조건 — 숫자 고르기 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission5FinalOrder.tsx:137:63 | aria-label | 조건 문구 | aria-label | — |
| src/features/nutrition-label-cafeteria/missions/Mission5FinalOrder.tsx:138:43 | text | 당류만 확인 | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/missions/Mission5FinalOrder.tsx:138:53 | text | 그림만 보고 선택 | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/missions/Mission5FinalOrder.tsx:149:19 | text | {conditionPhrase === '당류만 확인' \|\| conditionPhrase === '그림만 보고 선택' ? ( | feedback-or-error | long-or-dense, multiple-actions |
| src/features/nutrition-label-cafeteria/missions/Mission5FinalOrder.tsx:150:35 | text | 당류만 확인 | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/missions/Mission5FinalOrder.tsx:150:67 | text | 그림만 보고 선택 | learner-text-candidate | repeated-text |
| src/features/nutrition-label-cafeteria/missions/Mission5FinalOrder.tsx:151:53 | text | 조건 전체를 확인하고, 실제로 고른 식품 이름을 골라 보세요. | feedback-or-error | — |
| src/features/nutrition-label-cafeteria/missions/Mission5FinalOrder.tsx:156:18 | text | 선택한 식품 | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission5FinalOrder.tsx:157:63 | aria-label | 식품 이름 | aria-label | — |
| src/features/nutrition-label-cafeteria/missions/Mission5FinalOrder.tsx:158:60 | text | (식품을 먼저 선택) | learner-text-candidate | — |
| src/features/nutrition-label-cafeteria/missions/Mission5FinalOrder.tsx:175:39 | text | 4. 근거 숫자 고르기 | heading | repeated-text |
| src/lib/accessibilityLabels.ts:5:33 | text | piece | learner-text-candidate | repeated-text |
| src/lib/accessibilityLabels.ts:6:10 | text | ${food.label.servingAmount}개 | learner-text-candidate | repeated-text |
| src/lib/accessibilityLabels.ts:7:10 | text | ${food.label.servingAmount}${food.label.servingUnit} | learner-text-candidate | long-or-dense, repeated-text |
| src/lib/accessibilityLabels.ts:8:11 | text | ${food.name}, 1회 제공량 ${unit}, 총 ${food.label.servingsPerPackage}회, 당류 ${food.label.sugarGram}g, 나트륨 ${food.label.sodiumMilligram}mg | learner-text-candidate | long-or-dense |
| src/lib/mealValidation.ts:6:48 | text | servingsExceeded | feedback-or-error | repeated-text |
| src/lib/mealValidation.ts:49:33 | text | 0 && s.servingsChosen | learner-text-candidate | — |

## Limitations

- Candidates are triage signals, not an automatic grade-level or readability certification.
- Static scanning can miss runtime-composed text, fetched content, canvas/image text, and some template syntax.
- Every candidate requires rendered-state, target-grade, learning-intent, and curriculum-accuracy review.
- This command reads source files and writes only the optional report path; it never rewrites source files.

## Configuration

- Extensions: `.astro, .cjs, .htm, .html, .js, .jsx, .mjs, .svelte, .ts, .tsx, .vue`
- Excluded directories: `.git, .next, .nuxt, .parcel-cache, .turbo, .vite, .worktrees, build, coverage, dist, node_modules, out, target, vendor`
