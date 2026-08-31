export const feedbackRules = {
  servingPackageConfusion:
    '이 숫자는 1회 제공량 기준이에요. 포장 전체는 몇 회분인지 확인해 보세요.',
  servingsBelowMinimum: '제공량은 1회 이상으로 골라 주세요.',
  servingsExceeded: '한 포장에 들어 있는 총 제공량보다 많이 선택할 수는 없어요.',
  mixedUnits: '당류는 g끼리, 나트륨은 mg끼리 따로 더해 보세요.',
  missingUnit: '합계 뒤에 g 또는 mg 단위를 붙여 보세요.',
  pictureOnly: '식품 이름보다 영양표시의 기준과 숫자를 먼저 확인해 보세요.',
  partialCondition: '당류와 나트륨 조건을 모두 확인했나요?',
  goodReasoning: '제공량을 확인하고 두 영양소를 따로 계산했어요.',
  explanationMismatch: '조립한 숫자가 현재 선택·합계와 일치하는지 다시 확인해 보세요.',
  checkBasisAndUnit: '표시 기준과 단위를 다시 확인해 보세요.',
} as const

export type FeedbackKey = keyof typeof feedbackRules

export function getFeedbackMessage(key: FeedbackKey): string {
  return feedbackRules[key]
}
