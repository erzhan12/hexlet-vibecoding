import { Calculator, Mail, MapPin, Send } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Учебные данные: замените на свои
const PROFILE = {
  name: "Иван Иванов",
  initials: "ИИ",
  role: "Начинающий веб-разработчик",
  city: "Алматы",
  about:
    "Учусь делать сайты на React и TypeScript. Люблю простые и понятные интерфейсы.",
  skills: ["React", "TypeScript", "Tailwind", "shadcn/ui", "Vite"],
}

const CONTACTS = [
  {
    icon: Mail,
    label: "Почта",
    value: "ivan@example.com",
    href: "mailto:ivan@example.com",
  },
  {
    icon: Send,
    label: "Telegram",
    value: "@ivan_example",
    href: "https://t.me/ivan_example",
  },
]

export default function CardPage() {
  return (
    <div className="mx-auto flex min-h-svh max-w-md flex-col justify-center gap-6 px-4 py-10">
      <Card>
        <CardHeader className="justify-items-center text-center">
          <div className="bg-primary text-primary-foreground mb-2 flex size-24 items-center justify-center rounded-full text-3xl font-bold">
            {PROFILE.initials}
          </div>
          <CardTitle className="text-2xl">{PROFILE.name}</CardTitle>
          <CardDescription className="text-base">{PROFILE.role}</CardDescription>
          <p className="text-muted-foreground flex items-center gap-1 text-sm">
            <MapPin className="size-4" />
            {PROFILE.city}
          </p>
        </CardHeader>

        <CardContent className="grid gap-6">
          <p className="text-center leading-relaxed">{PROFILE.about}</p>

          <ul className="flex flex-wrap justify-center gap-2">
            {PROFILE.skills.map((skill) => (
              <li
                key={skill}
                className="bg-accent text-accent-foreground rounded-full px-3 py-1 text-sm font-medium"
              >
                {skill}
              </li>
            ))}
          </ul>

          <ul className="grid gap-3">
            {CONTACTS.map(({ icon: Icon, label, value, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="hover:bg-secondary flex items-center gap-3 rounded-lg border p-3 transition-colors"
                >
                  <span className="bg-secondary text-secondary-foreground flex size-10 items-center justify-center rounded-full">
                    <Icon className="size-5" />
                  </span>
                  <span className="grid">
                    <span className="text-muted-foreground text-xs">{label}</span>
                    <span className="font-medium">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <a
        href="../"
        className="text-primary flex items-center justify-center gap-2 text-sm font-medium hover:underline"
      >
        <Calculator className="size-4" />
        Мой проект: калькулятор калорий
      </a>
    </div>
  )
}
