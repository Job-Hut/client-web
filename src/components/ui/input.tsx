import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

const inputVariants = cva(
  "w-full border border-primary text-xs placeholder:text-xs",
  {
    variants: {
      variant: {
        default: "rounded-md",
        "capsule-icon": "rounded-md ",
      },
      inputSize: {
        default: "px-2 py-2",
        small: "px-2 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  },
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, type, icon: Icon, ...props }, ref) => {
    return (
      <div className={cn("relative", className)}>
        {variant === "capsule-icon" && Icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 transform">
            {Icon}
          </span>
        )}
        <input
          type={type}
          className={cn(inputVariants({ variant, inputSize }), {
            "px-11": variant === "capsule-icon",
          })}
          ref={ref}
          {...props}
        ></input>
      </div>
    );
  },
);
Input.displayName = "Input";

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
  ({ variant, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false);

    const handleVisibility = () => {
      setIsVisible((prev) => !prev);
    };

    return (
      <div className="relative">
        <Input
          variant={variant}
          type={isVisible ? "text" : "password"}
          ref={ref}
          {...props}
        />
        <div
          onClick={handleVisibility}
          className="absolute right-4 top-1/2 -translate-y-1/2 transform hover:cursor-pointer"
        >
          {isVisible ? <Eye width={16} /> : <EyeOff width={16} />}
        </div>
      </div>
    );
  },
);
InputPassword.displayName = "InputPassword";

export { Input, InputPassword, inputVariants };
