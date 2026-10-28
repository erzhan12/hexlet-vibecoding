export type Sex = "male" | "female"

export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "high"
  | "extreme"

export type BmiCategory = "underweight" | "normal" | "overweight" | "obese"

export const ACTIVITY_LEVELS: Record<
  ActivityLevel,
  { label: string; factor: number }
> = {
  sedentary: { label: "Сидячий образ жизни", factor: 1.2 },
  light: { label: "Лёгкая (1–3 тренировки в неделю)", factor: 1.375 },
  moderate: { label: "Средняя (3–5 тренировок в неделю)", factor: 1.55 },
  high: { label: "Высокая (6–7 тренировок в неделю)", factor: 1.725 },
  extreme: { label: "Очень высокая (тяжёлый труд, спорт)", factor: 1.9 },
}

export const BMI_CATEGORIES: Record<BmiCategory, { label: string }> = {
  underweight: { label: "недостаток веса" },
  normal: { label: "норма" },
  overweight: { label: "избыточный вес" },
  obese: { label: "ожирение" },
}

// Индекс массы тела: вес (кг) / рост (м)², округлён до одного знака
export function calculateBmi(heightCm: number, weightKg: number): number {
  const heightM = heightCm / 100
  return Math.round((weightKg / (heightM * heightM)) * 10) / 10
}

// Категории по шкале Всемирной организации здравоохранения
export function getBmiCategory(bmi: number): BmiCategory {
  if (bmi < 18.5) return "underweight"
  if (bmi < 25) return "normal"
  if (bmi < 30) return "overweight"
  return "obese"
}

// Базовый обмен веществ по формуле Миффлина — Сан-Жеора
export function calculateBmr(
  sex: Sex,
  heightCm: number,
  weightKg: number,
  age: number
): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age
  return sex === "male" ? base + 5 : base - 161
}

export function calculateDailyCalories(
  sex: Sex,
  heightCm: number,
  weightKg: number,
  age: number,
  activity: ActivityLevel
): { maintain: number; lose: number; gain: number } {
  const maintain =
    calculateBmr(sex, heightCm, weightKg, age) * ACTIVITY_LEVELS[activity].factor
  return {
    maintain: Math.round(maintain),
    lose: Math.round(maintain * 0.85),
    gain: Math.round(maintain * 1.15),
  }
}

// Норма воды: 30 мл на килограмм веса
export function calculateDailyWater(weightKg: number): {
  liters: number
  glasses: number
} {
  const ml = weightKg * 30
  return {
    liters: Math.round(ml / 100) / 10,
    glasses: Math.round(ml / 250),
  }
}

export const LIMITS = {
  height: { min: 100, max: 250 },
  weight: { min: 30, max: 300 },
  age: { min: 14, max: 100 },
}

// Возвращает текст ошибки или null, если значение подходит
export function validate(
  value: string,
  limits: { min: number; max: number }
): string | null {
  if (value.trim() === "") return "Заполните поле"
  const num = Number(value.replace(",", "."))
  if (!Number.isFinite(num)) return "Введите число"
  if (num < limits.min || num > limits.max) {
    return `Допустимо от ${limits.min} до ${limits.max}`
  }
  return null
}
