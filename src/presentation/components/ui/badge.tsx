import * as React from "react";
import { cn } from "@/src/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        success:
          "border-transparent bg-success text-success-foreground shadow-sm hover:bg-success/80",
        warning:
          "border-transparent bg-warning text-warning-foreground shadow-sm hover:bg-warning/80",
        info: "border-transparent bg-info text-info-foreground shadow-sm hover:bg-info/80",

        outline: "text-foreground",
        "outline-success":
          "border-success text-success bg-background shadow-sm",
        "outline-warning":
          "border-warning text-warning bg-background shadow-sm",
        "outline-info":
          "border-info text-info bg-background shadow-sm hover:bg-info",
        "outline-secondary":
          "border-secondary text-secondary bg-background shadow-sm hover:bg-secondary",
        "outline-destructive":
          "border-destructive text-destructive bg-background shadow-sm hover:bg-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };