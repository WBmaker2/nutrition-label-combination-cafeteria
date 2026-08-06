import { explanationNumbersMatch } from '../../lib/mealValidation'

export type ExplanationValues = {
  sugarGram: number | null
  sodiumMilligram: number | null
}

export function ExplanationBuilder({
  sugarChips,
  sodiumChips,
  values,
  onChange,
  actual,
  extraBlank,
}: {
  sugarChips: number[]
  sodiumChips: number[]
  values: ExplanationValues
  onChange: (next: ExplanationValues) => void
  actual: { sugarGram: number; sodiumMilligram: number }
  /** optional second sentence chips (condition phrase / food name) */
  extraBlank?: {
    label: string
    chips: string[]
    value: string
    onChange: (v: string) => void
  }
}) {
  const assembled =
    values.sugarGram !== null && values.sodiumMilligram !== null
      ? { sugarGram: values.sugarGram, sodiumMilligram: values.sodiumMilligram }
      : null
  const match = assembled ? explanationNumbersMatch(assembled, actual) : false

  return (
    <fieldset className="explanation-builder">
      <legend>근거 문장 만들기 (숫자만 고르기)</legend>
      {extraBlank && (
        <div className="chip-row">
          <p>{extraBlank.label}</p>
          <div className="chips" role="group" aria-label={extraBlank.label}>
            {extraBlank.chips.map((chip) => (
              <button
                key={chip}
                type="button"
                className={extraBlank.value === chip ? 'chip selected' : 'chip'}
                onClick={() => extraBlank.onChange(chip)}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      )}
      <p className="explanation-sentence">
        이 조합의 당류 합은{' '}
        <strong>{values.sugarGram === null ? '___' : `${values.sugarGram}`}</strong>
        g, 나트륨 합은{' '}
        <strong>
          {values.sodiumMilligram === null ? '___' : `${values.sodiumMilligram}`}
        </strong>
        mg입니다.
      </p>
      <div className="chip-row">
        <p>당류 (g) — 숫자 고르기</p>
        <div className="chips" role="group" aria-label="당류 숫자 고르기">
          {sugarChips.map((n) => (
            <button
              key={`s-${n}`}
              type="button"
              className={values.sugarGram === n ? 'chip selected' : 'chip'}
              onClick={() => onChange({ ...values, sugarGram: n })}
            >
              {n}g
            </button>
          ))}
        </div>
      </div>
      <div className="chip-row">
        <p>나트륨 (mg) — 숫자 고르기</p>
        <div className="chips" role="group" aria-label="나트륨 숫자 고르기">
          {sodiumChips.map((n) => (
            <button
              key={`n-${n}`}
              type="button"
              className={values.sodiumMilligram === n ? 'chip selected' : 'chip'}
              onClick={() => onChange({ ...values, sodiumMilligram: n })}
            >
              {n}mg
            </button>
          ))}
        </div>
      </div>
      {assembled && !match && (
        <p className="feedback">조립한 숫자가 현재 선택·합계와 일치하는지 다시 확인해 보세요.</p>
      )}
      {match && (
        <p className="feedback feedback-correct anim-pop" role="status">
          ⭐ 맞아요! 제공량을 확인하고 두 영양소를 따로 계산했어요.
        </p>
      )}
    </fieldset>
  )
}

export function explanationReady(
  values: ExplanationValues,
  actual: { sugarGram: number; sodiumMilligram: number },
): boolean {
  if (values.sugarGram === null || values.sodiumMilligram === null) return false
  return explanationNumbersMatch(
    { sugarGram: values.sugarGram, sodiumMilligram: values.sodiumMilligram },
    actual,
  )
}
