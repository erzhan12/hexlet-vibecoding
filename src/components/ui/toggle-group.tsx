import * as React from "react"
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function ToggleGroup({
  className,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root>) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      className={cn(
        "flex w-fit items-center rounded-md border shadow-xs",
        className
      )}
      {...props}
    />
  )
}

function ToggleGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      className={cn(
        "hover:bg-muted hover:text-muted-foreground data-[state=on]:bg-primary data-[state=on]:text-primary-foreground focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-9 min-w-0 flex-1 shrink-0 items-center justify-center gap-2 px-3 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] outline-none first:rounded-l-md last:rounded-r-md focus-visible:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 not-first:border-l",
        className
      )}
      {...props}
    />
  )
}

export { ToggleGroup, ToggleGroupItem }
