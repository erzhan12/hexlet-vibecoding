import { useId, useState } from "react"
import { Flame, Scale } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  ACTIVITY_LEVELS,
  BMI_CATEGORIES,
  calculateBmi,
  calculateDailyCalories,
  getBmiCategory,
  LIMITS,
  validate,
  type ActivityLevel,
  type BmiCategory,
  type Sex,
} from "@/lib/calculator"
import { cn } from "@/lib/utils"

const CATEGORY_STYLES: Record<BmiCategory, string> = {
  underweight: "bg-sky-100 text-sky-800",
  normal: "bg-secondary text-secondary-foreground",
  overweight: "bg-accent text-accent-foreground",
  obese: "bg-red-100 text-red-800",
}

// Шкала индекса от 15 до 40 с цветными отрезками по категориям
const SCALE_MIN = 15
const SCALE_MAX = 40
const SCALE_SEGMENTS = [
  { from: 15, to: 18.5, className: "bg-sky-300" },
  { from: 18.5, to: 25, className: "bg-primary" },
  { from: 25, to: 30, className: "bg-highlight" },
  { from: 30, to: 40, className: "bg-red-400" },
]

function toPercent(value: number) {
  const clamped = Math.min(Math.max(value, SCALE_MIN), SCALE_MAX)
  return ((clamped - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100
}

function parse(value: string) {
  return Number(value.replace(",", "."))
}

function NumberField({
  label,
  unit,
  value,
  onChange,
  error,
}: {
  label: string
  unit: string
  value: string
  onChange: (value: string) => void
  error: string | null
}) {
  const id = useId()
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={error !== null}
          aria-describedby={error ? `${id}-error` : undefined}
          className="h-11 pr-12 text-base"
        />
        <span className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm">
          {unit}
        </span>
      </div>
      {error && (
        <p id={`${id}-error`} className="text-destructive text-sm">
          {error}
        </p>
      )}
    </div>
  )
}

function App() {
  const [height, setHeight] = useState("175")
  const [weight, setWeight] = useState("72")
  const [age, setAge] = useState("30")
  const [sex, setSex] = useState<Sex>("male")
  const [activity, setActivity] = useState<ActivityLevel>("light")

  const errors = {
    height: validate(height, LIMITS.height),
    weight: validate(weight, LIMITS.weight),
    age: validate(age, LIMITS.age),
  }

  const canShowBmi = !errors.height && !errors.weight
  const canShowCalories = canShowBmi && !errors.age

  const bmi = canShowBmi ? calculateBmi(parse(height), parse(weight)) : null
  const category = bmi !== null ? getBmiCategory(bmi) : null
  const calories = canShowCalories
    ? calculateDailyCalories(
        sex,
        parse(height),
        parse(weight),
        parse(age),
        activity
      )
    : null

  return (
    <div className="mx-auto min-h-svh max-w-4xl px-4 py-8 sm:py-12">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Калькулятор <span className="text-primary">калорий</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          Индекс массы тела и дневная норма калорий
        </p>
      </header>

      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-start">
        <Card>
          <CardHeader>
            <CardTitle>Ваши данные</CardTitle>
            <CardDescription>
              Результат пересчитывается сразу
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-5">
            <div className="grid gap-2">
              <Label>Пол</Label>
              <ToggleGroup
                type="single"
                value={sex}
                onValueChange={(value) => value && setSex(value as Sex)}
                className="w-full"
              >
                <ToggleGroupItem value="male" className="h-11">
                  Мужской
                </ToggleGroupItem>
                <ToggleGroupItem value="female" className="h-11">
                  Женский
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="grid grid-cols-2 items-start gap-4">
              <NumberField
                label="Рост"
                unit="см"
                value={height}
                onChange={setHeight}
                error={errors.height}
              />
              <NumberField
                label="Вес"
                unit="кг"
                value={weight}
                onChange={setWeight}
                error={errors.weight}
              />
            </div>

            <NumberField
              label="Возраст"
              unit="лет"
              value={age}
              onChange={setAge}
              error={errors.age}
            />

            <div className="grid gap-2">
              <Label>Активность</Label>
              <Select
                value={activity}
                onValueChange={(value) => setActivity(value as ActivityLevel)}
              >
                <SelectTrigger className="h-11! text-base md:text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(ACTIVITY_LEVELS).map(([key, { label }]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="text-primary size-5" />
                Индекс массы тела
              </CardTitle>
            </CardHeader>
            <CardContent>
              {bmi !== null && category !== null ? (
                <div className="grid gap-4">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="text-5xl font-bold tabular-nums">
                      {bmi.toFixed(1)}
                    </span>
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-sm font-medium",
                        CATEGORY_STYLES[category]
                      )}
                    >
                      {BMI_CATEGORIES[category].label}
                    </span>
                  </div>
                  <div className="relative pt-1">
                    <div className="flex h-2.5 overflow-hidden rounded-full">
                      {SCALE_SEGMENTS.map((segment) => (
                        <div
                          key={segment.from}
                          className={segment.className}
                          style={{
                            width: `${toPercent(segment.to) - toPercent(segment.from)}%`,
                          }}
                        />
                      ))}
                    </div>
                    <div
                      className="bg-foreground border-card absolute top-0 size-4.5 -translate-x-1/2 rounded-full border-3 shadow"
                      style={{ left: `${toPercent(bmi)}%` }}
                      aria-hidden
                    />
                    <div className="text-muted-foreground relative mt-2 h-4 text-xs">
                      {[18.5, 25, 30].map((mark) => (
                        <span
                          key={mark}
                          className="absolute -translate-x-1/2"
                          style={{ left: `${toPercent(mark)}%` }}
                        >
                          {mark}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Укажите рост и вес, чтобы увидеть индекс.
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flame className="text-highlight size-5" />
                Калорий в день
              </CardTitle>
              <CardDescription>
                Сколько нужно, чтобы вес не менялся
              </CardDescription>
            </CardHeader>
            <CardContent>
              {calories !== null ? (
                <div className="grid gap-4">
                  <p>
                    <span className="text-5xl font-bold tabular-nums">
                      {calories.maintain.toLocaleString("ru-RU")}
                    </span>{" "}
                    <span className="text-muted-foreground">ккал</span>
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-accent rounded-lg p-3">
                      <p className="text-accent-foreground text-sm">
                        Чтобы похудеть
                      </p>
                      <p className="text-xl font-semibold tabular-nums">
                        {calories.lose.toLocaleString("ru-RU")}{" "}
                        <span className="text-sm font-normal">ккал</span>
                      </p>
                    </div>
                    <div className="bg-secondary rounded-lg p-3">
                      <p className="text-secondary-foreground text-sm">
                        Чтобы набрать
                      </p>
                      <p className="text-xl font-semibold tabular-nums">
                        {calories.gain.toLocaleString("ru-RU")}{" "}
                        <span className="text-sm font-normal">ккал</span>
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Заполните все поля, чтобы увидеть норму калорий.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="text-muted-foreground mt-8 text-center text-xs">
        Расчёт ориентировочный и не заменяет консультацию врача.
      </footer>
    </div>
  )
}

export default App
