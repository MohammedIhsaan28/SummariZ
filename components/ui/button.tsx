"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all disabled:pointer-events-none disabled:opacity-50 overflow-hidden cursor-pointer select-none outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow hover:bg-destructive/90",
        outline:
          "border bg-background shadow hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-5 text-base",
        lg: "h-12 px-7 text-lg",
        icon: "h-10 w-10", 
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  bgColor?: string
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  bgColor = "linear-gradient(325deg, hsl(217 100% 56%) 0%, hsl(194 100% 69%) 55%, hsl(217 100% 56%) 90%)",
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : motion.button

  return (
    <Comp
      key="button"
      className={cn(buttonVariants({ variant, size, className }), "text-white hover:text-emerald-200 relative overflow-hidden")}
      style={{
        backgroundImage: bgColor,
        backgroundSize: "250% auto",
        transition: "0.6s ease",
      }}
      whileHover={{ backgroundPosition: "right" }}
      onHoverEnd={() => {}}
      {...props}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {children}

        <motion.div
          className="absolute top-0 left-[-50%] w-[200%] h-full bg-white/40 skew-x-[-20deg] mix-blend-overlay"
          initial={{ x: "-100%", opacity: 0 }}
          whileHover={{ x: "100%", opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        />
      </div>
    </Comp>
  )
}
