import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

export type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];

const badgeVariants = cva(
  "h-5 gap-1 rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium transition-all has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:size-3! inline-flex items-center justify-center w-fit whitespace-nowrap shrink-0 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-colors overflow-hidden group/badge",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary: "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive: "bg-destructive/10 [a]:hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive dark:bg-destructive/20",
        outline: "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost: "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
        green: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
        red: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
        blue: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
        sky: "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
        orange: "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
        emerald: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
        purple: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
        yellow: "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
        gray: "bg-gray-50 text-gray-700 dark:bg-gray-950 dark:text-gray-300",
        lime: "bg-lime-50 text-lime-700 dark:bg-lime-950 dark:text-lime-300",
        pink: "bg-pink-50 text-pink-700 dark:bg-pink-950 dark:text-pink-300",
        teal: "bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300",
        amber: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300/70",
        indigo: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
