export type ServingUnit = 'g' | 'mL' | 'piece'

export type NutritionLabel = {
  servingAmount: number
  servingUnit: ServingUnit
  servingsPerPackage: number
  sugarGram: number
  sodiumMilligram: number
}

export type FoodCategory = 'grain' | 'dairy' | 'drink' | 'snack' | 'fruit'

export type FoodCard = {
  id: string
  name: string
  category: FoodCategory
  label: NutritionLabel
  icon: string
  note: string
}

export type MealCondition = {
  id: string
  title: string
  requiredFoodIds?: string[]
  maxSugarGram?: number
  maxSodiumMilligram?: number
  requiredCategories?: FoodCategory[]
  snackSlotCategories?: FoodCategory[]
  servingMode: 'one-serving' | 'whole-package'
  explanation: string
}

export type MealSelection = {
  foodId: string
  servingsChosen: number
}
