import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-black uppercase tracking-wider transition-all duration-75 brutal-border focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground brutal-shadow hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0px_hsl(var(--border))] active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0px_hsl(var(--border))]",
        destructive: "bg-destructive text-destructive-foreground brutal-shadow hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0px_hsl(var(--border))] active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0px_hsl(var(--border))]",
        secondary: "bg-secondary text-secondary-foreground brutal-shadow hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0px_hsl(var(--border))] active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0px_hsl(var(--border))]",
        accent: "bg-accent text-accent-foreground brutal-shadow hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0px_hsl(var(--border))] active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0px_hsl(var(--border))]",
        highlight: "bg-highlight text-highlight-foreground brutal-shadow hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0px_hsl(var(--border))] active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0px_hsl(var(--border))]",
        warning: "bg-warning text-warning-foreground brutal-shadow hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0px_hsl(var(--border))] active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0px_hsl(var(--border))]",
        outline: "bg-background text-foreground brutal-shadow hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0px_hsl(var(--border))] active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0px_hsl(var(--border))]",
        ghost: "bg-transparent text-foreground hover:bg-muted brutal-border-thin",
        link: "text-primary underline-offset-4 hover:underline border-0 shadow-none",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 px-4 py-2",
        lg: "h-14 px-8 py-4",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
