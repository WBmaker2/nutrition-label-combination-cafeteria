import type { FoodCard } from './types'

export const foodCards: FoodCard[] = [
  {
    id: 'cereal',
    name: '바삭 시리얼',
    category: 'grain',
    label: {
      servingAmount: 30,
      servingUnit: 'g',
      servingsPerPackage: 3,
      sugarGram: 8,
      sodiumMilligram: 90,
    },
    icon: '🥣',
    note: '가상 수치이며 실제 제품 추천이 아닙니다.',
  },
  {
    id: 'yogurt',
    name: '새콤 요거트',
    category: 'dairy',
    label: {
      servingAmount: 100,
      servingUnit: 'g',
      servingsPerPackage: 1,
      sugarGram: 10,
      sodiumMilligram: 70,
    },
    icon: '🥛',
    note: '가상 수치이며 실제 제품 추천이 아닙니다.',
  },
  {
    id: 'cracker',
    name: '고소 크래커',
    category: 'snack',
    label: {
      servingAmount: 20,
      servingUnit: 'g',
      servingsPerPackage: 4,
      sugarGram: 2,
      sodiumMilligram: 120,
    },
    icon: '🍘',
    note: '가상 수치이며 실제 제품 추천이 아닙니다.',
  },
  {
    id: 'juice',
    name: '달콤 주스',
    category: 'drink',
    label: {
      servingAmount: 200,
      servingUnit: 'mL',
      servingsPerPackage: 2,
      sugarGram: 18,
      sodiumMilligram: 15,
    },
    icon: '🧃',
    note: '가상 수치이며 실제 제품 추천이 아닙니다.',
  },
  {
    id: 'sandwich',
    name: '담백 샌드',
    category: 'snack',
    label: {
      servingAmount: 1,
      servingUnit: 'piece',
      servingsPerPackage: 2,
      sugarGram: 4,
      sodiumMilligram: 260,
    },
    icon: '🥪',
    note: '가상 수치이며 실제 제품 추천이 아닙니다.',
  },
  {
    id: 'fruit-cup',
    name: '과일 컵',
    category: 'fruit',
    label: {
      servingAmount: 150,
      servingUnit: 'g',
      servingsPerPackage: 1,
      sugarGram: 12,
      sodiumMilligram: 5,
    },
    icon: '🍎',
    note: '가상 수치이며 실제 제품 추천이 아닙니다.',
  },
]

export function getFoodById(id: string): FoodCard | undefined {
  return foodCards.find((food) => food.id === id)
}
