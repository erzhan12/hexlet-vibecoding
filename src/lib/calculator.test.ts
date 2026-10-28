import { describe, expect, it } from "vitest"

import {
  calculateBmi,
  calculateBmr,
  calculateDailyCalories,
  calculateDailyWater,
  getBmiCategory,
  LIMITS,
  validate,
} from "./calculator"

describe("calculateBmi", () => {
  it("рост 175 и вес 72 дают индекс около 23.5, категория «норма»", () => {
    const bmi = calculateBmi(175, 72)
    expect(bmi).toBe(23.5)
    expect(getBmiCategory(bmi)).toBe("normal")
  })
})

describe("getBmiCategory", () => {
  it("определяет категории на границах", () => {
    expect(getBmiCategory(18.4)).toBe("underweight")
    expect(getBmiCategory(18.5)).toBe("normal")
    expect(getBmiCategory(24.9)).toBe("normal")
    expect(getBmiCategory(25)).toBe("overweight")
    expect(getBmiCategory(29.9)).toBe("overweight")
    expect(getBmiCategory(30)).toBe("obese")
  })
})

describe("calculateBmr", () => {
  it("считает по формуле Миффлина — Сан-Жеора", () => {
    // 10*72 + 6.25*175 - 5*30 = 1663.75
    expect(calculateBmr("male", 175, 72, 30)).toBe(1668.75)
    expect(calculateBmr("female", 175, 72, 30)).toBe(1502.75)
  })
})

describe("calculateDailyCalories", () => {
  it("учитывает активность и считает похудение и набор", () => {
    const result = calculateDailyCalories("male", 175, 72, 30, "sedentary")
    expect(result.maintain).toBe(2003) // 1668.75 * 1.2 = 2002.5
    expect(result.lose).toBe(1702)
    expect(result.gain).toBe(2303)
  })
})

describe("calculateDailyWater", () => {
  it("считает 30 мл на килограмм веса", () => {
    expect(calculateDailyWater(72)).toEqual({ liters: 2.2, glasses: 9 })
    expect(calculateDailyWater(50)).toEqual({ liters: 1.5, glasses: 6 })
  })
})

describe("validate", () => {
  it("проверяет пустые, нечисловые и неправдоподобные значения", () => {
    expect(validate("", LIMITS.height)).toBe("Заполните поле")
    expect(validate("abc", LIMITS.height)).toBe("Введите число")
    expect(validate("20", LIMITS.height)).toBe("Допустимо от 100 до 250")
    expect(validate("175", LIMITS.height)).toBeNull()
    expect(validate("72,5", LIMITS.weight)).toBeNull()
  })
})
